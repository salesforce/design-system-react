/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { renderMarkup } from '../snapshot-helpers';

import SnapshotExample from '../../examples/radio-button-group/base';

test('Radio Button Group Base DOM Snapshot', () => {
	const domTree = renderer.create(
		<SnapshotExample name="dayOfWeek" errorId="dayOfWeekError" />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Radio Button Group Base HTML Snapshot', () => {
	expect(renderMarkup(SnapshotExample, { name: 'dayOfWeek', errorId: 'dayOfWeekError' })).toMatchSnapshot();
});

test('Radio Button Group Disabled DOM Snapshot', () => {
	const domTree = renderer.create(
		<SnapshotExample name="dayOfWeek" errorId="dayOfWeekError" disabled />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Radio Button Group Required DOM Snapshot', () => {
	const domTree = renderer.create(
		<SnapshotExample name="dayOfWeek" errorId="dayOfWeekError" required />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});
