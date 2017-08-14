/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable no-console, max-len */

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
	const commands = [{
		message: `# Check if ${remote} remote exists`,
		command: `git ls-remote ${remote} --exit-code --quiet`
	},
	{
		ignoreCommand: isBuildServer,
		message: '# Checking out master branch. Please ignore "RELEASENOTES.md - Your branch and \'upstream/master\' have diverged."',
		command: 'git checkout master'
	},
	{
		ignoreCommand: isBuildServer,
		message: '# Pruning NPM dependencies',
		command: 'npm prune'
	},
	{
		ignoreCommand: isBuildServer,
		message: '# Running NPM install',
		command: 'npm install',
		verbose: false
	},
	{
		message: '# Build icons from latest icon module',
		command: 'npm run icons'
	},
	{
		ignoreCommand: isBuildServer,
		message: '# Running test suite',
		command: 'npm test',
		verbose: false
	},
	{
		ignoreCommand: isBuildServer,
		message: '# Update release notes, inline icons (if needed), and site component documentation',
		command: 'git add RELEASENOTES.md'
	},
	{ command: 'git add icons/*' },
	{ command: 'npm run build-docs' },
	{ command: 'git add examples/component-docs.json' },
	{ command: `rm -f ${release}.md && git add ${release}.md` },
	{
		// test if any files have changed, if they have then commit them
		command: 'git diff --quiet && git diff --staged --quiet || git commit -m "Update release notes, inline icons (if needed), and site component documentation"'
	},
	{
		ignoreCommand: isBuildServer,
		command: 'git pull upstream master'
	},
	{
		ignoreCommand: isBuildServer,
		command: 'git diff --exit-code'
	},
	{
		message: '# Bumping version in package.json, committing RELEASENOTES.md, and checking that there are no files in local working copy. Published package is based on current state of local files, not versioned files.',
		command: `npm --no-git-tag-version version ${release}`
	},
	{
		message: `# Building and publishing tag to ${remote} remote`,
		command: `./node_modules/.bin/babel-node scripts/publish-to-git.js --remote=${remote}`,
		verbose: false
	},
	{
		message: `# Pushing local master branch to ${remote} remote`,
		command: `git push ${remote} master --no-verify`
	}].filter((item) => (!item.ignoreCommand))
		.map((item) => ({ ...item, rootPath }));

	async.eachSeries(commands, exec, (err) => {
		if (err) throw err;

		if (!isBuildServer) {
			console.log(`The final step is to \`npm run release\` in the https://github.com/salesforce-ux/design-system-react-site repositoary and enter the version of ${release}. You will then need to promote the pushed branch on Heroku from staging to production.`);
			console.log('\n\n# Please add the following to your release notes at https://github.com/salesforce-ux/design-system-react/releases');
			console.log(currentVersionReleaseNotes);
		}
		done();
	});
};

const executeTasks = ({ release }) => {
	console.log(`# Releasing a ${release} tag`);

	async.series([
		(done) => tasks({ release, done })
	], (err) => {
		if (err) throw err;
	});
};

const releaseNotesSchema = {
	properties: {
		releasenotes: {
			default: 'y',
			message: 'Have you written release notes (y/n)? \'n\' will open RELEASENOTES.MD.'
		}
	}
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
			exec({
				command: 'open RELEASENOTES.MD',
				rootPath
			}, () => {});
			console.log('# Please do not commit changes to RELEASENOTES.MD. Unversioned changes must be present in RELEASENOTES.MD or release will fail. Changes will be versioned for you. Please run script again.');
			process.exit();
		} else {
			fs.readFile(path.resolve(rootPath, 'RELEASENOTES.MD'), 'utf8', (err2, contents) => {
				const regEx = /### Latest Release\n*(##.[^]+?)##/g;
				currentVersionReleaseNotes = regEx.exec(contents)[1];
				executeTasks({ release: argv.release });
			});
		}
	});
}
