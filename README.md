# bitcoin-yay – Alchemy Experience

This repository powers the bitcoin-yay front-end experience built on Next.js. It orchestrates the Alchemy conversion funnel, history viewer, receipts, and multi-destination claim flow (Indexx asset wallet, TronLink, Phantom) using the `/api/v1/...` and `/api/v2/...` endpoints exposed by the bitcoin-yay gateway.

## Directory highlights

- `src/lib/alchemy.ts` contains the shared HTTP helpers you can reuse (start/complete/process sessions, format errors, persist the click-convert session, finalize before claiming).
- `src/app/alchemy/page.tsx` hosts the Alchemy landing view and entry form; `outcome/result/page.tsx` displays conversion receipts; `claim/page.tsx` manages the destinations/wallet UX.
- `src/routes.tsx` defines the environment-based API routes so both the web UI and mobile apps can call the same URLs.
- `src/contracts/tron/abi.js` exposes the TRON ABI used by the on-chain claim helpers.

## Local development

```bash
npm install          # install dependencies (alternatively `yarn` or `pnpm`)
npm run dev          # start Next.js dev server
npm run lint         # run ESLint and TypeScript checks
npm run build        # build for production
```

The app expects `NEXT_PUBLIC_API_URL` (and any wallet/Alchemy feature flags) to be available in your `.env` files or environment.

## Key workflows

### 1. Start click-and-convert (v2) session
`POST /api/v2/bitcoinyay/alchemy/process` with `{ email, nuggetTokens, userType, referralCodeUsed?, nftBoostApplied? }`. Response includes the session record either in `data` or `session`. The UI enforces a 1000 BTCY nugget payload and shows friendly cooldown messages when the server returns `Next session available on…`.

### 2. Finalize / claim preparation
`POST /api/v2/bitcoinyay/alchemy/complete` (client helper `completeAlchemyProcess`) returns the updated session for later claims. The `finalizeClickConvertSessionState` helper forces completion when a user hits “Claim Tokens” and persists the session for the claim page.

### 3. Claim destinations
- **Indexx Asset Wallet:** centralised, fast-track destination with liquidity pool support coming soon. Recommended in the UI with a “Fast Track” badge.
- **Tron:** interact with `tronLink`, fetch whitelist state via `TRONABI`, sign a transaction calling `claim()` and read the resulting `txid`.
- **Solana:** connect Phantom and show the computed SOL balance (the claim flow is described textually; the actual on-chain instruction is a placeholder).

### 4. Session history
`GET /api/v2/bitcoinyay/alchemy/sessions/{email}` fetches history entries (used in `src/app/alchemy/history/page.tsx`). The component paginates, filters by session ID, and sorts by most recent completion time.

## Claim UX notes

- The claim button disables while the session is finalizing or a claim transaction is pending, showing contextual helper text.
- Tron/Solana wallet connect buttons detect install/connect state, and the Indexx wallet option highlights the recommended destination with a special label.
- The claim page shows on-chain whitelist/claim status for Tron and copies addresses for the other destinations.

## Testing & validation

1. Start a session via the Alchemy landing page with at least the minimum BTCY balance (`MINIMUM_BTCY_BALANCE_FOR_ALCHEMY` in `src/app/alchemy/constants.ts`).
2. After the session is queued, inspect `/alchemy/outcome` to see formatted nuggets/tokens and download receipts.
3. Use `/alchemy/history` to search the session by ID, paginate, and click “Claim” to be routed to `/alchemy/claim`.
4. On the claim page, finalize the session and use the Indexx/Tron/Solana flows to verify the UI states and warnings.

## Support

If you need updated API specs or run into runtime errors, check the console logs from `completeAlchemyProcess`, `processAlchemyConversion`, and the claim helpers – they log both the parsed response and any underlying exceptions before surface messaging to the UI.

