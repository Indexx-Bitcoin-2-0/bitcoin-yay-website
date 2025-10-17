## Bitcoin Yay AI Support Assistant

This project now ships with a lightweight FAQ-driven AI assistant for bitcoinyay.com.

### 1. Configure environment variables
Create `.env.local` with:

```bash
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4.1-mini
APP_DOWNLOAD_IOS_URL=<https://apps.apple.com/...>
APP_DOWNLOAD_ANDROID_URL=<https://play.google.com/...>
SUPPORT_EMAIL=support@indexx.ai
FAQ_MATCH_THRESHOLD=0.78
SUPPORT_FORWARD_FROM=support-bot@bitcoinyay.com
```

### 2. Add or edit FAQ content
Update `data/faq.md` with your canonical FAQ answers (keep sections short).

### 3. Build the FAQ embeddings index
Install dependencies and create the embeddings once:

```bash
npm install
npm run build:faq
```

This writes `data/faq_index.json`, which the agent loads at runtime.

The agent automatically forwards uncovered questions to your support team. Update `SUPPORT_EMAIL` if you want responses to reference a different official address, fine-tune `FAQ_MATCH_THRESHOLD` (0-1) for stricter or looser matching, and adjust `SUPPORT_FORWARD_FROM` if your support API expects a specific sender address.

### 4. Run locally
Start the dev server and open the floating chat widget in the bottom-right corner of any page.

```bash
npm run dev
```

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
