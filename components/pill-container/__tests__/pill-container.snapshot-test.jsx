/* eslint-env jest */
import React from 'react';
import { renderMarkup, testDOMandHTML } from '../../../tests/snapshot-helpers';

import BaseExample from '../__examples__/base';
import IconsExample from '../__examples__/icons';
import AvatarsExample from '../__examples__/avatars';
import BareExample from '../__examples__/bare';

testDOMandHTML({
	name: 'Base',
	test,
	Component: BaseExample,
});

testDOMandHTML({
	name: 'Icons',
	test,
	Component: IconsExample,
});

testDOMandHTML({
	name: 'Avatars',
	test,
	Component: AvatarsExample,
});

testDOMandHTML({
	name: 'Bare',
	test,
	Component: BareExample,
});
