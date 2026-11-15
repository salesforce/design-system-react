# Performance checks

Two Vitest projects, kept out of `npm test`:

- **`perf`** (real Chromium): `tests/perf/*.perf.test.tsx` and `components/**/__perf__/*.perf.test.{jsx,tsx}`, plus the `*.bench.tsx` timing benchmarks.
- **`perf-bundle`** (Node): `tests/perf/*.perf.test.ts`, the bundle checks against `dist/`.

| Command                | What it does                                                                      |
| ---------------------- | --------------------------------------------------------------------------------- |
| `npm run test:perf`    | Both projects, checked against `budgets.json`. Run `npm run build` first.         |
| `npm run perf:budgets` | Same run, but records the measured values into `budgets.json` instead of failing. |
| `npm run perf:bench`   | Timing benchmarks (report-only), JSON to `.tmp-perf/bench.json`.                  |
| `npm run perf:report`  | Markdown summary of the last `perf:budgets` and `perf:bench` runs (`.tmp-perf/`). |

## Counts, not stopwatches

Timings are noisy on shared CI runners, so every gating check counts something deterministic: React commits, renders of one component, DOM nodes, live listeners, pending timers, live observers, layout reads, bytes. Only the `*.bench.tsx` files time anything, and they never fail a run.

## Ideal and budget

Each check calls `checkBudget(key, metrics, ideal)` from `budget.ts` (re-exported by `helpers.tsx`); `recordPerf(key, metrics, lists)` records report-only values:

- The **ideal** is in the test: what a well-behaved component reaches (1 mount commit, 0 leaked listeners, 0 console errors…).
- The **budget** is in `budgets.json`, keyed by fixture (`Combobox/Base`, `bundle:components/button`…). A metric with no budget must meet its ideal, so the file lists only size metrics (DOM nodes, SSR bytes, gzip bytes) and the known violations.
- Counts are exact. Size metrics get the larger of the `tolerance` (DOM and SSR +10 %, gzip +5 %) and the `slack` (DOM +2 nodes, SSR and gzip +100 bytes) in `budgets.json`, so a small story can still grow a little. The leak check's `retainedMounts` gets a slack of 10 and a tolerance of 30 %, because a mount or two can outlive a GC for a while and a known leak's count varies by about ±7 between runs. `limits.ts` has the rule.

A value over its ideal is a **violation**. It passes, because the budget records it, and `perf:report` lists it as a follow-up fix. A value over its budget is a **regression** and fails.

The bundle checks also keep `components` in `budgets.json`: the component directories each entry pulled in at the last recording. An entry that starts pulling in another component (button importing combobox) fails until it's re-recorded.

Changing a budget is a reviewed diff. After a fix, or a deliberate size change, run `npm run perf:budgets` and commit `budgets.json` with the change. `perf:budgets` merges, so a filtered run (`-- -t Combobox`) only touches the fixtures it measured. The full run (the npm script) also drops fixtures that no longer exist.

## Helpers (`helpers.tsx`)

| Helper                          | Measures                                                                                                    |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `renderCounted(ui)`             | Commits (with `actualDuration`) through `<React.Profiler>`; StrictMode off.                                 |
| `countRenders(Component, name)` | Renders of one component, keeping memo/forwardRef/class behavior. Use `countRendersModule` in a `vi.mock`.  |
| `trackContextValue(Context)`    | How often a provider's `value` identity changes.                                                            |
| `trackListeners()`              | Live listeners; `global()`, `leaked()` (still reachable after unmount), and non-passive wheel/touch ones.   |
| `trackTimers()`                 | Pending `setTimeout`/`setInterval`/`requestAnimationFrame`. Real timers, so components behave as in an app. |
| `trackObservers()`              | Live `ResizeObserver`/`MutationObserver`/`IntersectionObserver`.                                            |
| `trackLayout()`                 | Layout reads, and reads that force a synchronous reflow (DOM changed since the last read).                  |
| `trackConsoleErrors()`          | `console.error` calls, ignoring DSR's once-per-session `[Design System React]` prop warnings.               |

`helpers.perf.test.tsx` checks that each tracker catches what it's for.

## Fixtures

`stories.ts` composes every story, as the snapshot suite does (copied, not shared). Test files that use it mock `utilities/generate-id` with `generate-id-mock.ts` so ids, and so DOM sizes, are stable. Component-specific checks (selection locality, typing cost, context stability…) live in `components/<name>/__perf__/` and build their own large fixtures.

## Fixing a violation

Each fix is its own `fix:`/`perf:` PR with its budget update. Check the breaking-change risks first (see the Track D notes in ROADMAP.md):

- Removing closed-state DOM can break consumers' `getByRole(…, { hidden: true })` queries.
- Wrapping an **exported** component in `React.memo`, or converting a class to a function, changes its type, statics and `ref`. Memoize internal subcomponents instead.
- Calling `onChange`/`onSelect` less often, or with different data, is a callback-signature change.
