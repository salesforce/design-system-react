import express from 'express';
import initStoryshots, { imageSnapshot } from '@storybook/addon-storyshots';
import path from 'path';

const rootPath = path.resolve(__dirname, '../');
const app = express();
const port = process.env.PORT || 9001;

// Register static asset folders
app.use(
	'/assets',
	express.static(
		`${rootPath}/node_modules/@salesforce-ux/design-system/assets/`
	)
);
app.use(express.static(`${rootPath}/storybook-image-snapshots`));

// Comment out until all components are ready to be DOM snapshot tested
//  initStoryshots();

/* jest-image-snapshot
 * Color and position are the same. This is a pixel to pixel comparison.
 * See https://github.com/americanexpress/jest-image-snapshot for options.
 */
const getMatchOptions = ({ context: { kind, story }, url }) => ({
	failureThreshold: 0.2,
	failureThresholdType: 'percent',
	// 0.02 appears to ignore slight gray changes in SLDS
	customDiffConfig: { threshold: 0.02 }
});

let server;

describe('Image Snapshots', function imageSnapshotFunction () {
	beforeAll(() => {
		server = app.listen(port, () => {
			console.log('Storybook server listening on port ', server.address().port);
		});
	});

	afterAll(() => {
		server.close(() => {
			console.log('Shutting down the server running Storybook');
		});
	});

	// use custom set of stories until components have been audited
	initStoryshots({
		configPath: '.storybook-image-snapshots',
		suite: 'Image storyshots',
		test: imageSnapshot({
			storybookUrl: `http://localhost:${port}`,
			getMatchOptions
		})
	});
});
