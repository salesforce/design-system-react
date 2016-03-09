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
import path from 'path';

import { version } from '../package.json';

const exec = ([command, dir = '.'], callback) => {
	require('child_process').exec(command, {
		cwd: path.resolve(__PATHS__.root, dir),
		stdio: [0, 1, 2]
	}, callback);
};

///////////////////////////////////////////////////////////////
// Tasks
///////////////////////////////////////////////////////////////

const publish = (done, type) => {
	const npmDir = '.npm';
	const tmpDir = `.tmp-npm-${type}`;
	const gitDir = `.git`;
	
	async.eachSeries([
		[`cp -r ${npmDir} ${tmpDir}`],
		[`rm -r ${tmpDir}/es`],
		[`rm -r ${tmpDir}/umd`],
		[`cp -r ${npmDir}/${type}/* ${tmpDir}`],
		['git init', `${tmpDir}`],
		[`cp ${gitDir}/config ${tmpDir}/.git`],
		['git add -A', `${tmpDir}`],
		[`git commit -m "Release ${version}-${type}"`, `${tmpDir}`],
		[`git tag v${version}-${type}`, `${tmpDir}`],
		[`git push origin --tags v${version}-${type}`, `${tmpDir}`],
		[`rm -r ${tmpDir}`]
	], exec, (err) => {
		if (err) throw err;
		done();
	});
};

async.series([
	(done) => publish(done, 'es'),
	
	(done) => publish(done, 'umd')
], err => {
	if (err) throw err;
});