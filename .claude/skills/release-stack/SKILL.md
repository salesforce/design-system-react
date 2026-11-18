---
name: release-stack
description: Find the library version a PR or stack targets (its milestone), and plan, check and ship release stacks for design-system-react, a GitHub stack of PRs aimed at one library version (a milestone named for the version, with the release PR on top). Use before changing a PR or branch, to learn which version it ships in (and so which CHANGELOG section it belongs to), and when a maintainer wants to target PRs at a version such as 11.0.0-rc.0, asks "what's left for <version>", "is <version> ready", "add #NNNN to the <version> stack", "move #NNNN to <version>", or "release <version> once the stack merges".
---

# Release stacks

A release stack is a chain of PRs that ships as one library version. Each stack targets exactly one version:

- **Milestone.** Every PR in the stack has a GitHub milestone named for the version, e.g. `11.0.0-rc.0`. The milestone is the source of truth for what ships: the version is ready when the milestone has no open PRs except the release PR.
- **Stack.** The PRs are linked with `gh stack link`, bottom (closest to `master`) to top, so each one's base is the PR below it.
- **Release PR on top.** The top of the stack is the `chore(release): update version to <version>` PR from `npm run release-pr -- <version> --onto <top branch>`. It is in the milestone too. Merging the whole stack merges the version bump with the changes it releases.

The maintainer releases (creates the GitHub Release) once the stack has merged.

```
master
└ #A  bottom PR             milestone 11.0.0-rc.0
  └ #B                      milestone 11.0.0-rc.0
    └ #C  top change PR     milestone 11.0.0-rc.0
      └ #R  chore(release): update version to 11.0.0-rc.0
```

## Rules

- **Confirm before anything outward-facing.** That means creating or editing milestones, PR bases, PR bodies, stacks, pushes, merges and releases. Show the planned commands first; reading state needs no confirmation.
- **One version per PR.** A PR is in at most one release milestone. Moving it means changing its milestone and restacking.
- **Lower versions merge first.** If two release stacks are open (e.g. `11.0.0-rc.0` and `11.0.0`), the higher one is based on the lower one's release PR, not on `master`.
- **Don't rebase or push branches checked out in another worktree** without the maintainer's OK. Check with `git worktree list` first.
- Push with `--force-with-lease=<branch>:<old sha>`, never a bare `--force`.
- GitHub won't change the base of a PR that is in a stack. To restructure a stack, run `gh stack unstack <stack number>`, then `gh pr edit --base`, then `gh stack link` again.
- Follow [AGENTS.md](../../../AGENTS.md) for commits and PRs (conventional commits, `npm run test:ci` before review).

## Version names

Use the version that `scripts/release.ts` will produce:

- `next` gives the next prerelease (`11.0.0-alpha.11` → `11.0.0-alpha.12`).
- `next --rc` starts or continues the release candidate (`11.0.0-alpha.N` → `11.0.0-rc.0`, `11.0.0-rc.N` → `11.0.0-rc.N+1`).
- An explicit version promotes to stable (`11.0.0`).

Use `npm run release-pr -- <args> --dry-run` to print it. The milestone title is the bare version, with no `v` prefix.

## Which version does this target?

When a maintainer works on a PR or branch, look up its milestone before changing anything. The milestone says which version the work ships in, and so which CHANGELOG section an entry goes in and which stack the PR belongs to.

```sh
gh pr view <n | branch> --json milestone,baseRefName --jq '{version: .milestone.title, base: .baseRefName}'
```

- **There's a milestone:** that's the target version. A PR stacked on it belongs to the same version unless it has its own milestone.
- **There's no milestone:** follow `baseRefName` down the stack until a PR with a milestone turns up. If none does, the PR isn't in a release stack. Ask the maintainer which version it targets; don't guess.
- **Milestone and stack disagree** (for example, a PR milestoned `11.0.0` sits under one milestoned `11.0.0-rc.0`): report it. A higher version can't merge below a lower one.

