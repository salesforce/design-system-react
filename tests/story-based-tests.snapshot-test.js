/*
 * STORY-BASED SNAPSHOT TESTING
 *
 * This uses StoryShots to iterate over stories created in Storybook to
 * automatically create DOM and image snapshot tests.
 *
 * For more information, please visit:
 * https://github.com/storybooks/storybook/tree/master/addons/storyshots
 */

import express from 'express';
import initStoryshots, { imageSnapshot } from '@storybook/addon-storyshots';
import path from 'path';

// Express server setup. `npm run storyshots:build` must
// be run first.
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

// Create DOM snapshot tests from Storybook stories
initStoryshots({
	configPath: '.storybook-based-tests',
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

describe('Image Snapshots', function imageSnapshotFunction () {
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
		suite: 'Image storyshots',
		test: imageSnapshot({
			storybookUrl: `http://localhost:${port}`,
			getMatchOptions,
		}),
	});
});
