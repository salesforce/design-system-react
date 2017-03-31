import React from 'react';
import renderer from 'react-test-renderer';
import { renderMarkup } from '../snapshot-helpers';

import CheckboxBase from '../../examples/forms/checkbox/snapshot-base';
import CheckboxToggle from '../../examples/forms/checkbox/snapshot-toggle';


test('Checkbox Base DOM Snapshot', () => {
	const domTree = renderer.create(
		<CheckboxBase />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});


test('Checkbox Base HTML Snapshot', () => {
	expect(renderMarkup(CheckboxBase)).toMatchSnapshot();
});

test('Checkbox Toggle DOM Snapshot', () => {
	const domTree = renderer.create(
		<CheckboxToggle />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});


test('Checkbox Toggle HTML Snapshot', () => {
	expect(renderMarkup(CheckboxToggle)).toMatchSnapshot();
});

