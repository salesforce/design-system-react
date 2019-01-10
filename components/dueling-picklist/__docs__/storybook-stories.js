import React from 'react';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../icon-settings';

import DuelingPicklist from '../../dueling-picklist';
import { DUELING_PICKLIST } from '../../../utilities/constants';

import Default from '../__examples__/default';

storiesOf(DUELING_PICKLIST, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Default', () => <Default action={action} />)
