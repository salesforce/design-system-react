/* eslint-env jest */
import React from 'react';
import {
	testDOMandHTML,
	testImageSnapshot
} from '../../../tests/snapshot-helpers';

import BaseExample from '../__examples__/base';
import IconExample from '../__examples__/icon';
import ContainerExample from '../__examples__/container';
import BarePillListboxExample from '../__examples__/listbox-bare';
import ListboxExample from '../__examples__/listbox';
import IconListboxExample from '../__examples__/listbox-icon';
import AvatarListboxExample from '../__examples__/listbox-avatar';

import { PILL } from '../../../utilities/constants';

describe(PILL, () => {
	test('DOM & HTML Snapshots look the same', () => {
		testDOMandHTML(BaseExample);
		testDOMandHTML(IconExample);
		testDOMandHTML(ContainerExample);
		testDOMandHTML(BarePillListboxExample);
		testDOMandHTML(ListboxExample);
		testDOMandHTML(IconListboxExample);
		testDOMandHTML(AvatarListboxExample);
	});

	test('Linked, Unlinked, Truncated Image Snapshot looks the same', async () => {
		await testImageSnapshot(PILL, 'Linked, Unlinked, Truncated');
	});

	test('Icon, Avatar, Error Image Snapshot looks the same', async () => {
		await testImageSnapshot(PILL, 'Icon, Avatar, Error');
	});

	test('Bare Image Snapshot looks the same', async () => {
		await testImageSnapshot(PILL, 'Bare');
	});

	test('Pill Container Image Snapshot looks the same', async () => {
		await testImageSnapshot(PILL, 'Pill Container');
	});

	test('Listbox Of Pill Options Image Snapshot looks the same', async () => {
		await testImageSnapshot(PILL, 'Listbox Of Pill Options');
	});

	test('Listbox Of Pill Options With Icon Image Snapshot looks the same', async () => {
		await testImageSnapshot(PILL, 'Listbox Of Pill Options With Icon');
	});

	test('Listbox Of Pill Options With Avatar Image Snapshot looks the same', async () => {
		await testImageSnapshot(PILL, 'Listbox Of Pill Options With Avatar');
	});
});
