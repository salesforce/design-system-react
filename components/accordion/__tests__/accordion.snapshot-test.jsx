/* eslint-env jest */
import { testDOMandHTML, testImageSnapshot } from '../../../tests/snapshot-helpers';

import SnapshotBase from '../__examples__/base';
import SnapshotBaseOpen from '../__examples__/snapshot/base-open';

import { ACCORDION } from '../../../utilities/constants';

describe(ACCORDION, () => {
	test('Base DOM & HTML Snapshots', () => {
		testDOMandHTML(SnapshotBase);
		testDOMandHTML(SnapshotBaseOpen);
	});

	test('Base Image Snapshot', async () => {
		await testImageSnapshot(ACCORDION, 'Base');
	});

	test('Base Open Image Snapshot', async () => {
		await testImageSnapshot(ACCORDION, 'Base Open');
	});
});
