/* eslint-env jest */
import { testDOMandHTML } from '../../../tests/snapshot-helpers';

import SnapshotBase from '../__examples__/base';
import SnapshotEntityIcon from '../__examples__/entity-icon';
import SnapshotEntityInitials from '../__examples__/entity-initials';
import SnapshotUserIcon from '../__examples__/user-icon';
import SnapshotUserInitials from '../__examples__/user-initials';

import { AVATAR } from '../../../utilities/constants';

testDOMandHTML({
	name: 'Avatar Base',
	test,
	Component: SnapshotBase,
	ComponentKind: AVATAR
});

testDOMandHTML({
	name: 'Avatar Entity Icon Snapshot',
	test,
	Component: SnapshotEntityIcon,
	ComponentKind: AVATAR
});

testDOMandHTML({
	name: 'Avatar Entity Initials Snapshot',
	test,
	Component: SnapshotEntityInitials,
	ComponentKind: AVATAR
});

testDOMandHTML({
	name: 'Avatar User Icon Snapshot',
	test,
	Component: SnapshotUserIcon,
	ComponentKind: AVATAR
});

testDOMandHTML({
	name: 'Avatar User Initials Snapshot',
	test,
	Component: SnapshotUserInitials,
	ComponentKind: AVATAR
});
