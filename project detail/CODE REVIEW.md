# 🧠 CodeSage AI

**AI Code Review & Software Engineering Assistant** — upload source code, Git
repositories, or pull requests and receive AI-powered code reviews, bug
detection, security analysis, complexity metrics, documentation generation,
refactoring suggestions, and a RAG-powered "chat with your repository."

> A simplified blend of GitHub Code Review + SonarQube + an AI assistant +
> automatic Jira-style task generation.

---

## Architecture

```
USER → React Client → API Gateway (FastAPI)
                          ├── AI Service (OpenRouter LLM)
                          ├── Analyzer (static analysis + complexity)
                          └── Report Service
                          ↓
              PostgreSQL · ChromaDB (vectors) · File Storage
                          ↑
                  Redis + Celery (async jobs)
```

## Tech stack

| Layer      | Technology                                   |
| ---------- | -------------------------------------------- |
| Frontend   | React, TypeScript, Tailwind CSS, Vite        |
| Backend    | FastAPI, Python 3.12                          |
| Database   | PostgreSQL 16                                 |
| Vector DB  | ChromaDB                                      |
| Queue      | Redis + Celery                               |
| LLM        | **OpenRouter** (hosted, OpenAI-compatible)   |
| Embeddings | **fastembed** (local ONNX, CPU)              |
| Deployment | Docker + Docker Compose                      |

---

## Quick start (Docker)

```bash
cp .env.example .env
# edit .env: set a strong SECRET_KEY and your OPENROUTER_API_KEY

docker compose up --build
```

The embedding model (~130 MB ONNX) downloads automatically on first use — no
manual model setup needed.

| Service          | URL                                |
| ---------------- | ---------------------------------- |
| Frontend         | http://localhost:5173              |
| Backend API docs | http://localhost:8000/api/v1/docs  |
| Health check     | http://localhost:8000/api/v1/health |
| ChromaDB         | http://localhost:8001              |

---

## Local backend dev (without Docker)

```bash
cd backend
python -m venv .venv && .venv\Scripts\activate   # Windows
pip install -r requirements.txt
# point .env hosts at localhost (postgres/redis/chromadb) then:
uvicorn app.main:app --reload
pytest                                            # run unit tests
```

## Local frontend dev

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

---

## Project layout

```
backend/
  app/
    core/        config, database, security (JWT + hashing)
    models/      SQLAlchemy models (Users, Projects, Files, AnalysisResults, AIReports)
    schemas/     Pydantic request/response models
    crud/        DB access helpers
    api/         routes (auth, users, health) + dependencies
    services/    llm/ (OpenRouter), embeddings/ (local ONNX), rag/, analysis/
    workers/     Celery app + tasks
  tests/         unit tests
frontend/
  src/
    api/         axios client + auth API
    context/     AuthProvider
    components/   ProtectedRoute
    pages/       Login, Register, Dashboard
```

---

## Development roadmap (12 phases)

| Phase | Focus                       | Status         |
| ----- | --------------------------- | -------------- |
| 1     | Planning / architecture     | ✅ Done        |
| 2     | Authentication (JWT)        | ✅ Done        |
| 3     | Project upload (ZIP / Git)  | ✅ Done        |
| 4     | Code parser / project map   | ✅ Done        |
| 5     | Static analysis engine      | ✅ Done        |
| 6     | AI review engine            | ✅ Done        |
| 7     | Documentation generator     | ✅ Done        |
| 8     | Vector DB + RAG chat        | ✅ Done        |
| 9     | Issue tracker               | ✅ Done        |
| 10    | Frontend dashboard          | ✅ Done        |
| 11    | Dockerization               | ✅ Done        |
| 12    | Testing & deployment        | ✅ Done        |

**All 12 phases complete.** 🎉

### What works today (Phases 1–12)

- Full Docker Compose stack: Postgres, Redis, ChromaDB, backend, Celery
  worker, frontend.
- JWT auth: register, login, refresh, logout, password-reset flow.
- DB schema for all spec entities; tables auto-created on startup.
- Provider-agnostic LLM client (OpenRouter) with health checks.
- **Project upload (Phase 3):** ZIP archives (safe, Zip-Slip-guarded
  extraction), single source files, and public Git repository import
  (shallow clone). Each upload enqueues an async parse via Celery.
