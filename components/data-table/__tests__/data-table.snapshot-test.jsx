/* eslint-env jest */
import { testDOMandHTML } from '../../../tests/snapshot-helpers';

import Basic from '../__examples__/basic';
import Advanced from '../__examples__/advanced';

import { DATA_TABLE } from '../../../utilities/constants';

testDOMandHTML({
	name: 'Basic',
	test,
	Component: Basic,
	ComponentKind: DATA_TABLE
});

testDOMandHTML({
	name: 'Advanced',
	test,
	Component: Advanced,
	ComponentKind: DATA_TABLE
});
