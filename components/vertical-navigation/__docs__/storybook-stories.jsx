import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../icon-settings';

import { VERTICAL_NAVIGATION } from '../../../utilities/constants';

import Default from '../__examples__/default';
import IconExample from '../__examples__/icons';
import NotificationExample from '../__examples__/notifications';
import SnaphotDefault from '../__examples__/snapshot-default';

storiesOf(VERTICAL_NAVIGATION, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Default', () => <Default action={action} />)
	.add('With icons', () => <IconExample action={action} />)
	.add('With notifications', () => <NotificationExample action={action} />)
	.add('DOM Snapshot', () => <SnaphotDefault />);
