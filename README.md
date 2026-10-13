# AI Fluency Assessment (React track)

A LeetCode-style assessment where candidates solve React problems **with** AI. Every action is logged. Hidden tests run on the server. The score measures outcome, verification, efficiency, prompting, and iteration — not raw token count.

This is a solo build. Milestone 0 is setup: Next.js, shadcn/ui, Supabase, and the problem folder layout.

## Stack (v1)

| Piece | Choice |
| --- | --- |
| App | Next.js (App Router, TypeScript, Tailwind) |
| UI | shadcn/ui |
| Database | Hosted Supabase (Postgres) |
| AI | One provider, called from the server |
| Grading | Docker worker + hidden Vitest tests (later) |

## Setup

1. Install Node.js LTS (this machine uses `~/.local/node`, currently v24).
2. Copy `.env.example` to `.env.local` and fill in your Supabase URL and keys. The **service-role key is server-only**.
3. In the Supabase SQL editor, run `db/migrations/000_health.sql`.
4. `npm install` then `npm run dev`.
5. Open [http://localhost:3000](http://localhost:3000) and [http://localhost:3000/api/health](http://localhost:3000/api/health). Health should return the `health` row as JSON.

## Repo layout

```
app/                 Next.js App Router (pages + /api)
components/ui/       shadcn components
lib/supabase/        server-only database client
db/migrations/       SQL schema
problems/            one folder per problem (not served as static files)
```

## Working rules

See the solo build plan: one milestone at a time, weekly cycle, daily commits, `DECISIONS.md` for stack choices, automated tests for scoring.

## Secret safety

Never commit `.env.local`. If a key is pushed, rotate it in the provider dashboard immediately. Deleting the commit does not make the key safe.
