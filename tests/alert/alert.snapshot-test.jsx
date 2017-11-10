/* eslint-env jest */
import { testDOMandHTML } from '../snapshot-helpers';

import Info from '../../examples/alert/info';
import Warning from '../../examples/alert/warning';
import ErrorAlert from '../../examples/alert/error';
import Offline from '../../examples/alert/offline';
import Dismissable from '../../examples/alert/dismissable';
import CustomClassNames from '../../examples/alert/custom-class-name';

testDOMandHTML({
	name: 'Alert Info',
	test,
	Component: Info
});

testDOMandHTML({
	name: 'Alert Warning',
	test,
	Component: Warning
});

testDOMandHTML({
	name: 'Alert Error',
	test,
	Component: ErrorAlert
});

testDOMandHTML({
	name: 'Alert Offline',
	test,
	Component: Offline
});

testDOMandHTML({
	name: 'Alert Dismissable',
	test,
	Component: Dismissable
});

testDOMandHTML({
	name: 'Alert Custom Class Name',
	test,
	Component: CustomClassNames
});
