/* eslint-env jest */
import { testDOMandHTML } from '../../../tests/snapshot-helpers';

import SnapshotBase from '../__examples__/base';
import SnapshotBaseOpen from '../__examples__/snapshot/base-open';

import { ACCORDION } from '../../../utilities/constants';


testDOMandHTML({
	name: 'Base',
	test,
	Component: SnapshotBase,
	ComponentKind: ACCORDION
});

testDOMandHTML({
	name: 'Base Open',
	test,
	Component: SnapshotBaseOpen,
	ComponentKind: ACCORDION
});
