import React from 'react';
import renderer from 'react-test-renderer';
import { renderMarkup } from '../../../tests/snapshot-helpers';

import CheckboxBase from '../__examples__/snapshot-base';
import CheckboxToggle from '../__examples__/snapshot-toggle';

test('Checkbox Base DOM Snapshot', () => {
	const domTree = renderer.create(<CheckboxBase />).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Checkbox Base HTML Snapshot', () => {
	expect(renderMarkup(CheckboxBase)).toMatchSnapshot();
});

test('Checkbox Toggle DOM Snapshot', () => {
	const domTree = renderer.create(<CheckboxToggle />).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Checkbox Toggle HTML Snapshot', () => {
	expect(renderMarkup(CheckboxToggle)).toMatchSnapshot();
});
