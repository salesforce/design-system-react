/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

console.log('Publishing to git');

import './helpers/setup';
import async from 'async';
import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import { version } from '../package.json';

const argv = minimist(process.argv.slice(2));
const distPath = path.resolve.bind(path, __PATHS__.npm);
const npmDir = distPath();
const gitDir = '.git';

const exec = ([command, dir = '.', silent], callback) => {
	require('child_process').exec(command, {
		cwd: path.resolve(__PATHS__.root, dir),
		stdio: [0, 1, 2],
		silent
	}, callback);
};

///////////////////////////////////////////////////////////////
// Tasks
///////////////////////////////////////////////////////////////

const createTempDir = (done, type) => {
	const tmpDir = `.tmp-npm-${type}`;

	async.eachSeries([
		[`rm -rf ${tmpDir}`],
		[`cp -r ${npmDir} ${tmpDir}`],
		['rm -r es', tmpDir],
		['rm -r commonjs', tmpDir],
		[`cp -r ${npmDir}/${type}/* ${tmpDir}`]
	], exec, (err) => {
		if (err) throw err;
		done();
	});
};

const cleanPackageJson = (done, type) => {
	const tmpPath = path.resolve.bind(path, path.resolve(__PATHS__.root, `.tmp-npm-${type}`));

	const packageJSON = JSON.parse(fs.readFileSync(tmpPath('package.json')).toString());

	if (type === 'es') {
		packageJSON['jsnext:main'] = packageJSON.main;
	} else {
		packageJSON.dependencies['slds-for-js-core'] = packageJSON.dependencies['slds-for-js-core'].replace('-es', `-${type}`);
	}

	fs.writeFile(
		tmpPath('package.json'),
		JSON.stringify(packageJSON, null, 2),
		done
	);
};

const publish = (done, type) => {
	const tmpDir = `.tmp-npm-${type}`;

	let actions = [
		['git init', tmpDir],
		[`cp ${gitDir}/config ${tmpDir}/.git`],
		['git add -A', tmpDir]
	];

	if (argv.tag) {
		actions = [
			...actions,
			[`git commit -m "Release commit for ${argv.tag}"`, tmpDir],
			[`git tag ${argv.tag}-${type}`, tmpDir, true],
			[`git push origin -f --tags ${argv.tag}-${type}`, tmpDir]
		];
	} else {
		actions = [
			...actions,
			[`git commit -m "Release ${version}-${type}"`, tmpDir],
			[`git tag v${version}-${type}`, tmpDir],
			[`git push origin --tags v${version}-${type}`, tmpDir]
		];
	}

	actions = [
		...actions,
		[`rm -r ${tmpDir}`]
	];

	async.eachSeries(actions, exec, (err) => {
		if (err) throw err;
		done();
	});

	console.log(`Successfully published ${type} to git`);
};

async.series([
	(done) => createTempDir(done, 'es'),
	(done) => cleanPackageJson(done, 'es'),
	(done) => publish(done, 'es'),

	(done) => createTempDir(done, 'commonjs'),
	(done) => cleanPackageJson(done, 'commonjs'),
	(done) => publish(done, 'commonjs')
], err => {
	if (err) throw err;
});
