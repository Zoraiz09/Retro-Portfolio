# SystemForge

**Transform ideas into software blueprints.**

Describe the software you want to build, and SystemForge generates an interactive
system architecture you can explore, analyze, and evolve — with on-demand AI
specialists for cost, risk, scaling, market competition, and more.

## Features

- **AI Architect** — turns a one-line idea into a full system architecture.
- **Interactive canvas** — pan/zoom a live map of your system; click any node for
  its purpose, complexity, recommended stack, and dependencies.
- **On-demand agents** — Cost, Risk, Scaling, Roadmap, API, Database, and Startup
  analysis, run only when you ask (cost & market figures localized for Pakistan).
- **Architecture Council** — specialists debate a design decision (e.g. SQL vs
  NoSQL) and a Chief Architect delivers a verdict.
- **Market & Competition** — competitor breakdown, the market gap, and how to win.
- **Architecture Score** — graded on scalability, security, maintainability, cost.
- **PDF report** — download the full architecture + analyses as a PDF.

No accounts, no tracking. The current project lives in `sessionStorage` and clears
when you close the tab.

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
React Flow (`@xyflow/react`) · Zustand · Framer Motion · pdfmake ·
Groq (`llama-3.3-70b-versatile`).

## Run locally

```bash
npm install
cp .env.example .env.local   # then paste your Groq key into .env.local
npm run dev                  # http://localhost:3000
```

Get a free Groq API key at <https://console.groq.com/keys>.
Without a key, the app loads but every AI action shows
"AI is not configured."

## Deploy to Vercel

The only required configuration is one environment variable: **`GROQ_API_KEY`**.

### Option A — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel            # first run links/creates the project (accept defaults)
vercel env add GROQ_API_KEY    # paste your key; choose Production (and Preview)
vercel --prod     # deploy
```

### Option B — GitHub + Vercel dashboard

1. Push this folder to a GitHub repo.
2. In Vercel, **New Project → Import** that repo (framework auto-detects as Next.js).
3. **Project Settings → Environment Variables**, add:
   - Name: `GROQ_API_KEY`  Value: _your key_  Environments: Production + Preview
4. **Deploy.** Vercel auto-deploys on every push afterwards.

### Notes

- The Groq key is used **server-side only** (inside `/api/*` routes), so it is
  never exposed to the browser. Never commit `.env.local` — it is gitignored.
- Groq's **free tier allows 100k tokens/day**. When that's exhausted the app
  shows a clear "Groq API limit reached" message (it does **not** fall back to
  fake data). Upgrade your Groq plan for higher limits.
