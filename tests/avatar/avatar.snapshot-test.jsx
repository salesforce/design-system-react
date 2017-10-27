/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { testDOMandHTML } from '../snapshot-helpers';

import SnapshotBase from '../../examples/avatar/base';
import SnapshotEntityIcon from '../../examples/avatar/entity-icon';
import SnapshotEntityInitials from '../../examples/avatar/entity-initials';
import SnapshotUserIcon from '../../examples/avatar/user-icon';
import SnapshotUserInitials from '../../examples/avatar/user-initials';

testDOMandHTML({
	name: 'Avatar Base',
	test,
	Component: SnapshotBase
});

testDOMandHTML({
	name: 'Avatar Entity Icon',
	test,
	Component: SnapshotEntityIcon
});

testDOMandHTML({
	name: 'Avatar Entity Initials',
	test,
	Component: SnapshotEntityInitials
});

testDOMandHTML({
	name: 'Avatar User Icon',
	test,
	Component: SnapshotUserIcon
});

testDOMandHTML({
	name: 'Avatar User Initials',
	test,
	Component: SnapshotUserInitials
});
