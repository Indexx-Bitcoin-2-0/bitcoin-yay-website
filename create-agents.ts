// scripts/create-agent.ts
import { Client } from "@openai/agents";
import fs from "fs";

const client = new Client({ apiKey: process.env.OPENAI_API_KEY! });

async function main() {
  const agent = await client.agents.create({
    name: "Bitcoin Yay Support",
    instructions: `
You are the Bitcoin Yay Help Agent...
If you cannot find an answer, reply with "FORWARD_SUPPORT: <short summary>".
    `,
    model: "gpt-4.1-mini",
  });

  console.log("Agent ID:", agent.id);

  // (Optional) upload your FAQ as a knowledge document
  const faq = fs.createReadStream("data/faq.md");
  await client.agents.documents.upload(agent.id!, faq, { name: "faq.md" });
}

main().catch(console.error);
