/* eslint-env jest */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import renderer from 'react-test-renderer';
import jsBeautify from 'js-beautify';

import SnapshotDefault from '../../examples/date-picker/snapshot-default';

test('Datepicker Default DOM Snapshot', () => {
	const domTree = renderer.create(
		<SnapshotDefault />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Datepicker Default HTML Snapshot', () => {
	const domTree = String(
		jsBeautify.html(ReactDOMServer.renderToStaticMarkup(<SnapshotDefault />)),
		'utf-8'
	);
	expect(domTree).toMatchSnapshot();
});
