/* eslint-disable indent */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { TIME_PICKER } from '../../utilities/constants';
import Timepicker from '../../components/time-picker';

const getTimepicker = props => (
	<Timepicker {...props} />
);

storiesOf(TIME_PICKER, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => getTimepicker({ label: 'Time', required: true, stepInMinutes: 30, onDateChange: action('onDateChange') }));
