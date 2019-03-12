/* eslint-env jest */
import React from 'react';
import { renderMarkup, testDOMandHTML } from '../../../tests/snapshot-helpers';

import BaseExample from '../__examples__/base';
import IconExample from '../__examples__/icon';

testDOMandHTML({
	name: 'Linked, Unlinked, Truncated',
	test,
	Component: BaseExample,
});

testDOMandHTML({
	name: 'Icon, Avatar, Error',
	test,
	Component: IconExample,
});
