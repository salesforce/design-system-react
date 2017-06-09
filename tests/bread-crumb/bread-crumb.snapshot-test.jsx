import React from 'react';
import renderer from 'react-test-renderer';

import BreadcrumbBase from '../../examples/breadcrumb/base';
import globalSettings from '../../components/settings';

globalSettings.setIconsPath('/assets/icons');

test('Breadcrumb Base Snapshot', () => {
	const domTree = renderer.create(
		<BreadcrumbBase />
	).toJSON();
	expect(domTree).toMatchSnapshot();
});
