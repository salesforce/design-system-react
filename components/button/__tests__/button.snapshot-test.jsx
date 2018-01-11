/* eslint-env jest */
import { testDOMandHTML, testImageSnapshot } from '../../../tests/snapshot-helpers';

import { BUTTON } from '../../../utilities/constants';

import ButtonBase from '../__examples__/base-neutral';
import BrandDisabledDestructiveInverse from '../__examples__/brand-disabled-destructive-inverse';
import ButtonIcons from '../__examples__/button-icons';

test('Base DOM & HTML Snapshots', () => {
	testDOMandHTML(ButtonBase);
	testDOMandHTML(BrandDisabledDestructiveInverse);
	testDOMandHTML(ButtonIcons);
});

test('Base Image Snapshot', async () => {
	await testImageSnapshot(BUTTON, 'Base');
});

test('Neutral Image Snapshot', async () => {
	await testImageSnapshot(BUTTON, 'Neutral');
});

test('Neutral Image Snapshot', async () => {
	await testImageSnapshot(BUTTON, 'Neutral with id');
});

test('Neutral Image Snapshot', async () => {
	await testImageSnapshot(BUTTON, 'Neutral Icon');
});

test('Disabled Image Snapshot', async () => {
	await testImageSnapshot(BUTTON, 'Disabled');
});

test('Icon large Image Snapshot', async () => {
	await testImageSnapshot(BUTTON, 'Icon large');
});

test('Icon with external path Image Snapshot', async () => {
	await testImageSnapshot(BUTTON, 'Icon with external path');
});

test('Icon Container Small Image Snapshot', async () => {
	await testImageSnapshot(BUTTON, 'Icon Container Small');
});

test('Dropdown Icon inverse Image Snapshot', async () => {
	await testImageSnapshot(BUTTON, 'Dropdown Icon inverse');
});

test('Small Icon Hint inverse Image Snapshot', async () => {
	await testImageSnapshot(BUTTON, 'Small Icon Hint inverse');
});

test.skip("Don't run", async () => {
	console.log('should not run');

	await expect(true).toBeFalsy();
});
