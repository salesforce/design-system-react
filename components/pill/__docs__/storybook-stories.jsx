import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { PILL } from '../../../utilities/constants';
import IconSettings from '../../icon-settings';
import BaseExample from '../__examples__/base';
import IconExample from '../__examples__/icon';
import Snapshot from '../__examples__/snapshot';

storiesOf(PILL, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Linked, Unlinked, Truncated', () => <BaseExample action={action} />)
	.add('Icon, Avatar, Error', () => <IconExample action={action} />)
	.add('Docs site Snapshot', () => <Snapshot />);
