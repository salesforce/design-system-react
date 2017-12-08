/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import SnapshotBase from '../__examples__/base';
import SnapshotEntityIcon from '../__examples__/entity-icon';
import SnapshotEntityInitials from '../__examples__/entity-initials';
import SnapshotUserIcon from '../__examples__/user-icon';
import SnapshotUserInitials from '../__examples__/user-initials';

test('Avatar Base DOM Snapshot', () => {
	const domTree = renderer.create(<SnapshotBase />).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Avatar Entity Icon Snapshot', () => {
	const domTree = renderer.create(<SnapshotEntityIcon />).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Avatar Entity Initials Snapshot', () => {
	const domTree = renderer.create(<SnapshotEntityInitials />).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Avatar User Icon Snapshot', () => {
	const domTree = renderer.create(<SnapshotUserIcon />).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Avatar User Initials Snapshot', () => {
	const domTree = renderer.create(<SnapshotUserInitials />).toJSON();
	expect(domTree).toMatchSnapshot();
});
