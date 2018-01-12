import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { renderMarkup } from '../../../tests/snapshot-helpers';

import Default from '../__examples__/default';
import NewFilter from '../__examples__/new';
import LockedFilter from '../__examples__/locked';
import PermanantFilter from '../__examples__/permanant';
import ErrorFilter from '../__examples__/error';
import AssistiveTextFilter from '../__examples__/assistive-text';

test('Filter Base Snapshot', () => {
	const domTree = toJson(shallow(<Default />));
	expect(domTree).toMatchSnapshot();
});

test('NewFilter Base Snapshot', () => {
	const domTree = toJson(shallow(<NewFilter />));
	expect(domTree).toMatchSnapshot();
});

test('LockedFilter Base Snapshot', () => {
	const domTree = toJson(shallow(<LockedFilter />));
	expect(domTree).toMatchSnapshot();
});

test('Permanant Filter Base Snapshot', () => {
	const domTree = toJson(shallow(<PermanantFilter />));
	expect(domTree).toMatchSnapshot();
});

test('Error Filter Base Snapshot', () => {
	const domTree = toJson(shallow(<ErrorFilter />));
	expect(domTree).toMatchSnapshot();
});

test('AssistiveText Filter', () => {
	const domTree = toJson(shallow(<AssistiveTextFilter />));
	expect(domTree).toMatchSnapshot();
});

test('Filter Base with custom className Snapshot', () => {
	expect(
		renderMarkup(Default, { className: 'MY_CUSTOM_CLASS_NAME' })
	).toMatchSnapshot();
});

test('AssistiveText Filter HTML Snapshot', () => {
	expect(renderMarkup(Default)).toMatchSnapshot();
});
