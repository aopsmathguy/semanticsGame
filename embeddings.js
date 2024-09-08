import fs from "fs";
import readline from "readline";
import OpenAI from "openai";

const OPENAI_API_KEY = "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";
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});
const TEXT_SIZE_LIMIT = 2048; //number of words in text approximately
async function getEmbeddings(texts) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-large",
      input: texts,
      dimensions: 1536,
    });
    return response.data.map((a) => a.embedding);
  } catch (e) {
    console.log(e);
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
    this.filePath = "./cache/wordEmbeddings.txt";
    this.embeddingMap = null;
    this.initiated = false;
    this.initateJobQueue = [];
  }

  async init() {
    if (this.embeddingMap) {
      return;
    }
    if (this.initiated) {
      return new Promise((resolve) => {
        this.initateJobQueue.push(resolve);
      });
    }
    this.embeddingMap = new Map();
    try {
      await fs.promises.access("./cache", fs.constants.F_OK);
    } catch (err) {
      // If the directory doesn't exist, create it
      await fs.promises.mkdir("./cache");
    }
    // Check if the file exists
    try {
      await fs.promises.access(this.filePath, fs.constants.F_OK);
    } catch (err) {
      // If the file doesn't exist, create it
      await fs.promises.writeFile(this.filePath, "");
    }

    // Read and parse the file line by line
    const readStream = fs.createReadStream(this.filePath, "utf8");
    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      if (line.length === 0) {
        continue;
      }
      const [word, embedding] = line.split("\t");
      // Only add if the word isn't already in the map
      if (!this.embeddingMap.has(word)) {
        this.embeddingMap.set(word, embedding.split(",").map(parseFloat));
      }
    }

    this.initiated = true;
    this.initateJobQueue.forEach((resolve) => resolve());
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
    return texts.map((text) => this.embeddingMap.get(text));
  }

  async setEmbeddings(texts) {
    await this.init();
    for (let i = 0; i < texts.length; i += TEXT_SIZE_LIMIT) {
      const embeddings = await getEmbeddings(
        texts.slice(i, i + TEXT_SIZE_LIMIT)
      );
      if (embeddings == null) {
        return;
      }
      // Filter out embeddings that are already present
      const indicesToadd = texts
        .slice(i, i + TEXT_SIZE_LIMIT)
        .map((w, i) => ({ w, i }))
        .filter((a) => {
          return !this.embeddingMap.has(a.w);
        })
        .map(({ w, i }) => i);
      for (let j of indicesToadd) {
        this.embeddingMap.set(texts[i + j], embeddings[j]);
      }
      //append the word and its embedding to the file at this.filePath
      const lines = indicesToadd.map(
        (j) => `${texts[i + j]}\t${embeddings[j].join(",")}`
      );
      await fs.promises.appendFile(
        this.filePath,
        lines.join("\n") + (lines.length ? "\n" : "")
      );
    }
  }

  async getSimilarities(word, words){
    await this.init();
    const wordEmbedding = await this.getEmbeddings([word]);
    if(wordEmbedding == null){
      return [];
    }
    const wordEmbeddingVec = wordEmbedding[0];
    const wordEmbeddings = await this.getEmbeddings(words);
    if(wordEmbeddings == null){
      return [];
    }
    return wordEmbeddings.map((embedding, i) => ({
      word: words[i],
      similarity: cosineSimilarity(wordEmbeddingVec, embedding),
    })).sort((a, b) => b.similarity - a.similarity);
  }
  async getSimilarity(wordA, wordB){
    return (await this.getSimilarities(wordA, [wordB]))[0].similarity;
  }
}
const wordEmbeddings = new WordEmbeddings();
export default wordEmbeddings;