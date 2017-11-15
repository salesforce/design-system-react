import React from 'react';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../components/icon-settings';

import Datepicker from '~/components/date-picker';
import { DATE_PICKER } from '../../utilities/constants';

import Default from './default';
import IsoWeekdays from './iso-weekday';
import CustomInput from './custom-input';
import SnaphotDefault from './snapshot-default';
import WeekdayPicker from './weekday-picker';

storiesOf(DATE_PICKER, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium"><IconSettings iconPath="/assets/icons">{getStory()}</IconSettings></div>)
	.add('Default', () => (<Default action={action} />))
	.add('ISO weekdays', () => (<IsoWeekdays action={action} />))
	.add('Custom Input', () => (<CustomInput action={action} />))
	.add('Inline menu', () => (<Datepicker 	menuPosition="relative" />))
	.add('DOM Snapshot', () => (<SnaphotDefault />))
	.add('Weekday picker', () => (<WeekdayPicker />));
