/* eslint-env jest */
import { testDOMandHTML, testImageSnapshot } from '../../../tests/snapshot-helpers';

import Info from '../__examples__/info';
import Warning from '../__examples__/warning';
import ErrorAlert from '../__examples__/error';
import Offline from '../__examples__/offline';
import Dismissable from '../__examples__/dismissable';
import CustomClassNames from '../__examples__/custom-class-name';

import { ALERT } from '../../../utilities/constants';

test('Base DOM & HTML Snapshots', () => {
	testDOMandHTML(Info);
	testDOMandHTML(Warning);
	testDOMandHTML(ErrorAlert);
	testDOMandHTML(Offline);
	testDOMandHTML(Dismissable);
	testDOMandHTML(CustomClassNames);
});

test('Info Image Snapshot', async () => {
	await testImageSnapshot(ALERT, 'Info');
});

test('Warning Image Snapshot', async () => {
	await testImageSnapshot(ALERT, 'Warning');
});

test('Error Image Snapshot', async () => {
	await testImageSnapshot(ALERT, 'Error');
});

test('Offline Image Snapshot', async () => {
	await testImageSnapshot(ALERT, 'Offline');
});

test('Dismissable Image Snapshot', async () => {
	await testImageSnapshot(ALERT, 'Dismissable');
});

test('Custom Class Name Image Snapshot', async () => {
	await testImageSnapshot(ALERT, 'Custom Class Name');
});
