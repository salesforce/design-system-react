import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { testDOMandHTML } from '../../../tests/snapshot-helpers';

import IconGroup from '../__examples__/icon-group';
import MoreIcon from '../__examples__/more-icon';
import Checkbox from '../__examples__/checkbox';
import CheckboxError from '../__examples__/checkbox-error';

testDOMandHTML({
	name: 'Button Group IconGroup',
	test,
	Component: IconGroup,
});

testDOMandHTML({
	name: 'Button Group MoreIcon',
	test,
	Component: MoreIcon,
});

testDOMandHTML({
	name: 'Button Group Checkbox',
	test,
	Component: Checkbox,
});

testDOMandHTML({
	name: 'Button Group Checkbox Error',
	test,
	Component: CheckboxError,
});
