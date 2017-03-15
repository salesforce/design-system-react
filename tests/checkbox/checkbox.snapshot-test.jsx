import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import CheckboxBase from '../../examples/forms/checkbox/default';
import CheckboxToggle from '../../examples/forms/checkbox/toggle';
import CheckboxError from '../../examples/forms/checkbox/error';

test('Checkbox Base Snapshot', () => {
	const domTree = toJson(shallow(
		<CheckboxBase />
	));
	expect(domTree).toMatchSnapshot();
});

test('Checkbox Toggle Snapshot', () => {
	const domTree = toJson(shallow(
		<CheckboxToggle />
	));
	expect(domTree).toMatchSnapshot();
});

test('Checkbox Base (error) Snapshot', () => {
	const domTree = toJson(shallow(
		<CheckboxError />
	));
	expect(domTree).toMatchSnapshot();
});
