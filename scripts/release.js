/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable no-console, max-len */

/*
## You normally wouldn't need to do this but if you needed to create your own isolated build server, below are the steps:
1. Create a Heroku app.
2. Connect your App GitHub to the Github branch you wish to deploy and turn on automatic deploys for `master` branch.
3. Create environment variable, `IS_BUILD_SERVER` and set to `true`.
4. Create environment variable, `NPM_CONFIG_PRODUCTION` and set to `false`.
5. Create environment variable, `ORIGIN` and set to `[git@github.com:[your username]/design-system-react.git]`
6. Create environment variable, `GIT_SSH_KEY` and set to a user's private key (base64 encoded) that has access to your repository. `openssl base64 < [PRIVATE_KEY_FILENAME] | tr -d '\n' | pbcopy`
*/

import async from 'async';
import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import prompt from 'prompt';
import exec from './command-line-utilities';

const argv = minimist(process.argv.slice(2));
const rootPath = path.resolve(__dirname, '../');
const remote = argv.remote || 'upstream';
const isBuildServer = argv.buildserver || false;

let currentVersionReleaseNotes = '';

const tasks = ({ release, done }) => {
	const commands = [
		{
			message: `# Check if ${remote} remote exists`,
			command: `git ls-remote ${remote} --exit-code --quiet`,
		},
		{
			ignoreCommand: isBuildServer,
			message:
				'# Checking out master branch. Please ignore "RELEASENOTES.md - Your branch and \'upstream/master\' have diverged."',
			command: 'git checkout master',
		},
		{
			ignoreCommand: isBuildServer,
			message: '# Pruning NPM dependencies',
			command: 'npm prune',
		},
		{
			ignoreCommand: isBuildServer,
			message: '# Running NPM install',
			command: 'npm install',
			verbose: false,
		},
		{
			message: '# Build icons from latest icon module',
			command: 'npm run icons',
		},
		{
			ignoreCommand: isBuildServer,
			message: '# Running test suite',
			command: 'npm test',
			verbose: false,
		},
		{
			ignoreCommand: isBuildServer,
			message:
				'# Update release notes, inline icons (if needed), and site component documentation',
			command: 'git add RELEASENOTES.md',
		},
		{ command: 'git add icons/*' },
		{ command: 'npm run build-docs' },
		{ command: 'git add components/component-docs.json' },
		{
			ignoreCommand: !isBuildServer,
			command: `rm -f ${release}.md`,
		},
		{
			// always commit because ${release}.md just got deleted if it is a release commit
			ignoreCommand: !isBuildServer,
			command:
				'git commit -a -m "Clean up for release" -m "Build Server commit: Update release notes, commit inline icons (if needed), site component documentation (if needed). Remove patch.md or minor.md"',
		},
		{
			// test if any files have changed, if they have then commit them
			ignoreCommand: isBuildServer,
			command:
				'git diff-index --quiet HEAD || git commit -m "Update release notes, inline icons (if needed), and site component documentation"',
		},
		{
			ignoreCommand: isBuildServer,
			command: 'git pull upstream master',
		},
		{
			ignoreCommand: isBuildServer,
			command: 'git diff --exit-code',
		},
		{
			message:
				'# Bumping version in package.json, committing RELEASENOTES.md, and checking that there are no files in local working copy. Published package is based on current state of local files, not versioned files.',
			command: `npm --no-git-tag-version version ${release}`,
		},
		{
			message: `# Building and publishing tag to ${remote} remote`,
			command: `./node_modules/.bin/babel-node scripts/publish-to-git.js --remote=${remote}`,
			verbose: false,
		},
		{
			message: `# Pushing local master branch to ${remote} remote`,
			command: `git push ${remote} master --no-verify`,
		},
		{
			message: '# Set up NPM configuration',
			command: 'cp scripts/.npmrc .npmrc',
		},
		{
			message: '# Publish to NPM',
			command: 'npm publish .tmp-npm --access public',
		},
		{
			message: '# Remove NPM configuration',
			command: 'rm .npmrc',
		},
	]
		.filter((item) => !item.ignoreCommand)
		.map((item) => ({ ...item, rootPath }));

	async.eachSeries(commands, exec, (err) => {
		if (err) throw err;

		if (!isBuildServer) {
			console.log(
				`The final step is to \`npm run release\` in the https://github.com/salesforce-ux/design-system-react-site repositoary and enter the version of ${release}. You will then need to promote the pushed branch on Heroku from staging to production.`
			);
			console.log(
				'\n\n# Please add the following to your release notes at https://github.com/salesforce-ux/design-system-react/releases'
			);
			console.log(currentVersionReleaseNotes);
		}
		done();
	});
};

const executeTasks = ({ release }) => {
	console.log(`# Releasing a ${release} tag`);

	async.series([(done) => tasks({ release, done })], (err) => {
		if (err) throw err;
	});
};

const releaseNotesSchema = {
	properties: {
		releasenotes: {
			default: 'y',
			message:
				"Have you written release notes (y/n)? 'n' will open RELEASENOTES.MD.",
		},
	},
};

// START HERE
if (isBuildServer) {
	// determine semvar release type
	fs.open('patch.md', 'r', (err, fileDescriptor) => {
		if (!err) {
			executeTasks({ release: 'patch', fileDescriptor });
		}
	});

	fs.open('minor.md', 'r', (err, fileDescriptor) => {
		if (!err) {
			executeTasks({ release: 'minor', fileDescriptor });
		}
	});
} else {
	// Use interactive prompt if user is running this script manually
	prompt.start();
	prompt.get(releaseNotesSchema, (err, releaseNotesResult) => {
		if (releaseNotesResult.releasenotes.toUpperCase() === 'N') {
			exec(
				{
					command: 'open RELEASENOTES.MD',
					rootPath,
				},
				() => {}
			);
			console.log(
				'# Please do not commit changes to RELEASENOTES.MD. Unversioned changes must be present in RELEASENOTES.MD or release will fail. Changes will be versioned for you. Please run script again.'
			);
			process.exit();
		} else {
			fs.readFile(
				path.resolve(rootPath, 'RELEASENOTES.MD'),
				'utf8',
				(err2, contents) => {
					const regEx = /### Latest Release\n*(##.[^]+?)##/g;
					currentVersionReleaseNotes = regEx.exec(contents)[1];
					executeTasks({ release: argv.release });
				}
			);
		}
	});
}
