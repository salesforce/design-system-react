/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable no-console */

import async from 'async';
import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import prompt from 'prompt';
import exec from './command-line-utilities';

const argv = minimist(process.argv.slice(2));
const rootPath = path.resolve(__dirname, '../');

let currentVersionReleaseNotes = '';

console.log(`# Releasing a ${argv.release} tag`);

const executeTasks = () => {
	async.series([
		// Does a remote named upstream exist? Origin should point to fork.
		(done) => {
			console.log('# Checking to see if an upstream remote exists');
			exec(['git ls-remote upstream --exit-code --quiet', rootPath], done);
		},
		// Checkout master branch
		(done) => {
			console.log('# Checking out master branch. Please ignore "RELEASENOTES.md - Your branch and \'upstream/master\' have diverged."');
			exec(['git checkout master', rootPath], done);
		},
		// Remove libraries not in package.json
		(done) => {
			console.log('# Pruning NPM dependencies');
			exec(['npm prune', rootPath], done);
		},
		// npm install
		(done) => {
			console.log('# Running NPM install');
			exec(['npm install', rootPath], done);
		},
		// Update inline icons
		(done) => {
			console.log('# Build icons from latest icon module');
			exec(['npm run icons', rootPath], done);
		},
		// Run tests
		(done) => {
			console.log('# Running test suite');
			exec(['npm test', rootPath], done);
		},
		// Update package.json version
		(done) => {
			console.log('# Bumping version in package.json, committing RELEASENOTES.md, and checking that there are no files in local working copy. Published package is based on current state of local files, not versioned files.');
			exec([`npm --no-git-tag-version version ${argv.release}`, rootPath], done, rootPath);
		},
		// Builds three disconnected git trees based on package.json version and publishes as tags on upstream remote
		(done) => {
			console.log('# Building and publishing tag to upstream remote');
			exec(['npm run publish-to-upstream', rootPath], done);
			done();
		},
		// Push to master the package.json and release notes
		(done) => {
			console.log('# Pushing local master branch to upstream remote');
			exec(['git push master upstream', rootPath], done);
			done();
		},
		(done) => {
			console.log('\n\n# Please add the following to your release notes at https://github.com/salesforce-ux/design-system-react/releases');
			console.log(currentVersionReleaseNotes);
			done();
		}
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

prompt.start();

prompt.get(releaseNotesSchema, (err, releaseNotesResult) => {
	if (releaseNotesResult.releasenotes.toUpperCase() === 'N') {
		exec(['open RELEASENOTES.MD', rootPath], () => {});
		console.log('# Please do not commit changes to RELEASENOTES.MD. Unversioned changes must be present in RELEASENOTES.MD or release will fail. Changes will be versioned for you. Please run script again.');
		process.exit();
	} else {
		fs.readFile(path.resolve(rootPath, 'RELEASENOTES.MD'), 'utf8', (err2, contents) => {
			const regEx = /### Latest Release\n*(##.[^]+?)##/g;
			currentVersionReleaseNotes = regEx.exec(contents)[1];
			executeTasks();
		});
	}
});

