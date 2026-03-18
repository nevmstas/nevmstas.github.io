# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Root (run from repo root)
```bash
yarn                                          # Install all workspace dependencies
yarn workspace @nevmstas/website dev          # Website dev server
yarn workspace @nevmstas/website build        # Build website (static output)
yarn workspace resume-generator dev           # Resume generator dev (Next.js + Turbopack)
yarn workspace resume-generator build         # Build resume generator
yarn workspace resume-generator lint          # ESLint for resume-generator
yarn workspace @nevmstas/hygraph-client build # Compile hygraph-client
yarn workspace @nevmstas/hygraph-client generate # Regenerate GraphQL SDK from schema
```

### Type checking
```bash
# Website (SvelteKit)
cd workspaces/website && yarn check

# Resume generator (TypeScript via Next.js build)
cd workspaces/resume-generator && yarn build
```

No test suite exists in this repository.

## Architecture

**Monorepo** managed with Yarn 4 workspaces. Four packages:

| Package | Path | Role |
|---|---|---|
| `@nevmstas/hygraph-client` | `workspaces/hygraph-client` | Auto-generated GraphQL SDK + types from Hygraph CMS |
| `@nevmstas/resume` | `workspaces/resume` | React component library for PDF resume rendering |
| `@nevmstas/website` | `workspaces/website` | SvelteKit portfolio site (deployed to GitHub Pages) |
| `resume-generator` | `workspaces/resume-generator` | Next.js app for AI-powered resume/cover letter generation |

### Data flow

```
Hygraph CMS → hygraph-client (codegen) → website + resume-generator
                                          ↓
                                     resume (PDF components)
```

- `hygraph-client/src/get-sdk.ts` is **auto-generated** — never edit manually. Run `yarn workspace @nevmstas/hygraph-client generate` to regenerate after schema changes.
- GraphQL documents live in `workspaces/website/documents/*.graphql` — the codegen reads these to generate typed queries used by both website and resume-generator.

### Resume Generator (Next.js)

AI pipeline for a job application:
1. **Classify role** (`src/openai/classify-role.ts`) — GPT-4o-mini classifies the job description into `frontend | mobile | ai_native | fullstack`
2. **Build system prompt** (`src/openai/system-prompt.ts`) — constructs role-aware context with resume data and job description
3. **Generate CV / Cover Letter** (`src/openai/prompt-cv.ts`, `prompt-cover-letter.ts`) — calls GPT-4o with structured Zod output
4. **Persist locally** (`src/db/resume-db.ts`) — Dexie/IndexedDB stores the latest generated result (key `'latest'`)

API routes: `src/app/api/generate-cv/route.ts` and `generate-cover-letter/route.ts`.

Zod schemas in `src/schema/index.ts` define the structured response format passed to OpenAI's `zodResponseFormat`.

### Website (SvelteKit)

Static site (SvelteKit static adapter → `workspaces/website/build`). Data fetched server-side in `+page.server.ts` files via the hygraph-client SDK. Deploys automatically to GitHub Pages on push to `main` via `.github/workflows/deploy.yml`.

The `ProfileHeader.svelte` and other components in `src/lib/components/` render portfolio data from Hygraph.

### Resume Library (React)

Consumed by both the website (to preview) and resume-generator (to render PDF). Entry point: `src/index.ts`. Components in `src/components/harvard/`. PDF generation via `@react-pdf/renderer`. Custom hooks: `useOpenPdf`, `useResume`.

### Skills type system

`SkillType` enum is defined in the Hygraph schema and used across all workspaces. In the resume library, `Cloud` type is normalized to `Cicd` for display grouping (`workspaces/resume/src/components/harvard/skills/Skills.tsx`).

## Environment Variables

| Variable | Used in | Purpose |
|---|---|---|
| `PUBLIC_HYGRAPH_URL` | website | Hygraph GraphQL endpoint |
| `PUBLIC_HYGRAPH_TOKEN` | website | Hygraph read token |
| `HYGRAPH_URL` | hygraph-client | Used during codegen |
| `OPENAI_API_KEY` | resume-generator | OpenAI API access |
