/* eslint-env jest */
import { testDOMandHTML } from '../../../tests/snapshot-helpers';

import { BREADCRUMB } from '../../../utilities/constants';

import BreadcrumbBase from '../__examples__/base';

testDOMandHTML({
	name: '2 Items',
	test,
	Component: BreadcrumbBase,
	ComponentKind: BREADCRUMB
});

testDOMandHTML({
	name: '1 Item',
	test,
	Component: BreadcrumbBase,
	ComponentKind: BREADCRUMB
});
