/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import async from 'async';

// /////////////////////////////////////////////////////////////
// Helpers
// /////////////////////////////////////////////////////////////

const distPath = path.resolve.bind(path, path.resolve(__dirname, '../', '.tmp'));

// /////////////////////////////////////////////////////////////
// Tasks
// /////////////////////////////////////////////////////////////

async.series([
	/**
	 * Clean up the package.json
	 */
	(done) => {
		console.log('### Cleaning up the package.json');

		const packageJSON = JSON.parse(fs.readFileSync(distPath('package.json')).toString());
		delete packageJSON.scripts;
		delete packageJSON.devDependencies;
		delete packageJSON['pre-push'];
		fs.writeFile(
			distPath('package.json'),
			JSON.stringify(packageJSON, null, 2),
			done
		);
	}
], (err) => {
	if (err) throw err;
});
