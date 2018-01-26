import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import {
	testDOMandHTML,
	testImageSnapshot
} from '../../../tests/snapshot-helpers';

// import Default from '../__examples__/default';

import { GLOBAL_NAVIGATION_BAR } from '../../../utilities/constants';

describe(GLOBAL_NAVIGATION_BAR, () => {
	test('Default DOM & HTML Snapshots look the same', () => {
		// testDOMandHTML(Default);
	});

	test('Base Image Snapshot looks the same', async () => {
		await testImageSnapshot(GLOBAL_NAVIGATION_BAR, 'Base');
	});

	test('Custom Cloud Image Snapshot looks the same', async () => {
		await testImageSnapshot(GLOBAL_NAVIGATION_BAR, 'Custom Cloud');
	});

	test('Custom Cloud (Multiple active and white) Image Snapshot looks the same', async () => {
		await testImageSnapshot(
			GLOBAL_NAVIGATION_BAR,
			'Custom Cloud (Multiple active and white)'
		);
	});

	test('No Secondary Navigation Image Snapshot looks the same', async () => {
		await testImageSnapshot(GLOBAL_NAVIGATION_BAR, 'No Secondary Navigation');
	});

	test('Hybrid Dropdown Image Snapshot looks the same', async () => {
		await testImageSnapshot(GLOBAL_NAVIGATION_BAR, 'Hybrid Dropdown');
	});
});