- **Code parser / project map (Phase 4):** language detection for the 7
  supported languages, recursive file scanner (skips vendored/build dirs),
  per-file symbol + import extraction (Python via `ast`, others via
  heuristics), and an aggregated project map (folder tree, LOC, language
  breakdown, dependency list, and **detected frameworks** — React, Next.js,
  Vue, Flask, Django, FastAPI, Express, Spring, … mapped from dependencies and
  shown as badges).
- **Static analysis engine (Phase 5):** code smells (long functions, high
  complexity, duplicate blocks, dead code, unused variables), complexity
  metrics (cyclomatic + cognitive via `radon`/`ast` for Python and heuristics
  elsewhere, maintainability index), a security analyzer (hardcoded secrets,
  SQL injection, weak auth, AWS keys / private keys), 5 quality sub-scores +
  an overall score, and a technical-debt estimate. Runs automatically after
  parsing; re-runnable on demand.
- **AI review engine (Phase 6):** a pretrained LLM (no fine-tuning) powers
  project-level **code reviews** plus per-file **explanations**, **bug
  detection**, and **refactoring suggestions**. The chat model runs on
  **OpenRouter** via the `LLMClient` abstraction (e.g.
  `google/gemma-4-31b-it:free` — fast, no local GPU). The **project review is
  statistics-driven**: the model
  receives a compact analysis summary (languages, file/LOC counts, issue
  breakdown, complexity, tech debt) — never the raw source — and returns an
  Executive Summary, Risk Assessment, Refactoring Suggestions, Technical Debt
  Estimate, and Action Plan. Outputs are saved as AIReports and can be
  **downloaded as a branded PDF** (Markdown → HTML → PDF via xhtml2pdf).
  Includes retry/backoff on rate limits and clean error mapping.
- **Documentation generator (Phase 7):** a **README generator** (project-level,
  driven by the project map — languages, structure, dependencies → Features /
  Architecture / Tech Stack / Installation / Usage) and per-file
  **function/class documentation** (signatures, params, returns, usage
  examples). Surfaced in a dedicated **Docs tab**; PDF-exportable.
- **RAG chat-with-repository (Phase 8):** code is chunked, embedded, and stored
  in **ChromaDB** (one collection per project). Questions embed the query,
  retrieve the top-k relevant chunks, and the LLM answers **with file/line
  citations**. Surfaced in a **Chat tab** (index button + conversation +
  sources), with **persisted chat history** per project (saved to the DB,
  reloaded on open, clearable). Embeddings use **`fastembed`** (local ONNX
  `bge-small`) via the `EmbeddingProvider` abstraction — fast on CPU, no GPU,
  no API key, no rate limits. Indexed a 487-chunk repo in ~2 min on a GPU-less CPU.
- **Issue tracker (Phase 9):** every analysis finding auto-becomes a
  **prioritized, trackable task** (Critical/High/Medium/Low from severity),
  with **status tracking** (Open → In Progress → Done). Generation is
  idempotent (de-duped by rule+file+line, preserves your status) and runs
  automatically after analysis. Surfaced in an **Issues tab** with status
  filters, counts, per-task status dropdown, and delete.
- Project API: upload / git / list / detail / files / file-detail / map /
  analysis / analyze / reparse / delete / review / file-ai / reports — all
  owner-scoped.
- React app with a **sidebar dashboard shell**: an overview page (stat cards +
  charts), Upload, Projects, Settings, Profile, and a project workspace with tabs
  — **Analysis · AI Review · Docs · Chat · Issues · Structure** (full-width,
  neumorphic).
- **Dockerization (Phase 11):** production `docker-compose.yml` (Postgres, Redis,
  ChromaDB, backend, Celery worker, frontend) with healthchecks, restart
  policies, configurable host ports, a non-root backend image, and a frontend
  build-arg for the API URL.
- **Testing & deployment (Phase 12):** **38 passing tests** (unit + API
  integration incl. ownership isolation), a **bandit** security scan + hardening
  checklist (`SECURITY.md`), a **locust** load test (`loadtest/`), and a full
  **`DEPLOYMENT.md`**.

> Local dev runs Celery in **eager mode** (`CELERY_TASK_ALWAYS_EAGER=true`) so
> uploads parse inline without a separate worker; Docker uses the real worker.

---

## License

Educational project — see the original specification (`AI CODE REVIEW.pdf`).
