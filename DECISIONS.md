# Decisions

One line per choice so we do not re-debate it later. Stack follows the solo build plan (13 Oct 2026).

- Used a single Next.js app (App Router + route handlers) instead of NestJS + Next.js because one person cannot maintain two backends until the API outgrows one codebase.
- Called one AI provider directly from the server (no LiteLLM) because scores stay comparable with a fixed model; add a gateway when we need several models or per-key budgets.
- Stored prompts and responses in our own Postgres events table instead of Langfuse because a single events log is enough until debugging prompts by hand becomes slow.
- Used a `grading_jobs` table that a worker polls instead of BullMQ/Redis because one worker is enough for the pilot; add a queue when it cannot keep up.
- Used one judge model and one written rubric, checked against human grades, instead of two or three judges until calibration shows the judge is unstable.
- Used hosted Supabase (Postgres + Auth primitives) instead of self-hosted Postgres because it is faster to run alone; self-host if cost or control requires it.
- Skipped JPlag, rrweb, badges, and SSO until after the pilot.
- Kept hidden tests on the server and a full event log because those two things make the score trustworthy.
- Used shadcn/ui + Tailwind for UI because we own the components and will customize a three-pane layout.
- Put the service-role key only in server code (`.env.local`, never client components) because that key bypasses Row Level Security.
- Scoring weights follow the solo plan for v0 (outcome 40%, verification 20%, efficiency 15%, prompting 15%, iteration 10%) rather than the POC doc's 35/20/15 split, so later milestones match the build plan.
- Problem folders live at `problems/<slug>/` with `problem.md`, `starter/`, `reference/`, and `tests/` so content stays outside the Next.js public bundle.
