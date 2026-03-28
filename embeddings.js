import fs from "fs";
import readline from "readline";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const TEXT_SIZE_LIMIT = 2048;

async function getEmbeddings(texts) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: texts,
    dimensions: 1536,
  });
  return response.data.map((a) => a.embedding);
}

function cosineSimilarity(vecA, vecB) {
  if (!Array.isArray(vecA) || !Array.isArray(vecB)) {
    throw new Error("Missing embedding vector");
  }
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

class WordEmbeddings {
  constructor() {
    this.filePath = "./cache/wordEmbeddings.txt";
    this.embeddingMap = null;
    this.initPromise = null;
  }

  async init() {
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      this.embeddingMap = new Map();

      await fs.promises.mkdir("./cache", { recursive: true });

      try {
        await fs.promises.access(this.filePath, fs.constants.F_OK);
      } catch {
        await fs.promises.writeFile(this.filePath, "");
      }

      const readStream = fs.createReadStream(this.filePath, "utf8");
      const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity,
      });

      for await (const line of rl) {
        if (!line) continue;
        const [word, embedding] = line.split("\t");
        if (!this.embeddingMap.has(word)) {
          this.embeddingMap.set(word, embedding.split(",").map(Number));
        }
      }
    })();

    return this.initPromise;
  }

  async getEmbeddings(texts) {
    await this.init();

    const missing = texts.filter((t) => !this.embeddingMap.has(t));
    if (missing.length > 0) {
      await this.setEmbeddings(missing);
    }

    const result = texts.map((text) => this.embeddingMap.get(text));

    if (result.some((x) => !Array.isArray(x))) {
      return null;
    }

    return result;
  }

  async setEmbeddings(texts) {
    await this.init();

    for (let i = 0; i < texts.length; i += TEXT_SIZE_LIMIT) {
      const chunk = texts.slice(i, i + TEXT_SIZE_LIMIT);

      let embeddings;
      try {
        embeddings = await getEmbeddings(chunk);
      } catch (e) {
        console.error("Embedding request failed:", e.status, e.code, e.message);
        return false;
      }

      const indicesToAdd = chunk
        .map((w, idx) => ({ w, idx }))
        .filter(({ w }) => !this.embeddingMap.has(w))
        .map(({ idx }) => idx);

      for (const j of indicesToAdd) {
        this.embeddingMap.set(chunk[j], embeddings[j]);
      }

      const lines = indicesToAdd.map(
        (j) => `${chunk[j]}\t${embeddings[j].join(",")}`
      );

      if (lines.length) {
        await fs.promises.appendFile(this.filePath, lines.join("\n") + "\n");
      }
    }

    return true;
  }

  async getSimilarities(word, words) {
    const wordEmbedding = await this.getEmbeddings([word]);
    if (!wordEmbedding) return [];

    const wordEmbeddingVec = wordEmbedding[0];
    if (!wordEmbeddingVec) return [];

    const wordEmbeddings = await this.getEmbeddings(words);
    if (!wordEmbeddings) return [];

    return wordEmbeddings
      .filter((embedding, i) => Array.isArray(embedding) && words[i] != null)
      .map((embedding, i) => ({
        word: words[i],
        similarity: cosineSimilarity(wordEmbeddingVec, embedding),
      }))
      .sort((a, b) => b.similarity - a.similarity);
  }

  async getSimilarity(wordA, wordB) {
    const results = await this.getSimilarities(wordA, [wordB]);
    return results.length ? results[0].similarity : null;
  }
}

const wordEmbeddings = new WordEmbeddings();
export default wordEmbeddings;
