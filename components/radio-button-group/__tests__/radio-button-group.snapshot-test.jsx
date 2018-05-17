/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { renderMarkup } from '../../../tests/snapshot-helpers';

import SnapshotExample from '../__examples__/base';

test('Radio Button Group Base DOM Snapshot', () => {
	const domTree = renderer
		.create(<SnapshotExample name="dayOfWeek" />)
		.toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Radio Button Group Base HTML Snapshot', () => {
	expect(
		renderMarkup(SnapshotExample, { name: 'dayOfWeek' })
	).toMatchSnapshot();
});

test('Radio Button Group Disabled DOM Snapshot', () => {
	const domTree = renderer
		.create(<SnapshotExample name="dayOfWeek" disabled />)
		.toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Radio Button Group Required DOM Snapshot', () => {
	const domTree = renderer
		.create(<SnapshotExample name="dayOfWeek" required />)
		.toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Radio Button Group Error DOM Snapshot', () => {
	const domTree = renderer
		.create(
			<SnapshotExample
				name="radioGroup"
				errorLabel="error message"
				errorId="radioGroupError"
			/>
		)
		.toJSON();
	expect(domTree).toMatchSnapshot();
});
