/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable no-console, global-require */

import path from 'path';

const exec = ([command, dir = '.', rootPath], callback) => {
	const child = require('child_process').exec(command, {
		cwd: path.resolve(rootPath, dir)
	}, (err) => {
		callback(err);
	});

	child.stdout.on('data', (data) => process.stdout.write(data.toString()));
};

export { exec as default };
