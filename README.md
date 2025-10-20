## Bitcoin Yay AI Support Assistant

This project now ships with a floating AI help desk powered by the OpenAI **Agent Kit**. The chat widget hands every user message to a hosted Agent that you configure on the OpenAI platform—no custom RAG plumbing required.

### 1. Create and configure your Agent
1. Visit [platform.openai.com/agents](https://platform.openai.com/agents) and create an Agent for Bitcoin Yay.
2. Upload `data/faq.md` (or any updated FAQ content) to the Agent as a Knowledge Base so answers stay grounded.
3. Give the Agent clear instructions about tone, formatting, and the `FORWARD_SUPPORT:` fallback prefix (see `src/app/api/agent/route.ts` for the logic we expect).
4. Copy the Agent ID and place it in `.env.local` as `OPENAI_AGENT_ID`.

### 2. Set environment variables
Create `.env.local` with the following keys:

```bash
OPENAI_API_KEY=sk-...
OPENAI_AGENT_ID=agent_...
SUPPORT_EMAIL=support@indexx.ai
SUPPORT_FORWARD_FROM=support-bot@bitcoinyay.com
APP_DOWNLOAD_IOS_URL=https://apps.apple.com/ph/app/bitcoin-yay/id6744868017
APP_DOWNLOAD_ANDROID_URL=https://play.google.com/store/apps/details?id=com.bitcoin2&hl=en
NEXT_PUBLIC_API_URL=<https://api.your-backend.com> # used by CONTACT_US_ROUTE
```

### 3. How the fallback works
- If the Agent cannot answer a question it must reply with `FORWARD_SUPPORT: <short summary>`.
- Our `/api/agent` route detects that prefix, submits the question to the existing `emailToAdmin` endpoint (`CONTACT_US_ROUTE`), and returns a safety-focused confirmation to the user.
- If the support API is unreachable we ask the user to email `SUPPORT_EMAIL` directly, reminding them to ignore phishing attempts.

### 4. Run it locally
```bash
npm install
npm run dev
```

Launch the site at [http://localhost:3000](http://localhost:3000/) and interact with the “Chat with Bitcoin Yay” widget in the lower right corner. The widget keeps the Agent session alive between turns so follow-up questions stay in context.

### 5. Notes
- The old FAQ embedding script has been removed—knowledge is managed entirely inside the OpenAI Agent.
- The chat widget theme matches the primary Bitcoin Yay palette and auto-suggests the next FAQ question after every response.
- Suspicious email reports are routed to support automatically, and every answer wraps URLs so links are clickable.
