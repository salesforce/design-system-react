/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { renderMarkup } from '../snapshot-helpers';

import SnapshotExample from '../../examples/radio-button-group/base';

test('Datepicker Base DOM Snapshot', () => {
	const domTree = renderer.create(
		<SnapshotExample name="dayOfWeek" errorId="dayOfWeekError" />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Datepicker Base HTML Snapshot', () => {
	expect(renderMarkup(SnapshotExample, { name: 'dayOfWeek', errorId: 'dayOfWeekError' })).toMatchSnapshot();
});

test('Datepicker Disabled DOM Snapshot', () => {
	const domTree = renderer.create(
		<SnapshotExample name="dayOfWeek" errorId="dayOfWeekError" disabled />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Datepicker Required DOM Snapshot', () => {
	const domTree = renderer.create(
		<SnapshotExample name="dayOfWeek" errorId="dayOfWeekError" required />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});
