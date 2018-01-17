/* eslint-env jest */
import { testDOMandHTML, testImageSnapshot } from '../../../tests/snapshot-helpers';

import { ICON_SETTINGS } from '../../../utilities/constants';

// import Sprite from '../__examples__/sprite';
import IconPath from '../__examples__/icon-path';

describe(ICON_SETTINGS, () => {
	test('DOM & HTML Snapshots look the same', () => {
		// testDOMandHTML(Sprite);
		testDOMandHTML(IconPath);
	});

	test('Base: Icon path Image Snapshot looks the same', async () => {
		await testImageSnapshot(ICON_SETTINGS, 'Base: Icon path');
	});

	test('Base: Sprite imports Image Snapshot looks the same', async () => {
		await testImageSnapshot(ICON_SETTINGS, 'Base: Sprite imports');
	});
});
