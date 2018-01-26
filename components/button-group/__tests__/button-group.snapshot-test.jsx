import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import {
	testDOMandHTML,
	testImageSnapshot
} from '../../../tests/snapshot-helpers';

import IconGroup from '../__examples__/icon-group';
import MoreIcon from '../__examples__/more-icon';
import Checkbox from '../__examples__/checkbox';
import CheckboxError from '../__examples__/checkbox-error';

import { BUTTON_GROUP } from '../../../utilities/constants';

describe(BUTTON_GROUP, () => {
	test('DOM & HTML Snapshots', () => {
		testDOMandHTML(IconGroup);
		testDOMandHTML(MoreIcon);
		testDOMandHTML(Checkbox);
		testDOMandHTML(CheckboxError);
	});

	test('Icon Group Image Snapshot', async () => {
		await testImageSnapshot(BUTTON_GROUP, 'Icon Group');
	});

	test('More Icon Image Snapshot', async () => {
		await testImageSnapshot(BUTTON_GROUP, 'More Icon');
	});

	test('Checkbox Image Snapshot', async () => {
		await testImageSnapshot(BUTTON_GROUP, 'Checkbox');
	});

	test('Checkbox Error Image Snapshot', async () => {
		await testImageSnapshot(BUTTON_GROUP, 'Checkbox Error');
	});
});
