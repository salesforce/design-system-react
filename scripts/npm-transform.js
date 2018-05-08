/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import async from 'async';

// /////////////////////////////////////////////////////////////
// Helpers
// /////////////////////////////////////////////////////////////

const distPath = path.resolve.bind(
	path,
	path.resolve(__dirname, '../', '.tmp-npm')
);

// /////////////////////////////////////////////////////////////
// Tasks
// /////////////////////////////////////////////////////////////

async.series(
	[
		/**
		 * Clean up the package.json
		 */
		(done) => {
			console.log('### Modify package.json for publishing to NPM');

			const packageJSON = JSON.parse(
				fs.readFileSync(distPath('package.json')).toString()
			);

			packageJSON.name = '@salesforce/design-system-react';
			packageJSON.main = 'lib/components/index.js';
			packageJSON.module = 'module/components/index.js';
			packageJSON.sideEffects = false;

			fs.writeFile(
				distPath('package.json'),
				JSON.stringify(packageJSON, null, 2),
				done
			);
		},
	],
	(err) => {
		if (err) throw err;
	}
);
