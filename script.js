import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer } from "ws";
import { SocketServer } from "./common/socketUtility.js";
import { CONFIG } from "./common/socketConfig.js";
import { words } from './common/word_list.js';

import fs from 'fs';
import OpenAI from 'openai';

const app = express();
const apiRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use('/api', apiRouter); // App uses '/api' route

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

const server = http.createServer(app);
const port = process.env.PORT || 3000;

const wss = new WebSocketServer({ server, path: '/api/ws' });
const socketServer = new SocketServer(wss, CONFIG);

server.listen(port, () => {
  console.log(`Server (HTTP & WebSocket) running on port ${port}`);
});

const OPENAI_API_KEY = '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';
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});
const TEXT_SIZE_LIMIT = 2048;//number of words in text approximately
async function getEmbeddings(texts) {
  try{
    const response = await openai.embeddings.create({
        model: 'text-embedding-3-large',
        input: texts,
    });
    return response.data.map(a => a.embedding);
  } catch(e){
    return null;
  }
}
function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}
class WordEmbeddings {
  constructor() {
      this.filePath = './cache/wordEmbeddings.txt';
      this.embeddingMap = null;
      this.initiated = false;
      this.initateJobQueue = [];
  }

  async init() {
      if (this.embeddingMap) {
          return;
      }
      if (this.initiated) {
          return new Promise((resolve) => {this.initateJobQueue.push(resolve)});
      }
      this.embeddingMap = new Map();
      try {
        await fs.promises.access('./cache', fs.constants.F_OK);
      } catch (err) {
          // If the directory doesn't exist, create it
          await fs.promises.mkdir('./cache');
      }
      // Check if the file exists
      try {
          await fs.promises.access(this.filePath, fs.constants.F_OK);
      } catch (err) {
          // If the file doesn't exist, create it
          await fs.promises.writeFile(this.filePath, '');
      }

      // Read and parse the file
      const data = await fs.promises.readFile(this.filePath, 'utf8');
      const lines = data.split('\n');
      for (const line of lines) {
          if (line.length === 0) {
              continue;
          }
          const [word, embedding] = line.split('\t');
          this.embeddingMap.set(word, embedding.split(',').map(parseFloat));
      }

      this.initiated = true;
      this.initateJobQueue.forEach(resolve => resolve());
      this.initateJobQueue = [];
  }

  async getEmbeddings(texts) {
      await this.init();
      const missingEmbeddings = [];
      for (let i = 0; i < texts.length; i++) {
          if (!this.embeddingMap.has(texts[i])) {
              missingEmbeddings.push(texts[i]);
          }
      }
      if (missingEmbeddings.length > 0) {
          await this.setEmbeddings(missingEmbeddings);
      }
      return texts.map(text => this.embeddingMap.get(text));
  }

  async setEmbeddings(texts) {
      await this.init();
      for (let i = 0; i < texts.length; i += TEXT_SIZE_LIMIT) {
          const embeddings = await getEmbeddings(texts.slice(i, i + TEXT_SIZE_LIMIT));
          if (embeddings == null){
            return;
          }
          for (let j = 0; j < embeddings.length; j++) {
              this.embeddingMap.set(texts[i + j], embeddings[j]);
          }
          //append the word and its embedding to the file at this.filePath
          const lines = embeddings.map((embedding, j) => `${texts[i + j]}\t${embedding.join(',')}`);
          await fs.promises.appendFile(this.filePath, lines.join('\n') + '\n');
      }
  }
}
const wordEmbeddings = new WordEmbeddings();

socketServer.on("connection", async (socket)=>{
  const word = words[Math.floor(Math.random() * words.length)];
  console.log(word);
  const wordE = (await wordEmbeddings.getEmbeddings([word]))[0];
  const wordsEmbeddings = await wordEmbeddings.getEmbeddings(words);
  let wordsBySimilarity = wordsEmbeddings.map((e, i)=>{
    const word = words[i];
    const sim = cosineSimilarity(wordE, e);
    return {word, sim};
  }).sort((a, b) => b.sim - a.sim).filter((({sim}) => sim < 0.6));
  if (wordsBySimilarity[20].sim > 0.4){
    wordsBySimilarity = wordsBySimilarity.filter(({sim}) => sim > 0.4);
  } else{
    wordsBySimilarity = wordsBySimilarity.splice(0,20);
  }
  const randomWords = {};
  while (Object.keys(randomWords).length < 5){
    const randomIndex = Math.floor(Math.random() * wordsBySimilarity.length);
    const {word, sim} = wordsBySimilarity[randomIndex];
    randomWords[word] = sim;
  }

  socket.emit("hints", {
    guesses : Object.entries(randomWords).map(([guess, sim]) => ({guess, sim}))
  });

  socket.on("make-guess", async (data)=>{
    const guess = data.guess;
    const guessE = (await wordEmbeddings.getEmbeddings([guess]))[0];
    if (!guessE){
      // socket.emit("score-guess", {guess, sim : 0});
      return;
    }
    const sim = cosineSimilarity(wordE, guessE);
    socket.emit("score-guess", {guess, sim});
  });
})