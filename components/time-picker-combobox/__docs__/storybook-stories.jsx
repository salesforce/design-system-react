/* eslint-disable indent */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../icon-settings';
import { TIME_PICKER_COMBOBOX } from '../../../utilities/constants';
import TimepickerCombobox from '../../time-picker-combobox';

import Default from '../__examples__/default';

const getTimepicker = (props) => <TimepickerCombobox {...props} />;
storiesOf(TIME_PICKER_COMBOBOX, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () => <Default />);
