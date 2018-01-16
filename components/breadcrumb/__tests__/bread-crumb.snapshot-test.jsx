/* eslint-env jest */
import { testDOMandHTML, testImageSnapshot } from '../../../tests/snapshot-helpers';

import { BREADCRUMB } from '../../../utilities/constants';

import BreadcrumbBase from '../__examples__/base';

describe(BREADCRUMB, () => {
	test('Base DOM & HTML Snapshots', () => {
		testDOMandHTML(BreadcrumbBase);
	});

	test('2 Items Image Snapshot', async () => {
		await testImageSnapshot(BREADCRUMB, '2 Items');
	});

	test('1 Item Image Snapshot', async () => {
		await testImageSnapshot(BREADCRUMB, '1 Item');
	});
});
