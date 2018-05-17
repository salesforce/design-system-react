/* eslint-env jest */
import { testDOMandHTML } from '../../../tests/snapshot-helpers';

import Info from '../__examples__/info';
import Warning from '../__examples__/warning';
import ErrorAlert from '../__examples__/error';
import ErrorWithDetailsAlert from '../__examples__/error-with-details';
import Success from '../__examples__/success';
import CustomClassNames from '../__examples__/custom-class-name';

testDOMandHTML({
	name: 'Toast Info',
	test,
	Component: Info,
});

testDOMandHTML({
	name: 'Toast Warning',
	test,
	Component: Warning,
});

testDOMandHTML({
	name: 'Toast Error',
	test,
	Component: ErrorAlert,
});

testDOMandHTML({
	name: 'Toast Error With details',
	test,
	Component: ErrorWithDetailsAlert,
});

testDOMandHTML({
	name: 'Toast Success',
	test,
	Component: Success,
});

testDOMandHTML({
	name: 'Toast Custom Class Name',
	test,
	Component: CustomClassNames,
});
