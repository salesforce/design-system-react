/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ReactDOMServer from 'react-dom/server';
import jsBeautify from 'js-beautify';

import PanelFiltering from '../__examples__/filtering';

test('Panel Filtering Default Snapshot', () => {
	const domTree = toJson(shallow(<PanelFiltering />));
	expect(domTree).toMatchSnapshot();
});

test('Panel Filtering Default HTML Snapshot', () => {
	const domTree = String(
		jsBeautify.html(ReactDOMServer.renderToStaticMarkup(<PanelFiltering />), {
			indent_size: 2,
		}),
		'utf-8'
	);
	expect(domTree).toMatchSnapshot();
});
