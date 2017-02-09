/* eslint-env jest */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import renderer from 'react-test-renderer';
import jsBeautify from 'js-beautify';

import SnapshotDefault from '../../examples/navigation/snapshot-default';

test('Navigation Default DOM Snapshot', () => {
	const domTree = renderer.create(
		<SnapshotDefault />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Navigation Default HTML Snapshot', () => {
	const domTree = String(
		jsBeautify.html(ReactDOMServer.renderToStaticMarkup(<SnapshotDefault />)),
		'utf-8'
	);
	expect(domTree).toMatchSnapshot();
});

const customProps = {
	className: 'CUSTOM-CLASSNAME',
	id: 'CUSTOM-ID',
	variant: 'shade',
	selectedId: 'all_reports'
};

test(`Navigation
		className,
		id,
		variant
	DOM Snapshot`, () => {
	const domTree = renderer.create(
		<SnapshotDefault
			{...customProps}
		/>,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});
