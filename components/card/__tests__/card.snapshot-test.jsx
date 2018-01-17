/* eslint-env jest */
import { testDOMandHTML, testImageSnapshot } from '../../../tests/snapshot-helpers';

import Base from '../__examples__/related-list-with-table';

import { CARD } from '../../../utilities/constants';

describe(CARD, () => {
	test('Base DOM & HTML Snapshots look the same', () => {
		testDOMandHTML(Base);
	});

	test('w/ Items Image Snapshot looks the same', async () => {
		await testImageSnapshot(CARD, 'w/ Items');
	});

	test('Empty Image Snapshot looks the same', async () => {
		await testImageSnapshot(CARD, 'Empty');
	});

	test('Custom Header Image Snapshot looks the same', async () => {
		await testImageSnapshot(CARD, 'Custom Header');
	});

	test('Custom Heading Image Snapshot looks the same', async () => {
		await testImageSnapshot(CARD, 'Custom Heading');
	});

	test('Set height card Image Snapshot looks the same', async () => {
		await testImageSnapshot(CARD, 'Set height card');
	});
});

