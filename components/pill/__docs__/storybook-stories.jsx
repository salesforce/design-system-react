import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { PILL } from '~/utilities/constants';
import IconSettings from '~/components/icon-settings';
import BaseExample from '../__examples__/base';
import IconExample from '../__examples__/icon';
import ContainerExample from '../__examples__/container';
import BarePillListboxExample from '../__examples__/listbox-bare';
import ListboxExample from '../__examples__/listbox';
import IconListboxExample from '../__examples__/listbox-icon';
import AvatarListboxExample from '../__examples__/listbox-avatar';

storiesOf(PILL, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Linked, Unlinked, Truncated', () => <BaseExample action={action} />)
	.add('Icon, Avatar, Error', () => <IconExample action={action} />)
	.add('Bare', () => <BarePillListboxExample action={action} />)
	.add('Pill Container', () => <ContainerExample action={action} />)
	.add('Listbox Of Pill Options', () => <ListboxExample action={action} />)
	.add('Listbox Of Pill Options With Icon', () => (
		<IconListboxExample action={action} />
	))
	.add('Listbox Of Pill Options With Avatar', () => (
		<AvatarListboxExample action={action} />
	));
