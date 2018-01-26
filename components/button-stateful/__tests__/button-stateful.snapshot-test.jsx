/* eslint-env jest */
import {
	testDOMandHTML,
	testImageSnapshot
} from '../../../tests/snapshot-helpers';

import Icon from '../__examples__/icon';
import IconText from '../__examples__/icon-text';

import { BUTTON_STATEFUL } from '../../../utilities/constants';

describe(BUTTON_STATEFUL, () => {
	test('Base DOM & HTML Snapshots look the same', () => {
		testDOMandHTML(Icon);
		testDOMandHTML(IconText);
	});

	test('Base Image Snapshot looks the same', async () => {
		await testImageSnapshot(BUTTON_STATEFUL, 'Base');
	});

	test('Disabled Image Snapshot looks the same', async () => {
		await testImageSnapshot(BUTTON_STATEFUL, 'Disabled');
	});

	test('Icon Image Snapshot looks the same', async () => {
		await testImageSnapshot(BUTTON_STATEFUL, 'Icon');
	});
});
