// Enforce Conventional Commits on the commit-msg hook (see .husky/commit-msg).
// Matches the prefixes used across this repo's history and the PR template:
// fix, feat, chore, docs, test, build, ci, refactor, perf, style, revert.
// Append `!` and a `BREAKING CHANGE:` footer for public-API changes.
export default {
	extends: ['@commitlint/config-conventional'],
};
