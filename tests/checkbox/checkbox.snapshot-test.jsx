import React from 'react';
import ReactDOMServer from 'react-dom/server';
import renderer from 'react-test-renderer';
import jsBeautify from 'js-beautify';

import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import CheckboxBase from '../../examples/forms/checkbox/default';
import CheckboxToggle from '../../examples/forms/checkbox/toggle';
import CheckboxError from '../../examples/forms/checkbox/error';


test('Checkbox Base DOM Snapshot', () => {
	const domTree = renderer.create(
		<CheckboxBase />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});


test('Checkbox Base HTML Snapshot', () => {
	const domTree = String(
		jsBeautify.html(ReactDOMServer.renderToStaticMarkup(<CheckboxBase />), {}),
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
		jsBeautify.html(ReactDOMServer.renderToStaticMarkup(<CheckboxToggle />), {}),
		'utf-8'
	);
	expect(domTree).toMatchSnapshot();
});

