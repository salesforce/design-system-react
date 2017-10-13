/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { renderMarkup } from '../snapshot-helpers';

import SnapshotBase from '../../examples/avatar/base';
import SnapshotEntityIcon from '../../examples/avatar/entity-icon';
import SnapshotEntityInitials from '../../examples/avatar/entity-initials';
import SnapshotUserIcon from '../../examples/avatar/user-icon';
import SnapshotUserInitials from '../../examples/avatar/user-initials';


test('Avatar Base DOM Snapshot', () => {
	const domTree = renderer.create(
		<SnapshotBase />
	).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Avatar Entity Icon Snapshot', () => {
	const domTree = renderer.create(
		<SnapshotEntityIcon />
	).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Avatar Entity Initials Snapshot', () => {
	const domTree = renderer.create(
		<SnapshotEntityInitials />
	).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Avatar User Icon Snapshot', () => {
	const domTree = renderer.create(
		<SnapshotUserIcon />
	).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Avatar User Initials Snapshot', () => {
	const domTree = renderer.create(
		<SnapshotUserInitials />
	).toJSON();
	expect(domTree).toMatchSnapshot();
});
