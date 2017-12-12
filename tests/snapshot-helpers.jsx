import React from 'react';
import ReactDOMServer from 'react-dom/server';
import jsBeautify from 'js-beautify';
import Settings from './settings';
import renderer from 'react-test-renderer';

const { Chrome } = require('navalia');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

/*
 * Render React components to DOM state as a String
 *
 * Please note, Component is the non-JSX component object.
 */

const renderDOM = (Component, props) => renderer.create(React.createElement(Component, props), null).toJSON();

/*
 * Render React components to markup in order to compare to a Jest Snapshot.
 *
 * Please note, Component is the non-JSX component object.
 */

const renderMarkup = (Component, props) => String(
		jsBeautify.html(ReactDOMServer.renderToStaticMarkup(React.createElement(Component, props)),
			Settings.jsBeautify),
	'utf-8'
	);

const testDOMandHTML = ({ name, test, Component, ComponentKind }) => {
	test(`${name} DOM Snapshot`, () => {
		expect(renderDOM(Component)).toMatchSnapshot();
	});

	test(`${name} HTML Snapshot`, () => {
		expect(renderMarkup(Component)).toMatchSnapshot();
	});

	describe(`${name} Visual Snapshot`, () => {
		if (ComponentKind === undefined) {
			return;
		}

		let chrome = null;

		beforeEach(() => {
			jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
			chrome = new Chrome();
		});

		afterEach(() => {
			chrome.done();
		});

		const url = `http://localhost:9001/?selectedKind=${encodeURIComponent(ComponentKind)}&selectedStory=${encodeURIComponent(name)}&full=0&down=1&left=1&panelRight=0&downPanel=storybook%2Factions%2Factions-panel`;
		console.log('url', url);
		it('should still look the same', () =>
			chrome.goto(url)
				.then(() => chrome.screenshot())
				.then((image) => expect(image).toMatchImageSnapshot())
		);
	});
};

export {
	renderDOM, // eslint-disable-line import/prefer-default-export
	renderMarkup, // eslint-disable-line import/prefer-default-export
	testDOMandHTML // eslint-disable-line import/prefer-default-export
};
