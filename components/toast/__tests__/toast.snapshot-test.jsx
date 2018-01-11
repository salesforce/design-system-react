/* eslint-env jest */
import { testDOMandHTML, testImageSnapshot } from '../../../tests/snapshot-helpers';

import Info from '../__examples__/info';
import Warning from '../__examples__/warning';
import ErrorAlert from '../__examples__/error';
import ErrorWithDetailsAlert from '../__examples__/error-with-details';
import Success from '../__examples__/success';
import CustomClassNames from '../__examples__/custom-class-name';

import { TOAST } from '../../../utilities/constants';

test('DOM & HTML Snapshots', () => {
	testDOMandHTML(Info);
	testDOMandHTML(Warning);
	testDOMandHTML(ErrorAlert);
	testDOMandHTML(ErrorWithDetailsAlert);
	testDOMandHTML(Success);
	testDOMandHTML(CustomClassNames);
});

test('Info Image Snapshot', async () => {
	await testImageSnapshot(TOAST, 'Info');
});

test('Warning Image Snapshot', async () => {
	await testImageSnapshot(TOAST, 'Warning');
});

test('Error Image Snapshot', async () => {
	await testImageSnapshot(TOAST, 'Error');
});

test('Error With details Image Snapshot', async () => {
	await testImageSnapshot(TOAST, 'Error With details');
});

test('Success Image Snapshot', async () => {
	await testImageSnapshot(TOAST, 'Success');
});

test('Custom Class Name Image Snapshot', async () => {
	await testImageSnapshot(TOAST, 'Custom Class Name');
});
