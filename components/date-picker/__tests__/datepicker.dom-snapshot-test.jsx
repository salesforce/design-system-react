/* eslint-env jest */
import React from 'react';
import moment from 'moment';
import renderer from 'react-test-renderer';
import { renderMarkup } from '../../../tests/snapshot-helpers';

import SnapshotDefault from '../__examples__/snapshot-default';

// eslint-disable-next-line camelcase
import UNSAFE_DirectionSettings from '../../utilities/UNSAFE_direction';

const makeRtl = (component) => (
	// eslint-disable-next-line
	<UNSAFE_DirectionSettings.Provider value="rtl">
		<div dir="rtl">{component}</div>
	</UNSAFE_DirectionSettings.Provider>
);

test('Datepicker Default DOM Snapshot', () => {
	const domTree = renderer.create(<SnapshotDefault />).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Datepicker Default HTML Snapshot', () => {
	expect(renderMarkup(SnapshotDefault)).toMatchSnapshot();
});

const customProps = {
	align: 'right',
	assistiveText: {
		openCalendar: 'CUSTOM open Calendar',
		nextMonth: 'CUSTOM next month',
		previousMonth: 'CUSTOM previous month',
	},
	className: 'CUSTOM-CLASSNAME',
	formatter() {
		return "Llama and Lamb's epiphany of love";
	},
	id: 'CUSTOM-ID',
	labels: {
		abbreviatedWeekDays: ['ONE', 'TWO', 'THR', 'FOU', 'FIV', 'SIX', 'SEV'],
		label: 'Date',
		months: [
			'MONTH 1',
			'MONTH 2',
			'MONTH 3',
			'MONTH 4',
			'MONTH 5',
			'MONTH 6',
			'MONTH 7',
			'MONTH 8',
			'MONTH 9',
			'MONTH 10',
			'MONTH 11',
			'MONTH 12',
		],
		placeholder: 'SWIPE RIGHT :-)',
		today: 'TODAY YOU ARE YOU!',
		weekDays: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
	},
	parser() {
		return moment('1/6/2007', 'MM-DD-YYYY').toDate();
	},
	relativeYearFrom: -20,
	relativeYearTo: 20,
	triggerClassName: 'CUSTOM-TRIGGER-CLASSNAME',
};

test(`Datepicker
		abbreviatedWeekDayLabels,
		assistiveTextNextMonth,
		assistiveTextOpenCalendar,
		assistiveTextPreviousMonth,
		align,
		className,
		formatter,
		monthLabels,
		placeholder,
		relativeYearFrom,
		relativeYearTo,
		todayLabel,
		triggerClassName,
		weekDayLabels
	DOM Snapshot`, () => {
	const domTree = renderer
		.create(<SnapshotDefault {...customProps} />)
		.toJSON();
	expect(domTree).toMatchSnapshot();
});

test(`Datepicker
	Right-to-Left (RTL)`, () => {
	const domTree = renderer
		.create(makeRtl(<SnapshotDefault {...customProps} />))
		.toJSON();
	expect(domTree).toMatchSnapshot();
});

test(`Datepicker
	isIsoWeekday
	DOM Snapshot`, () => {
	const domTree = renderer.create(<SnapshotDefault isIsoWeekday />).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('ErrorPicker', () => {
	const domTree = renderer.create(<SnapshotDefault hasError />).toJSON();
	expect(domTree).toMatchSnapshot();
});
