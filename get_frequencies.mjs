import { words } from "./common/word_list.js";
import axios from "axios";

const CONCURRENCY = 20;

async function getFrequency(word) {
    try {
        const response = await axios.get(`https://api.datamuse.com/words?sp=${word}&md=f&max=1`);
        const data = response.data;
        if (!data[0] || !data[0].tags) return { word, f: 0 };
        const tag = data[0].tags.find(t => t.startsWith("f:"));
        return { word, f: tag ? parseFloat(tag.split(":")[1]) : 0 };
    } catch (e) {
        return { word, f: 0 };
    }
}

async function runWithConcurrency(items, fn, limit) {
    const results = [];
    let i = 0;
    async function next() {
        while (i < items.length) {
            const idx = i++;
            results[idx] = await fn(items[idx]);
        }
    }
    await Promise.all(Array.from({ length: limit }, next));
    return results;
}

const toCheck = words.filter(w => w.length > 3);
console.error(`Fetching frequencies for ${toCheck.length} words...`);

const results = await runWithConcurrency(toCheck, getFrequency, CONCURRENCY);
results.sort((a, b) => b.f - a.f);

import { writeFileSync } from "fs";
writeFileSync("word_frequencies.json", JSON.stringify(results, null, 2));
console.error("Done! Saved to word_frequencies.json");

// Print distribution
const thresholds = [100, 50, 20, 10, 5, 2, 1];
for (const t of thresholds) {
    console.log(`Frequency > ${t}: ${results.filter(r => r.f > t).length} words`);
}
