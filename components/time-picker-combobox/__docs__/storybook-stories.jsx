/* eslint-disable indent */
import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '../../icon-settings';
import { TIME_PICKER_COMBOBOX } from '../../../utilities/constants';

import Default from '../__examples__/default';

storiesOf(TIME_PICKER_COMBOBOX, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () => <Default />);
