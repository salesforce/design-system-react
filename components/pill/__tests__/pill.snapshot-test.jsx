/* eslint-env jest */
import React from 'react';
import { renderMarkup, testDOMandHTML } from '../../../tests/snapshot-helpers';

import BaseExample from '../__examples__/base';
import IconExample from '../__examples__/icon';
import ContainerExample from '../__examples__/container';
import BarePillListboxExample from '../__examples__/listbox-bare';
import ListboxExample from '../__examples__/listbox';
import IconListboxExample from '../__examples__/listbox-icon';
import AvatarListboxExample from '../__examples__/listbox-avatar';

testDOMandHTML({
	name: 'Linked, Unlinked, Truncated',
	test,
	Component: BaseExample,
});

testDOMandHTML({
	name: 'Icon, Avatar, Error',
	test,
	Component: IconExample,
});

testDOMandHTML({
	name: 'Bare',
	test,
	Component: BarePillListboxExample,
});

testDOMandHTML({
	name: 'Pill Container',
	test,
	Component: ContainerExample,
});

testDOMandHTML({
	name: 'Listbox Of Pill Options',
	test,
	Component: ListboxExample,
});

testDOMandHTML({
	name: 'Listbox Of Pill Options With Icon',
	test,
	Component: IconListboxExample,
});

testDOMandHTML({
	name: 'Listbox Of Pill Options With Avatar',
	test,
	Component: AvatarListboxExample,
});
