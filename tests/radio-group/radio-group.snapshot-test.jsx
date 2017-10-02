/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { renderMarkup } from '../snapshot-helpers';

import SnapshotExample from '../../examples/radio-group/base';

test('Radio Group Base DOM Snapshot', () => {
	const domTree = renderer.create(
		<SnapshotExample name="radioGroup" />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Radio Group Base HTML Snapshot', () => {
	expect(renderMarkup(SnapshotExample, { name: 'radioGroup' })).toMatchSnapshot();
});

test('Radio Group Disabled DOM Snapshot', () => {
	const domTree = renderer.create(
		<SnapshotExample name="radioGroup" disabled />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Radio Group Required DOM Snapshot', () => {
	const domTree = renderer.create(
		<SnapshotExample name="radioGroup" required />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Radio Group Error DOM Snapshot', () => {
	const labels = {
		label: 'Radio Group Error Example',
		error: 'error message'
	};
	const domTree = renderer.create(
		<SnapshotExample name="radioGroup" labels={labels} errorId="radioGroupError" />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});
