/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { testDOMandHTML } from '../snapshot-helpers';

import SnapshotBase from '../../examples/accordion/base';
import SnapshotBaseOpen from '../../examples/accordion/snapshot/base-open';

testDOMandHTML({
	name: 'Base',
	test,
	Component: SnapshotBase
});

testDOMandHTML({
	name: 'Base Open',
	test,
	Component: SnapshotBaseOpen
});
