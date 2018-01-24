import React from 'react';
import renderer from 'react-test-renderer';
import {
	testDOMandHTML,
	testImageSnapshot
} from '../../../../tests/snapshot-helpers';

import CheckboxBase from '../__examples__/snapshot-base';
import CheckboxToggle from '../__examples__/snapshot-toggle';

import { CHECKBOX } from '../../../../utilities/constants';

describe(CHECKBOX, () => {
	test('Base DOM & HTML Snapshots look the same', () => {
		testDOMandHTML(CheckboxBase);
	});

	test('Toggle DOM & HTML Snapshots look the same', () => {
		testDOMandHTML(CheckboxToggle);
	});

	test('Image Snapshot looks the same', async () => {
		await testImageSnapshot(CHECKBOX, 'Checkbox');
	});

	test('(with error) Image Snapshot looks the same', async () => {
		await testImageSnapshot(CHECKBOX, 'Checkbox (with error)');
	});

	test('(required) Image Snapshot looks the same', async () => {
		await testImageSnapshot(CHECKBOX, 'Checkbox (required)');
	});

	test('(disabled) Image Snapshot looks the same', async () => {
		await testImageSnapshot(CHECKBOX, 'Checkbox (disabled)');
	});

	test('(assistive text) Image Snapshot looks the same', async () => {
		await testImageSnapshot(CHECKBOX, 'Checkbox (assistive text)');
	});

	test('(checked) Image Snapshot looks the same', async () => {
		await testImageSnapshot(CHECKBOX, 'Checkbox (checked)');
	});

	test('(indeterminate) Image Snapshot looks the same', async () => {
		await testImageSnapshot(CHECKBOX, 'Checkbox (indeterminate)');
	});

	test('Toggle Image Snapshot looks the same', async () => {
		await testImageSnapshot(CHECKBOX, 'Checkbox Toggle');
	});

	test('Toggle (with error) Image Snapshot looks the same', async () => {
		await testImageSnapshot(CHECKBOX, 'Checkbox Toggle (with error)');
	});

	test('Toggle (required) Image Snapshot looks the same', async () => {
		await testImageSnapshot(CHECKBOX, 'Checkbox Toggle (required)');
	});

	test('Toggle (disabled) Image Snapshot looks the same', async () => {
		await testImageSnapshot(CHECKBOX, 'Checkbox Toggle (disabled)');
	});

	test('Toggle (assistive text) Image Snapshot looks the same', async () => {
		await testImageSnapshot(CHECKBOX, 'Checkbox Toggle (assistive text)');
	});

	test('Toggle (checked) Image Snapshot looks the same', async () => {
		await testImageSnapshot(CHECKBOX, 'Checkbox Toggle (checked)');
	});
});
