/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import BreadCrumbBase from '../../examples/bread-crumb/base';

test('BreadCrumb Base Snapshot', () => {
	const domTree = renderer.create(
		<BreadCrumbBase />
	).toJSON();
	expect(domTree).toMatchSnapshot();
});
