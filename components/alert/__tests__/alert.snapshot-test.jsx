/* eslint-env jest */
import { testDOMandHTML } from '../../../tests/snapshot-helpers';

import Info from '../__examples__/info';
import Warning from '../__examples__/warning';
import ErrorAlert from '../__examples__/error';
import Offline from '../__examples__/offline';
import Dismissable from '../__examples__/dismissable';
import CustomClassNames from '../__examples__/custom-class-name';

import { ALERT } from '../../../utilities/constants';


testDOMandHTML({
	name: 'Alert Info',
	test,
	Component: Info,
	ComponentKind: ALERT
});

testDOMandHTML({
	name: 'Alert Warning',
	test,
	Component: Warning,
	ComponentKind: ALERT
});

testDOMandHTML({
	name: 'Alert Error',
	test,
	Component: ErrorAlert,
	ComponentKind: ALERT
});

testDOMandHTML({
	name: 'Alert Offline',
	test,
	Component: Offline,
	ComponentKind: ALERT
});

testDOMandHTML({
	name: 'Alert Dismissable',
	test,
	Component: Dismissable,
	ComponentKind: ALERT
});

testDOMandHTML({
	name: 'Alert Custom Class Name',
	test,
	Component: CustomClassNames,
	ComponentKind: ALERT
});
