/* eslint-disable indent */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { TIME_PICKER } from '../../utilities/constants';
import Timepicker from '../../components/time-picker';

const getTimepicker = props => (
	<Timepicker {...props} />
);

const handleDateChange = (date, inputStr) => {
  console.log('>>> onDateChange ', date, ' inputStr: ',inputStr);
}

storiesOf(TIME_PICKER, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => getTimepicker({ stepInMinutes: 30, onDateChange: handleDateChange }))

