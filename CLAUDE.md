# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start Vite dev server
npm run build      # tsc type-check + Vite production build
npm run preview    # preview production build
```

No test runner or lint script is configured yet.

## Architecture

**Drill Your Queries** is a browser-only SQL practice app. Users are given natural-language prompts, write SQL against an in-browser database, and their results are compared against a pre-computed expected result.

### Database engines (`src/db/`)

Three in-browser engines each implement the `IDbEngine` interface (`src/types/engine.ts`):

| Engine | Class | Notes |
|---|---|---|
| SQLite | `SqliteEngine` | via `sql.js` (WASM) |
| PostgreSQL | `PgliteEngine` | via `@electric-sql/pglite` |
| DuckDB | `DuckdbEngine` | via `@duckdb/duckdb-wasm` |

All engines share the same interface: `init`, `exec`, `query`, `introspect`, `destroy`. Switching engines tears down the old instance and re-seeds the schema from scratch.

The vite dev server requires `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` headers (already set in `vite.config.js`) because DuckDB and PGLite use SharedArrayBuffer.

### State management (`src/context/DbContext.tsx`)

`DbProvider` holds a `useRef` to the active engine instance and a `useReducer` for UI state (`initialising | ready | error`). Engine and schema selections are persisted to `localStorage` via `useLocalStorage`. On mount it restores the last-used engine+schema combination.

### Schemas (`src/schemas/`)

Each schema is an `ISchemaDefinition` (`src/types/schema-definition.ts`) with:
- `sql` — raw SQL string (imported with `?raw`) seeded into the engine on load
- `scenarios` — array of `Scenario` objects (`src/types/scenario.ts`)

A `Scenario` has a `prompt`, `expectedSql`, difficulty (1–3), SQL concept tags, and optional hints. The app runs `expectedSql` through the active engine at scenario load time to produce the reference result.

### Result comparison (`src/utils/compareResults.ts`)

`compareResults` is order-insensitive: it sorts both column lists and serialises+sorts rows before comparing. `detailedComparison` returns per-column and per-row match booleans for highlighting in the output panel.

### Layout

`App.tsx` renders a fixed header (engine/schema selectors) + a left sidebar (schema browser) + a resizable split panel (editor left, output right). Panel layout is persisted to `localStorage`. A `LoadingOverlay` blocks interaction while an engine is initialising.

Storage keys are centralised in `src/lib/storageKeys.ts`.

## Adding a new schema

1. Add a `.sql` file to `src/schemas/` for the DDL + seed data.
2. Create a `.scenarios.ts` file exporting a `Scenario[]`.
3. Export an `ISchemaDefinition` from `src/schemas/index.ts` and add it to the `schemas` array.
