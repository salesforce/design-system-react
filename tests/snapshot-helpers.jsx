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

const testDOMandHTML = (Component, props) => {
	expect(renderDOM(Component, props)).toMatchSnapshot();
	expect(renderMarkup(Component, props)).toMatchSnapshot();
};

/*
 * Utilizes jest-image-snapshot to do a visual comparison of current with previous version
 */
const testImageSnapshot = (name, ComponentKind) =>
	new Promise((resolve, reject) => {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;

		const url = `http://localhost:9001/?selectedKind=${encodeURIComponent(name)}&selectedStory=${encodeURIComponent(ComponentKind)}&full=0&down=1&left=1&panelRight=0&downPanel=storybook%2Factions%2Factions-panel`;

		const customConfig = { threshold: 1 };
		const chrome = new Chrome();
		chrome.goto(url)
			.then(() => chrome.screenshot())
			.then((image) => expect(image).toMatchImageSnapshot({
				customDiffConfig: customConfig
			}))
			.then(() => chrome.done())
			.then(() => resolve(true))
			.catch((err) => reject(err));
	});

export {
	renderDOM,
	renderMarkup,
	testDOMandHTML,
	testImageSnapshot
};
