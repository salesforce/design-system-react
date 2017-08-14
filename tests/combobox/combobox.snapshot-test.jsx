/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { renderMarkup } from '../snapshot-helpers';

import AutoCompleteOpen from '../../examples/combobox/autocomplete-snapshot-open';
import AutoCompleteSelected from '../../examples/combobox/autocomplete-snapshot-selected';

test('Combobox AutoComplete Single Select Open DOM Snapshot', () => {
	const domTree = renderer.create(
		<AutoCompleteOpen />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Combobox AutoComplete Single Select Open HTML Snapshot', () => {
	expect(renderMarkup(AutoCompleteOpen)).toMatchSnapshot();
});


test('Combobox AutoComplete Single Select Selected DOM Snapshot', () => {
	const domTree = renderer.create(
		<AutoCompleteSelected />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Combobox AutoComplete Single Select Selected HTML Snapshot', () => {
	expect(renderMarkup(AutoCompleteSelected)).toMatchSnapshot();
});
