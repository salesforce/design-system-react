/* eslint-env jest */
import {
	testDOMandHTML,
	testImageSnapshot
} from '../../../tests/snapshot-helpers';

import SnapshotBase from '../__examples__/base';
import SnapshotBaseOpen from '../__examples__/snapshot/base-open';

import { ACCORDION } from '../../../utilities/constants';

describe(ACCORDION, () => {
	test('Base DOM & HTML Snapshots look the same', () => {
		testDOMandHTML(SnapshotBase);
		testDOMandHTML(SnapshotBaseOpen);
	});

	test('Base Image Snapshot looks the same', async () => {
		await testImageSnapshot(ACCORDION, 'Base');
	});

	test('Base Open Image Snapshot looks the same', async () => {
		await testImageSnapshot(ACCORDION, 'Base Open');
	});
});
