/* eslint-env jest */
import { testDOMandHTML } from '../../../tests/snapshot-helpers';

import Info from '../__examples__/info';
import Warning from '../__examples__/warning';
import ErrorAlert from '../__examples__/error';
import ErrorWithDetailsAlert from '../__examples__/error-with-details';
import Success from '../__examples__/success';
import CustomClassNames from '../__examples__/custom-class-name';

import { TOAST } from '../../../utilities/constants';

testDOMandHTML({
	name: 'Info',
	test,
	Component: Info,
	ComponentKind: TOAST
});

testDOMandHTML({
	name: 'Warning',
	test,
	Component: Warning,
	ComponentKind: TOAST
});

testDOMandHTML({
	name: 'Error',
	test,
	Component: ErrorAlert,
	ComponentKind: TOAST
});

testDOMandHTML({
	name: 'Error With details',
	test,
	Component: ErrorWithDetailsAlert,
	ComponentKind: TOAST
});

testDOMandHTML({
	name: 'Success',
	test,
	Component: Success,
	ComponentKind: TOAST
});

testDOMandHTML({
	name: 'Custom Class Name',
	test,
	Component: CustomClassNames,
	ComponentKind: TOAST
});
