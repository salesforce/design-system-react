# Optional Local TinyNod Review (Salesforce Employees)

TinyNod is an optional, local-only AI review of your committed changes. When you opt in, the husky `pre-push` hook runs it after the story snapshot check. It is for Salesforce employees only (it needs internal AI gateway access). It is **advisory**: findings print and never change the push's exit code. It is **off by default**, and CI never runs it.

Contents: [Quick start](#quick-start) · [Set up TinyNod](#set-up-tinynod) · [Opt in and out](#opt-in-and-out) · [Read the results](#read-the-results) · [Have an AI fix the findings](#have-an-ai-fix-the-findings) · [Troubleshooting](#troubleshooting) · [Data policy](#data-policy)

## Quick start

```bash
# 1. Install TinyNod (see "Install" below), then confirm: tinynod --version  (2.5.0 or newer)
# 2. Store a gateway key and a full model id (see "Configure credentials")
# 3. Opt in for this clone and all its worktrees
git config --local dsr.tinynod.enabled true
# 4. Push as usual
git push
```

At the end of pre-push you will see one line, for example `pre-push: tinynod review (advisory) clean: no findings`.

## Set up TinyNod

TinyNod is the standalone CLI flavor of CodeNod. The CodeNod homepage, with current install instructions and releases, is <https://git.soma.salesforce.com/cc-oms/pr-reviewer> (see its "tinynod (standalone CLI)" section).

### Install

Pick one (all documented on the CodeNod homepage):

- **macOS `.pkg`**: download `Tinynod-<version>-arm64.pkg` (Apple Silicon) or `-x64.pkg` (Intel) from the [latest release](https://git.soma.salesforce.com/cc-oms/pr-reviewer/releases). It installs `/usr/local/bin/tinynod`.
- **npm**: `npm install -g @cc-oms/tinynod`
- **curl installer (macOS/Linux)**: `bash <(curl -sSL https://pages.git.soma.salesforce.com/cc-oms/pr-reviewer/install-tinynod.sh)` installs `~/.local/bin/tinynod`; make sure that directory is on your `PATH`.

Check it: `command -v tinynod && tinynod --version`. The minimum supported version is **2.5.0**; older versions are skipped. Do not run `tinynod hooks install` or change `core.hooksPath`: husky owns this repo's hooks.

### Configure credentials

TinyNod needs a gateway **API key** and a **full model id** in `~/.tinynod/config.json`. Never paste a secret into chat or commit it.

If the CodeNod desktop app is running, import its settings first with `tinynod config import --from-app`. The import has **no API key**, so still do one of the paths below afterwards.

**With DevBar / AI Suite**: your Claude settings use an `apiKeyHelper`, which TinyNod does not run, so mint a key and store it:

```bash
tinynod config set ai.apiKey "$('/Applications/devbar.app/Contents/MacOS/devbar' auth claude)"
tinynod config set ai.model claude-opus-5-5
tinynod config show        # redacted; confirm a key is present and the model is a full id
```

The minted token can be short-lived. If reviews start reporting auth errors, run the first command again.

**Without DevBar / AI Suite**: run `tinynod config init` (the key prompt is clear text), or `tinynod config set ai.apiKey <key>` and `tinynod config set ai.model <full-model-id>`. Get a key and the allowed model ids from your team's AI gateway onboarding; `tinynod models` lists what the gateway offers.

### Verify before you push

```bash
git fetch origin
tinynod review --base origin/master      # add --format json for JSON
```

A review covers the **committed** HEAD against its merge-base with the base. Uncommitted and untracked changes are never included.

## Opt in and out

| Goal                                 | Command                                                           |
| :----------------------------------- | :---------------------------------------------------------------- |
| Opt in, this clone and its worktrees | `git config --local dsr.tinynod.enabled true`                     |
| Opt in, every clone of this repo     | `git config --global dsr.tinynod.enabled true`                    |
| Opt out                              | `git config --local dsr.tinynod.enabled false` (or `--unset`)     |
| One push on / off                    | `DSR_TINYNOD_REVIEW=1 git push` / `DSR_TINYNOD_REVIEW=0 git push` |
| Skip TinyNod for one push            | `TINYNOD_SKIP_HOOK=1 git push`                                    |

- Precedence: `TINYNOD_SKIP_HOOK` > `DSR_TINYNOD_REVIEW` > git config.
- `TINYNOD_SKIP_HOOK` skips TinyNod only; the snapshot check still runs.
- When not opted in, the hook prints nothing and does not call `tinynod`.
- When opted in, the review is skipped with a logged reason when `tinynod` is missing or older than 2.5.0, for pushes to `master` or tags, branch deletions, pushes of more than one commit, pushes of a commit other than the checked-out `HEAD`, and docs-only (`.md`) pushes.

The review base is the remote branch's previous tip when it is an ancestor of the pushed commit (so only new commits are reviewed). Otherwise (a new branch or a force-push) it is the merge-base with `origin/master`, so run `git fetch origin` now and then.

## Read the results

The review has a 300 s budget. The push goes ahead whatever the result.

| Status       | Meaning                                                                                                | What to do                                                 |
| :----------- | :----------------------------------------------------------------------------------------------------- | :--------------------------------------------------------- |
| `clean`      | Review ran, no findings.                                                                               | Nothing.                                                   |
| `findings`   | The first 10 findings print with severity, file and line.                                              | Fix them or decide they are acceptable.                    |
| `partial`    | Only part of the diff was reviewed (too large).                                                        | Treat as incomplete; review the rest manually.             |
| `no_changes` | Nothing to review against the base.                                                                    | Nothing.                                                   |
| `warning`    | The review did **not** produce a result (timeout, error, non-JSON output). It is never a clean review. | Read the message, see [Troubleshooting](#troubleshooting). |

For anything other than `clean` and `no_changes`, the hook prints the command to re-run the review by hand. Reviews are saved under `~/.tinynod/history/`.

## Have an AI fix the findings

Example prompt for Claude Code or a similar agent, in the checkout you pushed from:

```text
Run `git fetch origin && tinynod review --base origin/master --format json` and read the result.
Summarize the findings grouped by severity (file:line, one line each, say whether you think
each is a real bug or a false positive and why). Then fix the real ones with minimal changes,
add or update tests, run `npm run typecheck` and the relevant tests, and show me the diff.
Do not commit or push. Do not use TINYNOD_SKIP_HOOK, and do not edit the TinyNod config.
List anything you judged a false positive so I can decide.
```

TinyNod only reviews **committed** changes, so commit (or amend) before re-running it. Agents follow the rules in [AGENTS.md](../AGENTS.md#optional-tinynod-review).

## Troubleshooting

| Symptom                                                     | Cause and fix                                                                                                                                                                                                 |
| :---------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `no AI API key configured`                                  | No `ai.apiKey` in the config TinyNod reads (`$TINYNOD_HOME/config.json` if set, otherwise `~/.tinynod/config.json`). Set one as above.                                                                        |
| `Access denied. You may need additional permissions or VPN` | Usually an alias model such as `opus`, which the gateway rejects: `tinynod config set ai.model claude-opus-5-5` (or another full id from `tinynod models`). Otherwise check VPN and that your key is current. |
| Auth/401 errors after previously working                    | A minted token expired. Re-run the `config set ai.apiKey` command.                                                                                                                                            |
| `skipped: tinynod not found on PATH`                        | Git hooks use your login environment. For the curl install, add `~/.local/bin` to `PATH` in a shell startup file.                                                                                             |
| `skipped: tinynod 2.5.0+ required`                          | Upgrade TinyNod.                                                                                                                                                                                              |
| `warning: timed out after 300s`                             | Run the printed `tinynod review --base <sha> --format json` by hand.                                                                                                                                          |
| `warning: no JSON result`                                   | TinyNod printed an error instead of a result. Run the printed command by hand and read the output.                                                                                                            |
| No review line at all                                       | You are not opted in or `TINYNOD_SKIP_HOOK` is set. Check `git config --get dsr.tinynod.enabled`.                                                                                                             |

## Data policy

When enabled, pre-push runs `tinynod review`, which sends HTTPS requests to Salesforce's internal model gateway (or the endpoint in `SALESFORCE_CLAUDE_ENDPOINT`). Requests contain the diff of the pushed commit against its base, the changed file paths, the branch and base, and any review instructions from your local TinyNod config, authenticated with your API key. Results are written locally under `~/.tinynod/history/`. CI never runs this review. See the CodeNod homepage for TinyNod's full data handling.
