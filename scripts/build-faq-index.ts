import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import OpenAI from "openai";

const envPath = path.join(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const envLocalPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath, override: true });
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function chunk(markdown: string, max = 1200) {
  const parts = markdown.split(/\n\s*\n/g);
  const chunks: string[] = [];
  let buffer = "";

  for (const part of parts) {
    const candidate = buffer ? `${buffer}\n\n${part}` : part;
    if (candidate.length > max) {
      if (buffer) chunks.push(buffer.trim());
      buffer = part;
    } else {
      buffer = candidate;
    }
  }

  if (buffer) chunks.push(buffer.trim());
  return chunks.filter(Boolean);
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY must be set to build the FAQ index.");
  }

  const faqPath = path.join(process.cwd(), "data", "faq.md");
  if (!fs.existsSync(faqPath)) {
    throw new Error("Missing data/faq.md. Add FAQs before building the index.");
  }

  const markdown = fs.readFileSync(faqPath, "utf8");
  const chunks = chunk(markdown);

  if (chunks.length === 0) {
    throw new Error("FAQ file is empty. Add content before building the index.");
  }

  const embeddings = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: chunks,
  });

  const index = chunks.map((text, i) => ({
    id: i,
    text,
    embedding: embeddings.data[i].embedding,
  }));

  const outputPath = path.join(process.cwd(), "data", "faq_index.json");
  fs.writeFileSync(outputPath, JSON.stringify({ index }, null, 2));

  console.log(`Indexed ${index.length} FAQ chunks to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
