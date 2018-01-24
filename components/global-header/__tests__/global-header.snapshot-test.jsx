import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import {
	testDOMandHTML,
	testImageSnapshot
} from '../../../tests/snapshot-helpers';

import Default from '../__examples__/default';

import { GLOBAL_HEADER } from '../../../utilities/constants';

describe(GLOBAL_HEADER, () => {
	// test('Default DOM & HTML Snapshots look the same', () => {
	// 	testDOMandHTML(Default);
	// });

	test('Basic (Fluid Layout) Image Snapshot looks the same', async () => {
		await testImageSnapshot(GLOBAL_HEADER, 'Basic (Fluid Layout)');
	});

	test('Advanced (Fixed Layout) Image Snapshot looks the same', async () => {
		await testImageSnapshot(GLOBAL_HEADER, 'Advanced (Fixed Layout)');
	});
});
