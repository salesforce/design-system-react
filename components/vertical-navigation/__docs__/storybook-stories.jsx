import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../icon-settings';

import { VERTICAL_NAVIGATION } from '../../../utilities/constants';

import Compact from '../__examples__/compact';
import Default from '../__examples__/default';
import IconStory from '../__examples__/icon';
import Notification from '../__examples__/notification';
import Quickfind from '../__examples__/quickfind';
import Shaded from '../__examples__/shaded';
import SnaphotDefault from '../__examples__/snapshot-default';

storiesOf(VERTICAL_NAVIGATION, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Default', () => <Default action={action} />)
	.add('Compact', () => <Compact action={action} />)
	.add('IconStory', () => <IconStory action={action} />)
	.add('Notification', () => <Notification action={action} />)
	.add('Quickfind', () => <Quickfind action={action} />)
	.add('Shaded', () => <Shaded action={action} />)
	.add('DOM Snapshot', () => <SnaphotDefault />);
