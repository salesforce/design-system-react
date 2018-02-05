import React from 'react';
import renderer from 'react-test-renderer';
import { renderMarkup } from '../../../tests/snapshot-helpers';

import SnapshotDefault from '../__examples__/snapshot-default';

test('Navigation Default DOM Snapshot', () => {
	const domTree = renderer.create(<SnapshotDefault />).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Navigation Default HTML Snapshot', () => {
	expect(renderMarkup(SnapshotDefault)).toMatchSnapshot();
});

const customProps = {
	className: 'CUSTOM-CLASSNAME',
	id: 'CUSTOM-ID',
	variant: 'shade',
	selectedId: 'all_reports',
};

test(`Navigation
		className,
		id,
		variant
	DOM Snapshot`, () => {
	const domTree = renderer
		.create(<SnapshotDefault {...customProps} />)
		.toJSON();
	expect(domTree).toMatchSnapshot();
});
