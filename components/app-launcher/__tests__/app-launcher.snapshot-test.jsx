/* eslint-env jest */
import { testDOMandHTML, testImageSnapshot } from '../../../tests/snapshot-helpers';

// import Base from '../__examples__/default';

import { APP_LAUNCHER } from '../../../utilities/constants';

describe(APP_LAUNCHER, () => {
	// test('Base DOM & HTML Snapshots look the same', () => {
	// 	testDOMandHTML(Base);
	// });

	test('Base Image Snapshot looks the same', async () => {
		await testImageSnapshot(APP_LAUNCHER, 'Base');
	});
});

