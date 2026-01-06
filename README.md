# nevmstas.github.io

Personal monorepo with portfolio website and AI resume helper.

## Architecture

The project uses a monorepo structure with shared packages. `hygraph-client` provides GraphQL types and queries for fetching data from Hygraph CMS. The `resume` workspace contains reusable React PDF components that generate resume PDFs. Both `website` (SvelteKit) and `resume-generator` (Next.js) consume these shared packages to display and generate resumes.

## Workspaces

- `website` — Portfolio site (SvelteKit)
- `resume-generator` — AI resume helper
- `resume` — Resume components library
- `hygraph-client` — GraphQL client for Hygraph CMS

## Setup

```bash
yarn install
```
