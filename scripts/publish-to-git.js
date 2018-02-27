/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable no-console, global-require */

import async from 'async';
import fs from 'fs';
import path from 'path';
import findRemoveSync from 'find-remove';
import minimist from 'minimist';
import { version } from '../package.json';
import exec from './command-line-utilities';

console.log('# Publishing to git');

const argv = minimist(process.argv.slice(2));
const rootPath = path.resolve(__dirname, '../');
const getTmpPath = (type) =>
	path.resolve.bind(path, path.resolve(rootPath, `.tmp-${type}`));
const gitDir = '.git';

// /////////////////////////////////////////////////////////////
// Tasks
// /////////////////////////////////////////////////////////////

const cleanPackageJson = (done, type) => {
	const tmpPath = getTmpPath(type);

	const packageJSON = JSON.parse(
		fs.readFileSync(tmpPath('package.json')).toString()
	);

	if (type === 'es') {
		packageJSON['jsnext:main'] = packageJSON.main;
	}

	fs.writeFile(
		tmpPath('package.json'),
		JSON.stringify(packageJSON, null, 2),
		done
	);
};

const publish = (done, type) => {
	const tmpPath = getTmpPath(type);
	const tmpDir = tmpPath();
	const remote = argv.remote || 'origin';

	let typeSuffix = '';
	if (type !== 'commonjs') {
		typeSuffix = `-${type}`;
	}

	const result = findRemoveSync(`${tmpDir}/components`, { dir: '__tests__' });
	console.log('Removed the following test files:');
	console.log(result);

	let actions = [
		{ command: 'git init', dir: tmpDir, rootPath },
		{ command: `cp ${gitDir}/config ${tmpDir}/.git`, rootPath },
		{ command: 'git add -A', dir: tmpDir, rootPath },
	];

	if (argv.tag) {
		actions = [
			...actions,
			{
				command: `git commit -m "Release commit for ${
					argv.tag
				}-${type} [ci skip]"`,
				dir: tmpDir,
				rootPath,
			},
			{ command: `git tag ${argv.tag}${typeSuffix}`, dir: tmpDir, rootPath },
			{
				command: `git push ${remote} -f --tags ${argv.tag}${typeSuffix}`,
				dir: tmpDir,
				rootPath,
			},
		];
	} else {
		actions = [
			...actions,
			{
				command: `git commit -m "Release commit for ${version}-${type} [ci skip]"`,
				dir: tmpDir,
				rootPath,
			},
			{ command: `git tag v${version}${typeSuffix}`, dir: tmpDir, rootPath },
			{
				command: `git push ${remote} --tags v${version}${typeSuffix}`,
				dir: tmpDir,
				rootPath,
			},
		];
	}

	actions = [
		...actions,
		// { command: `rm -r ${tmpDir}`, rootPath }
	];

	async.eachSeries(actions, exec, (err) => {
		if (err) throw err;

		console.log(`## Successfully published ${type} to git`);

		done();
	});
};

async.series(
	[
		(done) =>
			exec(
				{
					command: 'npm run dist',
					rootPath,
				},
				done
			),

		(done) => cleanPackageJson(done, 'es'),
		(done) => publish(done, 'es'),

		(done) => cleanPackageJson(done, 'commonjs'),
		(done) => publish(done, 'commonjs'),

		// Uncomment these lines if you need to build an AMD/Require.js module
		// (done) => cleanPackageJson(done, 'amd'),
		// (done) => publish(done, 'amd'),
	],
	(err) => {
		if (err) throw err;
	}
);
