/* eslint-env jest */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import renderer from 'react-test-renderer';
import jsBeautify from 'js-beautify';

import SnapshotDefault from '../__examples__/snapshot-default';

test('MenuPicklist Default DOM Snapshot', () => {
	const domTree = renderer
		.create(<SnapshotDefault silenceDeprecationWarning />)
		.toJSON();
	expect(domTree).toMatchSnapshot();
});

test('MenuPicklist Default HTML Snapshot', () => {
	const domTree = String(
		jsBeautify.html(
			ReactDOMServer.renderToStaticMarkup(
				<SnapshotDefault silenceDeprecationWarning />
			),
			{}
		)
	);
	expect(domTree).toMatchSnapshot();
});

test(`MenuPicklist
	errorText
	DOM Snapshot`, () => {
	const domTree = renderer
		.create(
			<SnapshotDefault
				errorText="This field is required."
				required
				silenceDeprecationWarning
			/>
		)
		.toJSON();
	expect(domTree).toMatchSnapshot();
});
