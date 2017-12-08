/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { renderMarkup } from '../../../tests/snapshot-helpers';

import SnapshotExample from '../__examples__/base';

test('Radio Group Base DOM Snapshot', () => {
	const domTree = renderer
		.create(<SnapshotExample name="radioGroup" />)
		.toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Radio Group Base HTML Snapshot', () => {
	expect(
		renderMarkup(SnapshotExample, { name: 'radioGroup' })
	).toMatchSnapshot();
});

test('Radio Group Disabled DOM Snapshot', () => {
	const domTree = renderer
		.create(<SnapshotExample name="radioGroup" disabled />)
		.toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Radio Group Required DOM Snapshot', () => {
	const domTree = renderer
		.create(<SnapshotExample name="radioGroup" required />)
		.toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Radio Group Error DOM Snapshot', () => {
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
