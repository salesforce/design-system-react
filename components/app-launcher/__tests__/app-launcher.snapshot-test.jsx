/* eslint-env jest */
import { testDOMandHTML, testImageSnapshot } from '../../../tests/snapshot-helpers';

// import Base from '../__examples__/default';

import { APP_LAUNCHER } from '../../../utilities/constants';

describe(APP_LAUNCHER, () => {
	// test('Base DOM & HTML Snapshots look the same', () => {
	// 	testDOMandHTML(Base);
	// });

	test('App Launcher (open) Image Snapshot looks the same', async () => {
		await testImageSnapshot(APP_LAUNCHER, 'App Launcher (open)');
	});

	test('App Launcher Image Snapshot looks the same', async () => {
		await testImageSnapshot(APP_LAUNCHER, 'App Launcher');
	});

	test('App Launcher no header button Image Snapshot looks the same', async () => {
		await testImageSnapshot(APP_LAUNCHER, 'App Launcher no header button');
	});

	test('App Launcher no search Image Snapshot looks the same', async () => {
		await testImageSnapshot(APP_LAUNCHER, 'App Launcher no search');
	});

	test('App Launcher with several sections (no toggle) looks the same', async () => {
		await testImageSnapshot(APP_LAUNCHER, 'App Launcher with several sections (no toggle)');
	});

	test('Tile looks the same', async () => {
		await testImageSnapshot(APP_LAUNCHER, 'Tile looks the same');
	});

	test('Small Tile looks the same', async () => {
		await testImageSnapshot(APP_LAUNCHER, 'Small Tile');
	});

	test('Tile with Icon node looks the same', async () => {
		await testImageSnapshot(APP_LAUNCHER, 'Tile with Icon node');
	});

	test('Tile with icon text looks the same', async () => {
		await testImageSnapshot(APP_LAUNCHER, 'Tile with icon text');
	});

	test('Tile with search text looks the same', async () => {
		await testImageSnapshot(APP_LAUNCHER, 'Tile with search text');
	});

	test('Tile with truncated text looks the same', async () => {
		await testImageSnapshot(APP_LAUNCHER, 'Tile with truncated text');
	});

	test('Tile with description heading looks the same', async () => {
		await testImageSnapshot(APP_LAUNCHER, 'Tile with description heading');
	});

	test('Section looks the same', async () => {
		await testImageSnapshot(APP_LAUNCHER, 'Section');
	});

	test('Section with small tiles looks the same', async () => {
		await testImageSnapshot(APP_LAUNCHER, 'Section with small tiles');
	});
});

