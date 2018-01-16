/* eslint-env jest */
import { testDOMandHTML, testImageSnapshot } from '../../../tests/snapshot-helpers';

import Basic from '../__examples__/basic';
import Advanced from '../__examples__/advanced';

import { DATA_TABLE } from '../../../utilities/constants';

describe(DATA_TABLE, () => {
	test('DOM & HTML Snapshots', () => {
		testDOMandHTML(Basic);
		testDOMandHTML(Advanced);
	});

	test('Basic Image Snapshot', async () => {
		await testImageSnapshot(DATA_TABLE, 'Basic');
	});

	test('Advanced Image Snapshot', async () => {
		await testImageSnapshot(DATA_TABLE, 'Advanced');
	});
});
