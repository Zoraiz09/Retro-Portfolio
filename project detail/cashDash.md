# Multi-Currency Exchange Shop & Counterparty Ledger System

A customized Currency Exchange & Ledger application for a retail money-exchange
shop. It handles fiat exchange-rate calculations, tracks physical vault stock,
logs the daily transaction stream, and manages real-time counterparty
debtor/creditor relationships ("who owes me" vs "who I owe") on one platform.

Built to the supplied **System Requirements & Technical Architecture** document.

## Stack (as specified)

| Layer | Technology |
| --- | --- |
| Database / Backend | **Supabase (PostgreSQL)** — `NUMERIC` precision, real-time, RLS auth |
| Front-end | **Next.js 14 (App Router) + React** |
| UI | **Tailwind CSS + shadcn/ui** (dense ledger tables) |

## Features implemented

- **Dynamic currency & inventory engine** (`/currencies`) — add, activate, or
  shelve any fiat currency; live vault balances; editable base/cost rate.
- **Dual-action BUY / SELL tickets** (`/transactions/new`) — instant
  `amount × rate` counter-value math with a live receipt preview.
- **Counterparty credit ledger** (`/profiles`) — Receivables ("who owes me") and
  Payables ("who I owe"), per counterparty and currency.
- **Spot vs deferred settlement** — the "Fully Settled Right Now?" checkbox
  branches between an instant vault swap and a credit-ledger entry.
- **Debt settlement module** (`/profiles/[id]`) — post partial/full payments;
  each appends an auditable settlement receipt and moves vault cash.
- **Daily reconciliation dashboard** (`/`) — vault stock, today's P&L,
  outstanding receivables/payables, and a live transaction feed.
- **Real-time sync** — every screen subscribes to Postgres changes and
  re-renders automatically when another terminal saves an entry.

## Database schema (Spec section 4)

`currencies`, `profiles`, `transactions`, `ledgers` are implemented exactly as
specified. Money columns use `NUMERIC(18,4)` / `NUMERIC(18,6)` so there are no
floating-point rounding errors.

Documented **extensions** beyond the four core tables (each required to fulfil a
feature in the spec):

- `currencies.is_active` — the "activate / temporarily shelve" requirement (2.1).
- `currencies.base_rate` + `is_base` — needed for the P&L spread report (2.4) and
  to identify the local tender (PKR).
- `settlements` table — the "auditable receipt sub-row" of the debt settlement
  module (2.3).
- Views `transaction_details` and `ledger_balances` — power the dashboard/log.

### Money-movement model (important)

The shop trades a **foreign** currency against the **local base** (PKR):

- **BUY** — receive foreign cash, release PKR → foreign vault `+`, PKR vault `−`.
- **SELL** — release foreign cash, receive PKR → foreign vault `−`, PKR vault `+`.

For a **deferred (credit)** trade the foreign leg still moves physically, but the
local counter-value is booked to the counterparty ledger **instead of** the vault
(`+` receivable on a SELL, `−` payable on a BUY). When the debt is later settled,
`settle_debt()` moves that cash into/out of the vault.

> The spec's section-5 walkthrough literally adjusts *both* vaults and *also*
> books a receivable for a deferred trade — that double-counts the cash. To keep
> the vault equal to real cash on hand (the whole point of the system), the
> unfunded leg is routed to the ledger only. This is standard accounts-receivable
> accounting. All atomic logic lives in the `execute_exchange` /
> `settle_debt` Postgres functions (true ACID — all-or-nothing).

## Setup

### 1. Create a Supabase project
At <https://supabase.com>, then grab the URL and keys from
**Project Settings → API**.

### 2. Apply the schema
In the Supabase **SQL Editor**, run the files in order:

```
supabase/migrations/0001_schema.sql
supabase/migrations/0002_functions.sql
supabase/migrations/0003_views_rls.sql
supabase/seed.sql        -- optional demo data
```

(Or use the Supabase CLI: `supabase db push`.)

### 3. Enable real-time
Supabase Dashboard → **Database → Replication** → add the `transactions`,
`currencies`, `ledgers`, and `settlements` tables to the `supabase_realtime`
publication.

### 4. Create an operator account
**Authentication → Users → Add user** (email + password). The app requires login.

### 5. Configure & run

```bash
cp .env.local.example .env.local   # fill in your Supabase URL + anon key
npm install
npm run dev
```

Open <http://localhost:3000>, sign in, and you'll land on the dashboard.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Daily reconciliation dashboard (live) |
| `/transactions/new` | Record a BUY / SELL exchange |
| `/transactions` | Full transaction log + P&L, with filters |
| `/currencies` | Currency & vault inventory engine |
| `/profiles` | Counterparties: receivables / payables |
| `/profiles/[id]` | Ledger detail + debt settlement module |
| `/login` | Operator sign-in |

## Worked example (Spec section 5)

Selling **$100 USD to Ali at 280 PKR**:
1. Form computes `100 × 280 = 28,000 PKR` counter-value instantly.
2. `execute_exchange('SELL', …)` inserts the transaction row and drops the USD
   vault by 100.
3. If **settled** → PKR vault `+28,000`. If **deferred** → Ali's ledger gets a
   `+28,000 PKR` receivable that surfaces under Receivables on the dashboard.
