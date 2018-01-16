/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { testDOMandHTML, testImageSnapshot } from '../../../tests/snapshot-helpers';

import SnapshotBaseOpen from '../__examples__/snapshot/base-open';
import SnapshotBaseOpenClassName from '../__examples__/snapshot/base-open-class-name';
import SnapshotBaseSelected from '../__examples__/snapshot/base-selected';
import SnapshotInlineSingleSelection from '../__examples__/snapshot/inline-single-selection';
import SnapshotInlineSingleSelectionSelected from '../__examples__/snapshot/inline-single-selection-selected';
import SnapshotInlineMultipleSelection from '../__examples__/snapshot/inline-multiple-selection';
import SnapshotInlineMultipleSelectionSelected from '../__examples__/snapshot/inline-multiple-selection-selected';
import SnapshotReadonlySingleSelection from '../__examples__/snapshot/readonly-single-selection';
import SnapshotReadonlySingleSelectionSelected from '../__examples__/snapshot/readonly-single-selection-selected';
import SnapshotReadonlySingleSelectionSelectedOpen from '../__examples__/snapshot/readonly-single-selection-selected-open';
import SnapshotReadonlyMultipleSelection from '../__examples__/snapshot/readonly-multiple-selection';
import SnapshotReadonlyMultipleSelectionSingleItemSelected from '../__examples__/snapshot/readonly-multiple-selection-single-item-selected';
import SnapshotReadonlyMultipleSelectionMultipleItemsSelected from '../__examples__/snapshot/readonly-multiple-selection-multiple-items-selected';

import SnapshotBaseCustomMenuItemOpen from '../__examples__/snapshot/base-custom-menu-item-open';
import SnapshotReadonlySingleSelectionCustomMenuItemOpen from '../__examples__/snapshot/readonly-single-selection-custom-menu-item';

import { COMBOBOX } from '../../../utilities/constants';

describe(COMBOBOX, () => {
	test('Base DOM & HTML Snapshots', () => {
		testDOMandHTML(SnapshotBaseOpen);
		testDOMandHTML(SnapshotBaseOpenClassName);
		testDOMandHTML(SnapshotBaseSelected);
		testDOMandHTML(SnapshotInlineSingleSelection);
		testDOMandHTML(SnapshotInlineSingleSelectionSelected);
		testDOMandHTML(SnapshotInlineMultipleSelection);
		testDOMandHTML(SnapshotInlineMultipleSelectionSelected);
		testDOMandHTML(SnapshotReadonlySingleSelection);
		testDOMandHTML(SnapshotReadonlySingleSelectionSelected);
		testDOMandHTML(SnapshotReadonlySingleSelectionSelectedOpen);
		testDOMandHTML(SnapshotReadonlyMultipleSelection);
		testDOMandHTML(SnapshotReadonlyMultipleSelectionSingleItemSelected);
		testDOMandHTML(SnapshotReadonlyMultipleSelectionMultipleItemsSelected);
	});

	test('Base Open Image Snapshot', async () => {
		await testImageSnapshot(COMBOBOX, 'Base Open');
	});

	test('Base Selected Image Snapshot', async () => {
		await testImageSnapshot(COMBOBOX, 'Base Selected');
	});

	test('Base Open Custom Class Name Image Snapshot', async () => {
		await testImageSnapshot(COMBOBOX, 'Base Open Custom Class Name');
	});

	test('Inline Single Selection Image Snapshot', async () => {
		await testImageSnapshot(COMBOBOX, 'Inline Single Selection');
	});

	test('Inline Single Selection Selected Image Snapshot', async () => {
		await testImageSnapshot(COMBOBOX, 'Inline Single Selection Selected');
	});

	test('Inline Multiple Selection Image Snapshot', async () => {
		await testImageSnapshot(COMBOBOX, 'Inline Multiple Selection');
	});

	test('Inline Multiple Selection Selected Image Snapshot', async () => {
		await testImageSnapshot(COMBOBOX, 'Inline Multiple Selection Selected');
	});

	test('Base Custom Menu Item Open Image Snapshot', async () => {
		await testImageSnapshot(COMBOBOX, 'Base Custom Menu Item Open');
	});

	test('Readonly Single Selection Image Snapshot', async () => {
		await testImageSnapshot(COMBOBOX, 'Readonly Single Selection');
	});

	test('Readonly Single Selection Selected Image Snapshot', async () => {
		await testImageSnapshot(COMBOBOX, 'Readonly Single Selection Selected');
	});

	test('Readonly Single Selection Selected Open Image Snapshot', async () => {
		await testImageSnapshot(COMBOBOX, 'Readonly Single Selection Selected Open');
	});

	test('Readonly Multiple Selection Image Snapshot', async () => {
		await testImageSnapshot(COMBOBOX, 'Readonly Multiple Selection');
	});

	test('Readonly Multiple Selection Single Item Selected Image Snapshot', async () => {
		await testImageSnapshot(COMBOBOX, 'Readonly Multiple Selection Single Item Selected');
	});

	test('Readonly Multiple Selection Multiple Items Selected Image Snapshot', async () => {
		await testImageSnapshot(COMBOBOX, 'Readonly Multiple Selection Multiple Items Selected');
	});

	test('Readonly Single Selection Custom Menu Item Open Image Snapshot', async () => {
		await testImageSnapshot(COMBOBOX, 'Readonly Single Selection Custom Menu Item Open');
	});
});
