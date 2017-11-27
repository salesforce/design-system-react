import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { testDOMandHTML } from '../snapshot-helpers';

import IconGroup from '../../examples/button-group/icon-group';
import MoreIcon from '../../examples/button-group/more-icon';
import Checkbox from '../../examples/button-group/checkbox';
import CheckboxError from '../../examples/button-group/checkbox-error';

testDOMandHTML({
	name: 'Button Group IconGroup',
	test,
	Component: IconGroup
});

testDOMandHTML({
	name: 'Button Group MoreIcon',
	test,
	Component: MoreIcon
});

testDOMandHTML({
	name: 'Button Group Checkbox',
	test,
	Component: Checkbox
});

testDOMandHTML({
	name: 'Button Group Checkbox Error',
	test,
	Component: CheckboxError
});
