/* eslint-env jest */
import React from 'react';
import { renderMarkup, testDOMandHTML } from '../../../tests/snapshot-helpers';

import BaseExample from '../__examples__/base';
import DisabledExample from '../__examples__/disabled';
import ErrorExample from '../__examples__/error';
import SizesExample from '../__examples__/sizes';
import VerticalExample from '../__examples__/vertical';

testDOMandHTML({
	name: 'Base label, no label, min/max, min/max/step',
	test,
	Component: BaseExample,
});

testDOMandHTML({
	name: 'Disabled',
	test,
	Component: DisabledExample,
});

testDOMandHTML({
	name: 'Error',
	test,
	Component: ErrorExample,
});

testDOMandHTML({
	name: 'Sizes',
	test,
	Component: SizesExample,
});

testDOMandHTML({
	name: 'Vertical',
	test,
	Component: VerticalExample,
});
