/*
 * STORY-BASED ACCESSIBILITY TESTING
 *
 * This uses StoryShots to iterate over stories created in Storybook to
 * automatically create aXe tests.
 *
 * For more information, please visit:
 * https://github.com/storybooks/storybook/tree/master/addons/storyshots
 */
import initStoryshots from '@storybook/addon-storyshots';
import express from 'express';
import path from 'path';

import { axeStoryshots } from './axe-storyshots';
import axeConfig from './axe-config';

// Add tests to this file to exclude them from testing
import excludeFromTests from './exclude-story-config';
import { getExcludeKindRegex, skipStoryShotTest } from './storyshots-helpers';

// Express server setup. `npm run storyshots:build` must be run first.
const rootPath = path.resolve(__dirname, '../');
const app = express();
const port = process.env.PORT || 8002;

// Register static asset folders
app.use(
	'/assets',
	express.static(
		`${rootPath}/node_modules/@salesforce-ux/design-system/assets/`
	)
);
app.use('/assets', express.static(path.join(__dirname, `${rootPath}/assets/`)));

app.use(express.static(`${rootPath}/storybook`));

let server;

console.log(`
★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★
QUEUEING: STORY-BASED Accessibility SNAPSHOT TESTING
★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★

EXECUTING /tests/story-based-accessibility-tests.js

This script uses Jest to call aXe https://github.com/dequelabs/axe-core on each Storybook story found at http://localhost:9001. This is static testing of the DOM on load. If you need an open menu tested, then you will need to open the menu with the \`isOpen\` prop.

For more information, please review: https://github.com/salesforce/design-system-react/blob/master/tests/README.md
`);

describe('aXe storyshots', function axeSnapshotFunction() {
	beforeAll(() => {
		// Start Express server
		server = app.listen(port, () => {
			console.log('Storybook server listening on port ', server.address().port);
		});
	});

	afterAll(() => {
		// Stop Express server
		server.close(() => {
			console.log('Shutting down the server running Storybook');
		});
	});

	// Use custom storybook config that uses a subset of stories until
	// all components have been audited for compatibility with Jest
	// snapshot tests.
	initStoryshots({
		configPath: '.storybook',
		storyNameRegex: new RegExp(`^((?!.*?(${skipStoryShotTest})).)*$`, 'g'),
		storyKindRegex: getExcludeKindRegex({
			arrayOfStoryKind: excludeFromTests.accessibility.storyKind,
		}),
		test: axeStoryshots({
			storybookUrl: `http://localhost:${port}`,
			axeConfig,
			puppeteerLaunchOptions: {
				// use the following for debugging
				// headless: false,
				// slowMo: 200,
				// devtools: true,
			},
		}),
	});
});
