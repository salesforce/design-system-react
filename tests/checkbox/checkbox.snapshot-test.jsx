import React from 'react';
import ReactDOMServer from 'react-dom/server';
import renderer from 'react-test-renderer';
import jsBeautify from 'js-beautify';

import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import CheckboxBase from '../../examples/forms/checkbox/snapshot-base';
import CheckboxToggle from '../../examples/forms/checkbox/snapshot-toggle';


test('Checkbox Base DOM Snapshot', () => {
	const domTree = renderer.create(
		<CheckboxBase />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});


test('Checkbox Base HTML Snapshot', () => {
	const domTree = String(
		jsBeautify.html(ReactDOMServer.renderToStaticMarkup(<CheckboxBase />), { indent_size: 2 }),
		'utf-8'
	);
	expect(domTree).toMatchSnapshot();
});

test('Checkbox Toggle DOM Snapshot', () => {
	const domTree = renderer.create(
		<CheckboxToggle />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});


test('Checkbox Toggle HTML Snapshot', () => {
	const domTree = String(
		jsBeautify.html(ReactDOMServer.renderToStaticMarkup(<CheckboxToggle />), { indent_size: 2 }),
		'utf-8'
	);
	expect(domTree).toMatchSnapshot();
});

