import React from 'react';
import renderer from 'react-test-renderer';

import BreadcrumbBase from '../../examples/breadcrumb/base';

test('Breadcrumb Base Snapshot', () => {
	const domTree = renderer.create(
		<BreadcrumbBase />
	).toJSON();
	expect(domTree).toMatchSnapshot();
});
