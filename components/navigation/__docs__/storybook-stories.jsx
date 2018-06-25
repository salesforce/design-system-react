import React from 'react';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../icon-settings';

import { NAVIGATION } from '../../../utilities/constants';

import Default from '../__examples__/default';
import Shade from '../__examples__/shade';
import SnaphotDefault from '../__examples__/snapshot-default';

storiesOf(NAVIGATION, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Default', () => <Default action={action} />)
	.add('Inverse', () => <Shade action={action} />)
	.add('DOM Snapshot', () => <SnaphotDefault />);
