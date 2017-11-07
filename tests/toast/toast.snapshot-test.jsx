/* eslint-env jest */
import { testDOMandHTML } from '../snapshot-helpers';

import Info from '../../examples/toast/info';
import Warning from '../../examples/toast/warning';
import ErrorAlert from '../../examples/toast/error';
import ErrorWithDetailsAlert from '../../examples/toast/error-with-details';
import Success from '../../examples/toast/success';
import CustomClassNames from '../../examples/toast/custom-class-name';

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
	name: 'Alert Error With details',
	test,
	Component: ErrorWithDetailsAlert
});

testDOMandHTML({
	name: 'Alert Success',
	test,
	Component: Success
});

testDOMandHTML({
	name: 'Alert Custom Class Name',
	test,
	Component: CustomClassNames
});
