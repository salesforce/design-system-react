import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { testDOMandHTML, testImageSnapshot } from '../../../tests/snapshot-helpers';

import Checkmark from '../__examples__/checkmark';
import CustomTrigger from '../__examples__/custom-trigger';
import Default from '../__examples__/default';
import DefaultIconLabel from '../__examples__/default-icon-label';
import SubHeading from '../__examples__/sub-heading';

import { MENU_DROPDOWN } from '../../../utilities/constants';

describe(MENU_DROPDOWN, () => {
	test('Checkmark DOM & HTML Snapshots look the same', () => {
		testDOMandHTML(Checkmark);
	});

	test('CustomTrigger DOM & HTML Snapshots look the same', () => {
		testDOMandHTML(CustomTrigger);
	});

	test('Default DOM & HTML Snapshots look the same', () => {
		testDOMandHTML(Default);
	});

	test('DefaultIconLabel DOM & HTML Snapshots look the same', () => {
		testDOMandHTML(DefaultIconLabel);
	});

	test('SubHeading DOM & HTML Snapshots look the same', () => {
		testDOMandHTML(SubHeading);
	});

	test('Base Image Snapshot looks the same', async () => {
		await testImageSnapshot(MENU_DROPDOWN, 'Base');
	});

	test('Base with icon Image Snapshot looks the same', async () => {
		await testImageSnapshot(MENU_DROPDOWN, 'Base with icon');
	});

	test('Render inline Image Snapshot looks the same', async () => {
		await testImageSnapshot(MENU_DROPDOWN, 'Render inline');
	});

	test('Render inline w/ Nubbins Image Snapshot looks the same', async () => {
		await testImageSnapshot(MENU_DROPDOWN, 'Render inline w/ Nubbins');
	});

	test('Custom Trigger Image Snapshot looks the same', async () => {
		await testImageSnapshot(MENU_DROPDOWN, 'Custom Trigger');
	});

	test('Custom Content Image Snapshot looks the same', async () => {
		await testImageSnapshot(MENU_DROPDOWN, 'Custom Content');
	});

	test('Hover Image Snapshot looks the same', async () => {
		await testImageSnapshot(MENU_DROPDOWN, 'Hover');
	});

	test('Two Hovers Image Snapshot looks the same', async () => {
		await testImageSnapshot(MENU_DROPDOWN, 'Two Hovers');
	});

	test('Hover with Checkmark Image Snapshot looks the same', async () => {
		await testImageSnapshot(MENU_DROPDOWN, 'Hover with Checkmark');
	});

	test('Controled w/ isOpen Image Snapshot looks the same', async () => {
		await testImageSnapshot(MENU_DROPDOWN, 'Controled w/ isOpen');
	});
});
