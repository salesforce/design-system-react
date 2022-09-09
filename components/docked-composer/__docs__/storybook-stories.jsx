import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../icon-settings';
import { DOCKED_COMPOSER } from '../../../utilities/constants';

import Example from '../__examples__/base';
import Minimized from '../__examples__/minimized';

storiesOf(DOCKED_COMPOSER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Default', () => <Example action={action} />)
	.add('Minimized', () => <Minimized action={action} />);
