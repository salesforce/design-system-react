/* eslint-disable indent */

import React from 'react';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../icon-settings';

import { TIME_PICKER } from '../../../utilities/constants';
import Timepicker from '../../time-picker';

const getTimepicker = (props) => <Timepicker {...props} />;

storiesOf(TIME_PICKER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () =>
		getTimepicker({
			label: 'Time',
			required: true,
			stepInMinutes: 30,
			onDateChange: action('onDateChange'),
		})
	);
