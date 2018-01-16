/* eslint-env jest */
import { testDOMandHTML, testImageSnapshot } from '../../../tests/snapshot-helpers';

import Base from '../__examples__/related-list-with-table';

import { CARD } from '../../../utilities/constants';

describe(CARD, () => {
	test('Base DOM & HTML Snapshots look the same', () => {
		testDOMandHTML(Base);
	});

	test('Base Image Snapshot looks the same', async () => {
		await testImageSnapshot(CARD, 'Base');
	});
});

