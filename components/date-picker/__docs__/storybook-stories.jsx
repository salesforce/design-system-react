import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../icon-settings';

import Datepicker from '../../date-picker';
import { DATE_PICKER } from '../../../utilities/constants';

import Default from '../__examples__/default';
import IsoWeekdays from '../__examples__/iso-weekday';
import CustomInput from '../__examples__/custom-input';
import SnaphotDefault from '../__examples__/snapshot-default';
import WeekdayPicker from '../__examples__/weekday-picker';
import ErrorPicker from '../__examples__/error-picker';

// eslint-disable-next-line camelcase
import UNSAFE_DirectionSettings from '../../utilities/UNSAFE_direction';

const makeRtl = (component) => (
	// eslint-disable-next-line
	<UNSAFE_DirectionSettings.Provider value="rtl">
		<div dir="rtl">{component}</div>
	</UNSAFE_DirectionSettings.Provider>
);

storiesOf(DATE_PICKER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Default', () => <Default action={action} />)
	.add('Default - Right to Left (RTL)', () =>
		makeRtl(<Default action={action} />)
	)
	.add('ISO weekdays', () => <IsoWeekdays action={action} />)
	.add('Custom Input', () => <CustomInput action={action} />)
	.add('Inline menu', () => (
		<Datepicker
			labels={{
				label: 'Date',
			}}
			menuPosition="relative"
			formatter={(date) => {
				return date ? moment(date).format('M/D/YYYY') : '';
			}}
			parser={(dateString) => {
				return moment(dateString, 'MM-DD-YYYY').toDate();
			}}
		/>
	))
	.add('DOM Snapshot', () => <SnaphotDefault />)
	.add('Weekday picker', () => <WeekdayPicker />)
	.add('Error', () => <ErrorPicker />);
