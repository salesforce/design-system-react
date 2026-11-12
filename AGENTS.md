# Agent Guide: Design System React

Instructions for AI coding agents (and a quick-start for humans) working in this repo. For conventions and rationale, read [docs/codebase-overview.md](docs/codebase-overview.md) — start at [Creating a New Component](docs/codebase-overview.md#creating-a-new-component) before writing component code. Human contributor setup is in [CONTRIBUTING.md](CONTRIBUTING.md).

## Commands

Setup: Node >= 24 (`.nvmrc`), `npm install`, then `npx playwright install chromium` for the browser test project.

Never run bare `npm test` — it starts Vitest in watch mode and will not exit.

| Command                  | Purpose                                                                        |
| ------------------------ | ------------------------------------------------------------------------------ |
| `npm run typecheck`      | `tsc --noEmit`                                                                 |
| `npm run lint`           | ESLint; must be 0 errors (warnings are the tracked migration backlog)          |
| `npm test -- --run`      | All tests: jsdom `unit` project, real-browser `browser` project, and snapshots |
| `npm test -- --run -u`   | Same, and regenerate story HTML snapshots                                      |
| `npm run build`          | Type-check, library build, `.d.ts`, entry shims                                |
| `npm run test:snapshots` | Story HTML snapshot suite only (~3s)                                           |
| `npm run api:check`      | Fail if the committed public API snapshot in `api/` is stale (~2s)             |
| `npm run api:update`     | Regenerate `api/` from the emitted `.d.ts`                                     |
| `npm run api:compat`     | Classify type changes vs. `origin/master` as breaking or additive (advisory)   |
| `npm run test:ci`        | Everything CI runs: typecheck, test, build, lint                               |

Run `npm run test:ci` and `npm run api:check` before requesting review. A husky pre-push hook runs `test:snapshots` and `api:check` and blocks the push if either is stale.

## Things that are easy to miss

- **Stories are test fixtures, not just demos.** Every story in `components/**/__docs__/*.stories.{jsx,tsx}` (except portal-rendered ones, which need component tests instead) is rendered into `components/__tests__/__snapshots__/story-snapshots.test.jsx.snap`. If you add, remove, or change a story, or change a component's rendered markup, run `npm test -- --run -u`, review the snapshot diff, and commit it in the same PR.
- **A filtered test run does not run the snapshot suite.** `npm test -- --run components/combobox` skips `components/__tests__/story-snapshots.test.jsx`. Always finish with an unfiltered run.
- **Local runs write new snapshots silently.** Outside CI, a plain `npm test -- --run` passes and writes snapshots for new stories without failing; CI then fails if they aren't committed. `test:ci` and `test:snapshots` pass `--update=none` to behave like CI. Check `git status` for `.snap` changes before pushing.
- **Stories must use the component's real prop API.** Cross-check against `components/<name>/__examples__` and `types.ts`; stories written against an assumed API are a common source of "component looks broken" reports.
- **jsdom vs. browser tests.** Tests that need a real browser (focus traversal, layout/measurement) go in `*.browser.test.jsx`; everything else is jsdom.
- **New scripts in `scripts/` are TypeScript.** Write `.ts` and run it with `tsx` (as `release.ts` is); `npm run typecheck` covers them via `tsconfig.scripts.json`. The remaining `.mjs`/`.js` scripts predate this rule; convert one when you substantially change it. Tests in `scripts/__tests__/` stay `*.test.mjs`, the pattern the `scripts` Vitest project picks up.
- **Types are the contract.** Runtime PropTypes were removed in the TypeScript migration; the generated `.d.ts` files are what consumers get.
- **The public API is snapshotted in `api/`.** It's the emitted `.d.ts` for every public file under `components/` and `utilities/`, with comments stripped. `private/` files are left out unless a public type references them. If a change touches types, run `npm run api:update`, review the `api/` diff (that's the API change consumers will see), and commit it in the same PR. A removed or renamed export, a narrowed or newly required prop, or reordered callback parameters is breaking: use `!` and a `BREAKING CHANGE:` footer. `api:check` runs in a separate PR-only CI job, not in `test:ci`. That job also runs `scripts/api-compat.ts`, which compares against the base branch and labels each change breaking, possibly breaking or additive. It's advisory: it never fails the job and reports through annotations on the `api/` diff, the job summary and one PR comment. It also warns when a breaking change has no `!` / `BREAKING CHANGE:`. Run it locally with `npm run api:compat` (add `-- --base <ref>` to compare against something other than `origin/master`).
- **Restoring or mirroring existing behavior** (stories lost in a rewrite, parity with another implementation): build the inventory from git (`git show <old-ref>:<path>`, `git log --follow`), not from memory, and list the before/after set in the PR description.

## Git and pull requests

- **Maintainers:** push branches to `salesforce/design-system-react`, not a personal fork. Chromatic runs on push, so fork PRs get no visual review. External contributors fork as described in CONTRIBUTING.md.
- **Conventional commits** are enforced by commitlint (`fix:`, `feat:`, `docs:`, `chore:`, `test:`, `style:`, …). Public API removals or renames are breaking: use `!` and a `BREAKING CHANGE:` footer.
- **Keep lint/format-only changes in their own commit** (`style:`), separate from the `fix:`/`feat:` commit, so the functional diff is reviewable.
- **Rebase on `master` and resolve conflicts before requesting review.**
- Fill in [docs/PULL_REQUEST_TEMPLATE.md](docs/PULL_REQUEST_TEMPLATE.md). For bug fixes, state the root cause, not just the symptom, and add a regression test.

## Releasing

Maintainers: `npm run release-pr -- next` (or an explicit version such as `11.0.0-alpha.4`) bumps `package.json` on `chore/release-<version>` cut from `origin/master`, commits, pushes, and opens the PR (add `--dry-run` to preview). Once it merges, create the GitHub Release with `gh release create v<version> --target master --generate-notes` (add `--prerelease` for alpha/beta/rc), which triggers `.github/workflows/npm-publish.yml` to publish to npm. See `scripts/release.ts` for details.

For a maintenance line, add `--base <branch>`: `npm run release-pr -- next --base 0.10.x` cuts `chore/release-0.10.66` from `origin/0.10.x` (`next` patch-bumps a stable version there) and opens the PR against that branch. After it merges, `gh release create v<version> --target 0.10.x --generate-notes` runs that branch's own publish workflow. A stable maintenance release publishes under npm's `latest` dist-tag, which is right while the current major is in prerelease.

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
