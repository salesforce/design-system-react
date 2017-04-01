import React from 'react';
import ReactDOMServer from 'react-dom/server';
import jsBeautify from 'js-beautify';
import * as Settings from './settings';

/*
 * Render React components to markup in order to compare to a Jest Snapshot. Enzyme render with an actual DOM is needed for components that use <Dialog /> and portal mounts.
 *
 * Please note, Component is the non-JSX component object.
 */

const renderMarkup = (Component, props) => String(
		jsBeautify.html(ReactDOMServer.renderToStaticMarkup(React.createElement(Component, props)),
			Settings.default.jsBeautify),
	'utf-8'
	);

export {
	renderMarkup // eslint-disable-line import/prefer-default-export
};
