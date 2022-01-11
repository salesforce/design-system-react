/* eslint-disable indent */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../icon-settings';
import { TIME_PICKER } from '../../../utilities/constants';
import Timepicker from '../../time-picker';

import Default from '../__examples__/default';

const getTimepicker = (props) => <Timepicker {...props} />;
storiesOf(TIME_PICKER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
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
	)
	.add('Docs site Default', () => <Default />);
