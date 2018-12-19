import React from 'react';
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

storiesOf(DATE_PICKER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Default', () => <Default action={action} />)
	.add('ISO weekdays', () => <IsoWeekdays action={action} />)
	.add('Custom Input', () => <CustomInput action={action} />)
	.add('Inline menu', () => <Datepicker menuPosition="relative" />)
	.add('DOM Snapshot', () => <SnaphotDefault />)
	.add('Weekday picker', () => <WeekdayPicker />);
