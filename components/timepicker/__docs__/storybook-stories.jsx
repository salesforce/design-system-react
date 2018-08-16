/* eslint-disable indent */

import React from 'react';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../icon-settings';

import { TIMEPICKER } from '../../../utilities/constants';
import TimePicker from '../../timepicker';

const getTimePicker = (props) => <TimePicker {...props} />;

storiesOf(TIMEPICKER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () =>
		getTimePicker({
			label: 'Time',
			required: true,
			stepInMinutes: 30,
			onChange: action('onChange'),
			onSelect: action('onSelect'),
			onRequestRemoveSelectedOption: action('onRequestRemoveSelectedOption'),
			placeholder: 'Pick a time',
			disabled: false,
		})
	)
	.add('Disabled', () =>
		getTimePicker({
			label: 'Time',
			required: true,
			stepInMinutes: 30,
			onChange: action('onChange'),
			onSelect: action('onSelect'),
			onRequestRemoveSelectedOption: action('onRequestRemoveSelectedOption'),
			placeholder: 'Pick a time',
			disabled: true,
		})
	);
