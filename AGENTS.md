# Agent Guide: Design System React

Instructions for AI coding agents (and a quick-start for humans) working in this repo. For conventions and rationale, read [docs/codebase-overview.md](docs/codebase-overview.md) — start at [Creating a New Component](docs/codebase-overview.md#creating-a-new-component) before writing component code. Human contributor setup is in [CONTRIBUTING.md](CONTRIBUTING.md).

## Commands

Never run bare `npm test` — it starts Vitest in watch mode and will not exit.

| Command                | Purpose                                                                        |
| ---------------------- | ------------------------------------------------------------------------------ |
| `npm run typecheck`    | `tsc --noEmit`                                                                 |
| `npm run lint`         | ESLint; must be 0 errors (warnings are the tracked migration backlog)          |
| `npm test -- --run`    | All tests: jsdom `unit` project, real-browser `browser` project, and snapshots |
| `npm test -- --run -u` | Same, and regenerate story HTML snapshots                                      |
| `npm run build`        | Type-check, library build, `.d.ts`, entry shims                                |

CI runs typecheck, test, build, and lint. Run all four before requesting review.

## Things that are easy to miss

- **Stories are test fixtures, not just demos.** Every story in `components/**/__docs__/*.stories.{jsx,tsx}` is rendered into `components/__tests__/__snapshots__/story-snapshots.test.jsx.snap`. If you add, remove, or change a story, or change a component's rendered markup, run `npm test -- --run -u`, review the snapshot diff, and commit it in the same PR.
- **A filtered test run does not run the snapshot suite.** `npm test -- --run components/combobox` skips `components/__tests__/story-snapshots.test.jsx`. Always finish with an unfiltered run.
- **Stories must use the component's real prop API.** Cross-check against `components/<name>/__examples__` and `types.ts`; stories written against an assumed API are a common source of "component looks broken" reports.
- **jsdom vs. browser tests.** Tests that need a real browser (focus traversal, layout/measurement) go in `*.browser.test.jsx`; everything else is jsdom.
- **Types are the contract.** Runtime PropTypes were removed in the TypeScript migration; the generated `.d.ts` files are what consumers get.
- **Restoring or mirroring existing behavior** (stories lost in a rewrite, parity with another implementation): build the inventory from git (`git show <old-ref>:<path>`, `git log --follow`), not from memory, and list the before/after set in the PR description.

## Git and pull requests

- **Maintainers:** push branches to `salesforce/design-system-react`, not a personal fork. Chromatic runs on push, so fork PRs get no visual review. External contributors fork as described in CONTRIBUTING.md.
- **Conventional commits** are enforced by commitlint (`fix:`, `feat:`, `docs:`, `chore:`, `test:`, `style:`, …). Public API removals or renames are breaking: use `!` and a `BREAKING CHANGE:` footer.
- **Keep lint/format-only changes in their own commit** (`style:`), separate from the `fix:`/`feat:` commit, so the functional diff is reviewable.
- **Rebase on `master` and resolve conflicts before requesting review.**
- Fill in [docs/PULL_REQUEST_TEMPLATE.md](docs/PULL_REQUEST_TEMPLATE.md). For bug fixes, state the root cause, not just the symptom, and add a regression test.

## Scratch files

Agent-generated notes, plans, and analyses go in `.planning/` (gitignored). Don't commit them.

## Reference

Sections of [docs/codebase-overview.md](docs/codebase-overview.md) to check when a decision is ambiguous:

- [Props Conventions](docs/codebase-overview.md#props-conventions) — naming, callbacks, `labels`/`assistiveText`, boolean defaults
- [TypeScript Patterns](docs/codebase-overview.md#typescript-patterns)
- [SLDS Alignment](docs/codebase-overview.md#slds-alignment) — only SLDS-approved components and markup
- [Accessibility](docs/codebase-overview.md#accessibility) — focus management, keyboard navigation, ARIA
- [Testing](docs/codebase-overview.md#testing)
- [Breaking-Change Taxonomy](docs/codebase-overview.md#breaking-change-taxonomy)
