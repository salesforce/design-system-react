/* eslint-disable indent */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { DATE_PICKER } from '../../utilities/constants';
import Datepicker from '../../components/date-picker';

const getDatepicker = props => (
	<Datepicker {...props} />
);

storiesOf(DATE_PICKER, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => getDatepicker({ onDateChange: action('onDateChange') }))

