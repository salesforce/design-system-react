/*
 * STORY-BASED SNAPSHOT TESTING
 *
 * This uses StoryShots to iterate over stories created in Storybook to
 * automatically create DOM and image snapshot tests.
 *
 * For more information, please visit:
 * https://github.com/storybooks/storybook/tree/master/addons/storyshots
 */

// Ran in Jest Node environment

import express from 'express';
import initStoryshots, { imageSnapshot } from '@storybook/addon-storyshots';
import path from 'path';

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
app.use(express.static(`${rootPath}/storybook-based-tests`));

console.log(`
★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★
QUEUEING: STORY-BASED DOM SNAPSHOT TESTING
★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★

EXECUTING /tests/story-based-tests.snapshot-test.js
BASED ON STORYBOOK STORIES FOUND IN /components/story-based-tests.js

This script uses Jest to call Storyshots 
https://github.com/storybooks/storybook/tree/next/addons/storyshots on each 
Storybook story found at http://localhost:9001. This stores a copy of the 
DOM on load in a text file. If you need an open menu tested, then you will 
need to open the menu with the \`isOpen\` prop.

For more information, please review: https://github.com/salesforce/design-system-react/blob/master/tests/README.md
`);

// If a Storybook story should not be tested by Storyshots, please add
// the suffix `NoTest` to the story's name.
const skipStoryshotTest = 'NoTest';

// Create DOM snapshot tests from Storybook stories
initStoryshots({
	configPath: '.storybook-based-tests',
	storyNameRegex: new RegExp(`^((?!.*?(${skipStoryshotTest})).)*$`, 'g'),
	suite: 'DOM snapshots',
});

/* jest-image-snapshot
 * Color and position are the same. This is a pixel to pixel comparison.
 * See https://github.com/americanexpress/jest-image-snapshot for options.
 */
const getMatchOptions = ({ context: { kind, story }, url }) => ({
	failureThreshold: 0.2,
	failureThresholdType: 'percent',
	// 0.02 appears to ignore slight gray changes in SLDS
	customDiffConfig: { threshold: 0.02 },
});

let server;

console.log(`
★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★
QUEUEING: STORY-BASED VISUAL REGRESSION SNAPSHOT TESTING
★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★

EXECUTING /tests/story-based-tests.snapshot-test.js
BASED ON STORYBOOK STORIES FOUND IN /components/story-based-tests.js

This script uses Jest to call Storyshots 
https://github.com/storybooks/storybook/tree/next/addons/storyshots on each 
Storybook story found at http://localhost:9001. This stores a PNG on load and 
compares it to PNGs previously captured. If you need an open menu tested, then 
you will need to open the menu with the \`isOpen\` prop.

PLEASE DO NOT USE \`git add -A\` WHEN COMMITING PNGs. ONLY ADD IMAGES THAT 
ARE RELATED TO YOUR PULL REQUEST. Each PNG adds up and bloats the repository.

For more information, please review: https://github.com/salesforce/design-system-react/blob/master/tests/README.md
`);

describe('Image Snapshots', function imageSnapshotFunction() {
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
		configPath: '.storybook-based-tests',
		storyNameRegex: new RegExp(`^((?!.*?(${skipStoryshotTest})).)*$`, 'g'),
		suite: 'Image storyshots',
		test: imageSnapshot({
			storybookUrl: `http://localhost:${port}`,
			getMatchOptions,
		}),
	});
});
