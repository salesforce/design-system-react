/* eslint-env jest */
import { testDOMandHTML } from '../snapshot-helpers';

import Info from '../../examples/toast/info';
import Warning from '../../examples/toast/warning';
import ErrorAlert from '../../examples/toast/error';
import ErrorWithDetailsAlert from '../../examples/toast/error-with-details';
import Success from '../../examples/toast/success';
import CustomClassNames from '../../examples/toast/custom-class-name';

testDOMandHTML({
	name: 'Toast Info',
	test,
	Component: Info
});

testDOMandHTML({
	name: 'Toast Warning',
	test,
	Component: Warning
});

testDOMandHTML({
	name: 'Toast Error',
	test,
	Component: ErrorAlert
});

testDOMandHTML({
	name: 'Toast Error With details',
	test,
	Component: ErrorWithDetailsAlert
});

testDOMandHTML({
	name: 'Toast Success',
	test,
	Component: Success
});

testDOMandHTML({
	name: 'Toast Custom Class Name',
	test,
	Component: CustomClassNames
});
