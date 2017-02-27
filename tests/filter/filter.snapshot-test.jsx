import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Default from '../../examples/filter/default';
import NewFilter from '../../examples/filter/new';
import LockedFilter from '../../examples/filter/locked';
import PermanantFilter from '../../examples/filter/permanant';
import ErrorFilter from '../../examples/filter/error';

test('Filter Base Snapshot', () => {
	const domTree = toJson(shallow(
		<Default />
	));
	expect(domTree).toMatchSnapshot();
});

test('NewFilter Base Snapshot', () => {
	const domTree = toJson(shallow(
		<NewFilter />
	));
	expect(domTree).toMatchSnapshot();
});

test('LockedFilter Base Snapshot', () => {
	const domTree = toJson(shallow(
		<LockedFilter />
	));
	expect(domTree).toMatchSnapshot();
});

test('Permanant Filter Base Snapshot', () => {
	const domTree = toJson(shallow(
		<PermanantFilter />
	));
	expect(domTree).toMatchSnapshot();
});

test('Error Filter Base Snapshot', () => {
	const domTree = toJson(shallow(
		<ErrorFilter />
	));
	expect(domTree).toMatchSnapshot();
});