To list the open release stacks, list the milestones whose titles are versions:

```sh
gh api 'repos/salesforce/design-system-react/milestones?state=open' --jq '.[] | select(.title|test("^[0-9]+\\.[0-9]+\\.[0-9]+")) | "\(.title)  open=\(.open_issues) closed=\(.closed_issues)"'
```

## Plan a stack for a version

1. **Milestone.** Find it, or create it:

   ```sh
   gh api repos/salesforce/design-system-react/milestones --jq '.[] | select(.title=="<version>") | .number'
   gh api repos/salesforce/design-system-react/milestones -f title='<version>' -f description='Release stack for <version>. Ships when every PR in this milestone has merged.'
   ```

2. **Order the PRs** bottom to top. Each PR's branch must contain the one below it (`git merge-base --is-ancestor <lower> <upper>`). If it doesn't, rebase it onto the lower branch first (`git rebase --onto <lower> <old base> <branch>`) and run `npm run test:ci` on the new tip.
3. **Set the milestone** on each PR: `gh pr edit <n> --milestone '<version>'`.
4. **Link the stack:** `gh stack link --remote origin --base master <n1> <n2> …`. Use the lower stack's release branch as `--base` when stacking on another version. Record the stack number it prints.
5. **Note the target in each PR body** with one line near the top: `Release stack for \`<version>\` (stack #<s>, milestone <version>). Base: #<lower PR>.`
6. **Add the release PR** once the change PRs are in place:

   ```sh
   npm run release-pr -- <version | next [--rc]> --onto <top branch> --dry-run   # check the version
   npm run release-pr -- <version | next [--rc]> --onto <top branch>
   gh pr edit <release PR> --milestone '<version>'
   gh stack link <stack number> <release PR>
   ```

## Check readiness

```sh
gh pr list --state all --search 'milestone:"<version>"' --json number,title,state,isDraft,baseRefName,reviewDecision,mergeStateStatus
```

Report a table in stack order (follow `baseRefName` from `master` up) with these columns: PR, title, state, draft, review, checks and blocker. The blocker is one of:

- `REVIEW_REQUIRED`: needs one approval; the author can't self-approve.
- `BLOCKED`: checks or review are missing.
- `DIRTY`: needs a rebase.
- draft: the PR isn't ready for review.

For failing checks, `gh pr checks <n>` names the job. The version is **ready** when every PR but the release PR has merged and the release PR is green and approved. If the release PR is missing, say so.

## Add, remove or move a PR

- **Add:** rebase the PR onto the current top change PR, then set its milestone. Unstack, retarget the release PR onto the new PR, and relink the stack in its new order.
- **Remove:** clear the milestone (`gh pr edit <n> --remove-milestone`). Unstack, retarget the PR above it onto the PR below it, and relink. Rebase the branches above with `git rebase --onto <below> <removed> <above>`, then `test:ci` and push with a lease.
- **Move to another version:** remove it from this stack, then add it to the other one. When a change moves between versions, update the CHANGELOG: its entry belongs in that version's section.

## Merge and release

1. Confirm readiness, as above.
2. **Merge the stack:** `gh stack merge <stack number>` merges every PR in one atomic operation, so `master` never holds half a version. Branch protection still applies: each PR needs its approval and green checks.
3. **Release** from `master`:

   ```sh
   gh release create v<version> --target master --generate-notes [--prerelease]
   ```

   Use `--prerelease` for alpha, beta and rc. This triggers `.github/workflows/npm-publish.yml`, which publishes under the dist-tag from `publishConfig.tag`.

4. **Close the milestone:**

   ```sh
   gh api -X PATCH repos/salesforce/design-system-react/milestones/<number> -f state=closed
   ```

   If another release stack was based on this one, retarget its bottom PR to `master` and relink it.

For a maintenance line (e.g. `0.10.x`), use `--base 0.10.x` for `release-pr`, `0.10.x` as the stack's `--base`, and `--target 0.10.x` for the release. See AGENTS.md "Releasing".
