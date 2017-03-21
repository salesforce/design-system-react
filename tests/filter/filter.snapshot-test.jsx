import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ReactDOMServer from 'react-dom/server';
import jsBeautify from 'js-beautify';

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

test('Filter Base with custom className Snapshot', () => {
	const domTree = String(
		jsBeautify.html(ReactDOMServer.renderToStaticMarkup(<Default className="MY_CUSTOM_CLASS_NAME" />), { indent_size: 2 }),
		'utf-8'
	);
	expect(domTree).toMatchSnapshot();
});
