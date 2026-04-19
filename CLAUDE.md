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

Two active in-browser engines implement the `IDbEngine` interface (`src/types/engine.ts`):

| Engine | Class | Notes |
|---|---|---|
| SQLite | `SqliteEngine` | via `sql.js` (WASM) |
| PostgreSQL | `PgliteEngine` | via `@electric-sql/pglite` |

A `DuckdbEngine` exists in the codebase but is not exposed in the UI. All engines share the same interface: `init`, `exec`, `query`, `introspect`, `destroy`. Switching engines tears down the old instance and re-seeds the schema from scratch.

The vite dev server requires `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` headers (already set in `vite.config.js`) because PGLite uses SharedArrayBuffer.

### State management

`DbProvider` (`src/context/DbContext.tsx`) holds a `useRef` to the active engine instance and a `useReducer` for UI state (`initialising | ready | error`). Engine and schema selections are persisted to `localStorage` via `useLocalStorage`. On mount it restores the last-used engine+schema combination.

The `Shell` component in `App.tsx` owns all scenario-level state: `passedIds`, `revealedIds`, `skippedCounts`, `selectedConcepts`, and the active `scenario`. All of these are persisted to `localStorage` via `useLocalStorage`. Storage keys are centralised in `src/utils/storageKeys.ts`.

### Scenario lifecycle

Scenarios are identified by `shortcodeFromPrompt(scenario.prompt)` — a stable hash used as the key in all localStorage records. The active scenario is also reflected in the URL as `?s=<shortcode>` (URL param takes priority on load).

On engine or schema change, `filterScenariosForEngine` narrows the pool, then `pickRandom` (`src/utils/scenarioSelection.ts`) selects from untested scenarios first, falling back to the full pool. `selectedConcepts` further filters the pool before `pickRandom` is called.

Pass/reveal/skip semantics:
- **Pass**: `expectedSql` is run at scenario load time; the user's result is compared order-insensitively via `compareResults`. A correct answer (without reveal) permanently adds the shortcode to `passedIds`.
- **Reveal**: copies `expectedSql` into the editor and adds to `revealedIds`. Revealed scenarios never count as passed.
- **Skip**: increments `skippedCounts[shortcode]` and calls `pickRandom` for the next scenario.

### Schemas (`src/schemas/`)

Each schema is an `ISchemaDefinition` (`src/types/schema-definition.ts`) with:
- `sql` — raw SQL string (imported with `?raw`) seeded into the engine on load
- `scenarios` — array of `Scenario` objects (`src/types/scenario.ts`)

A `Scenario` has a `prompt`, `expectedSql`, SQL concept tags (`concepts: ConceptId[]`), optional `hints`, and an optional `engines` allowlist to restrict which engines support it.

### Result comparison (`src/utils/compareResults.ts`)

`compareResults` is order-insensitive: it sorts both column lists and serialises+sorts rows before comparing. `detailedComparison` returns per-column and per-row match booleans for highlighting in the output panel.

### Layout

`App.tsx` renders a fixed header + view toggle (Drill / History) + a left sidebar (schema browser) + a resizable split panel (editor left, output right). Panel layout is persisted to `localStorage`. A `LoadingOverlay` blocks interaction while an engine is initialising.

## Adding a new schema

1. Add a `.sql` file to `src/schemas/` for the DDL + seed data.
2. Create a `.scenarios.ts` file exporting a `Scenario[]`.
3. Export an `ISchemaDefinition` from `src/schemas/index.ts` and add it to the `schemas` array.
