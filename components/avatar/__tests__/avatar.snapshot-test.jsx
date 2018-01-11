/* eslint-env jest */
import { testDOMandHTML, testImageSnapshot } from '../../../tests/snapshot-helpers';

import SnapshotBase from '../__examples__/base';
import SnapshotEntityIcon from '../__examples__/entity-icon';
import SnapshotEntityInitials from '../__examples__/entity-initials';
import SnapshotUserIcon from '../__examples__/user-icon';
import SnapshotUserInitials from '../__examples__/user-initials';

import { AVATAR } from '../../../utilities/constants';

test('Base DOM & HTML Snapshots', () => {
	testDOMandHTML(SnapshotBase);
	testDOMandHTML(SnapshotEntityIcon);
	testDOMandHTML(SnapshotEntityInitials);
	testDOMandHTML(SnapshotUserIcon);
	testDOMandHTML(SnapshotUserInitials);
});

test('Base Image Snapshot', async () => {
	await testImageSnapshot(AVATAR, 'Base');
});

test('Entity Icon Image Snapshot', async () => {
	await testImageSnapshot(AVATAR, 'Entity Icon');
});

test('Entity Initials Image Snapshot', async () => {
	await testImageSnapshot(AVATAR, 'Entity Initials');
});

test('User Icon Image Snapshot', async () => {
	await testImageSnapshot(AVATAR, 'User Icon');
});

test('User Initials Image Snapshot', async () => {
	await testImageSnapshot(AVATAR, 'User Initials');
});
