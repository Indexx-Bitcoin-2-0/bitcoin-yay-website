import fs from "fs";
import path from "path";

export type Chunk = {
  id: number;
  text: string;
  embedding: number[];
  score?: number;
};

let cache: Chunk[] | null = null;

function readIndexFile(): Chunk[] {
  const filePath = path.join(process.cwd(), "data", "faq_index.json");

  if (!fs.existsSync(filePath)) {
    console.warn("FAQ index not found. Run scripts/build-faq-index.ts first.");
    return [];
  }

  const raw = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return (raw.index as Chunk[]) ?? [];
}

export function loadIndex(): Chunk[] {
  if (!cache) {
    cache = readIndexFile();
  }
  return cache;
}

export function cosine(a: number[], b: number[]) {
  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  return denom === 0 ? 0 : dot / denom;
}

export function topKBySim(embedding: number[], k = 5) {
  const index = loadIndex();
  if (index.length === 0) return [];

  return index
    .map((chunk) => ({
      ...chunk,
      score: cosine(embedding, chunk.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}
