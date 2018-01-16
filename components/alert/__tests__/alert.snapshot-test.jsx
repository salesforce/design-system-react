/* eslint-env jest */
import { testDOMandHTML, testImageSnapshot } from '../../../tests/snapshot-helpers';

import Info from '../__examples__/info';
import Warning from '../__examples__/warning';
import ErrorAlert from '../__examples__/error';
import Offline from '../__examples__/offline';
import Dismissable from '../__examples__/dismissable';
import CustomClassNames from '../__examples__/custom-class-name';

import { ALERT } from '../../../utilities/constants';

describe(ALERT, () => {
	test('Base DOM & HTML Snapshots look the same', () => {
		testDOMandHTML(Info);
		testDOMandHTML(Warning);
		testDOMandHTML(ErrorAlert);
		testDOMandHTML(Offline);
		testDOMandHTML(Dismissable);
		testDOMandHTML(CustomClassNames);
	});

	test('Info Image Snapshot looks the same', async () => {
		await testImageSnapshot(ALERT, 'Info');
	});

	test('Warning Image Snapshot looks the same', async () => {
		await testImageSnapshot(ALERT, 'Warning');
	});

	test('Error Image Snapshot looks the same', async () => {
		await testImageSnapshot(ALERT, 'Error');
	});

	test('Offline Image Snapshot looks the same', async () => {
		await testImageSnapshot(ALERT, 'Offline');
	});

	test('Dismissable Image Snapshot looks the same', async () => {
		await testImageSnapshot(ALERT, 'Dismissable');
	});

	test('Custom Class Name Image Snapshot looks the same', async () => {
		await testImageSnapshot(ALERT, 'Custom Class Name');
	});
});
