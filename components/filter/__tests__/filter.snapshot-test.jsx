import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import {
	testDOMandHTML,
	testImageSnapshot
} from '../../../tests/snapshot-helpers';

import Default from '../__examples__/default';
import NewFilter from '../__examples__/new';
import LockedFilter from '../__examples__/locked';
import PermanantFilter from '../__examples__/permanant';
import ErrorFilter from '../__examples__/error';
import AssistiveTextFilter from '../__examples__/assistive-text';

import { FILTER } from '../../../utilities/constants';

describe(FILTER, () => {
	test('Default DOM & HTML Snapshots look the same', () => {
		testDOMandHTML(Default);
	});

	test('Default with custom className DOM & HTML Snapshots look the same', () => {
		testDOMandHTML(Default, { className: 'MY_CUSTOM_CLASS_NAME' });
	});

	test('NewFilter DOM & HTML Snapshots look the same', () => {
		testDOMandHTML(NewFilter);
	});

	test('LockedFilter DOM & HTML Snapshots look the same', () => {
		testDOMandHTML(LockedFilter);
	});

	test('PermanantFilter DOM & HTML Snapshots look the same', () => {
		testDOMandHTML(PermanantFilter);
	});

	test('ErrorFilter DOM & HTML Snapshots look the same', () => {
		testDOMandHTML(ErrorFilter);
	});

	test('AssistiveTextFilter DOM & HTML Snapshots look the same', () => {
		testDOMandHTML(AssistiveTextFilter);
	});

	test('Image Snapshot looks the same', async () => {
		await testImageSnapshot(FILTER, 'Filter');
	});

	test('New Filter Image Snapshot looks the same', async () => {
		await testImageSnapshot(FILTER, 'New Filter');
	});

	test('Locked Filter Image Snapshot looks the same', async () => {
		await testImageSnapshot(FILTER, 'Locked Filter');
	});

	test('Permanant Filter Image Snapshot looks the same', async () => {
		await testImageSnapshot(FILTER, 'Permanant Filter');
	});

	test('Align Right Image Snapshot looks the same', async () => {
		await testImageSnapshot(FILTER, 'Filter Align Right');
	});

	test('AssistiveTextFilter Image Snapshot looks the same', async () => {
		await testImageSnapshot(FILTER, 'AssistiveTextFilter');
	});
});
