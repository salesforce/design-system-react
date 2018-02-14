import React from 'react';
import ReactDOMServer from 'react-dom/server';
import jsBeautify from 'js-beautify';
import renderer from 'react-test-renderer';
import Settings from './settings';
/*
 * Render React components to DOM state as a String
 *
 * Please note, Component is the non-JSX component object.
 */

const renderDOM = (Component, props) =>
	renderer.create(React.createElement(Component, props), null).toJSON();

/*
 * Render React components to markup in order to compare to a Jest Snapshot.
 *
 * Please note, Component is the non-JSX component object.
 */

const renderMarkup = (Component, props) =>
	String(
		jsBeautify.html(
			ReactDOMServer.renderToStaticMarkup(
				React.createElement(Component, props)
			),
			Settings.jsBeautify
		),
		'utf-8'
	);

const testDOMandHTML = ({ name, test, Component, props }) => {
	test(`${name} DOM Snapshot`, () => {
		expect(renderDOM(Component, props)).toMatchSnapshot();
	});

	test(`${name} HTML Snapshot`, () => {
		expect(renderMarkup(Component, props)).toMatchSnapshot();
	});
};

// eslint-disable-line import/prefer-default-export
// eslint-disable-line import/prefer-default-export
// eslint-disable-line import/prefer-default-export
export { renderDOM, renderMarkup, testDOMandHTML };
