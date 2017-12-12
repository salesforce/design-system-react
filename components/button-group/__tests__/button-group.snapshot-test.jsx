import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { testDOMandHTML } from '../../../tests/snapshot-helpers';

import IconGroup from '../__examples__/icon-group';
import MoreIcon from '../__examples__/more-icon';
import Checkbox from '../__examples__/checkbox';
import CheckboxError from '../__examples__/checkbox-error';

import { BUTTON_GROUP } from '../../../utilities/constants';

testDOMandHTML({
	name: 'Icon Group',
	test,
	Component: IconGroup,
	ComponentKind: BUTTON_GROUP
});

testDOMandHTML({
	name: 'More Icon',
	test,
	Component: MoreIcon,
	ComponentKind: BUTTON_GROUP
});

testDOMandHTML({
	name: 'Checkbox',
	test,
	Component: Checkbox,
	ComponentKind: BUTTON_GROUP
});

testDOMandHTML({
	name: 'Checkbox Error',
	test,
	Component: CheckboxError,
	ComponentKind: BUTTON_GROUP
});
