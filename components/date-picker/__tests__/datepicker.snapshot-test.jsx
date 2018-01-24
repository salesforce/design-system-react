/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import {
	renderMarkup,
	testDOMandHTML,
	testImageSnapshot
} from '../../../tests/snapshot-helpers';

import SnapshotDefault from '../__examples__/snapshot-default';

import { DATE_PICKER } from '../../../utilities/constants';

const customProps = {
	align: 'right',
	assistiveText: {
		openCalendar: 'CUSTOM open Calendar',
		nextMonth: 'CUSTOM next month',
		previousMonth: 'CUSTOM previous month'
	},
	className: 'CUSTOM-CLASSNAME',
	formatter () {
		return "Llama and Lamb's epiphany of love";
	},
	id: 'CUSTOM-ID',
	labels: {
		abbreviatedWeekDays: ['ONE', 'TWO', 'THR', 'FOU', 'FIV', 'SIX', 'SEV'],
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
			'MONTH 12'
		],
		placeholder: 'SWIPE RIGHT :-)',
		today: 'TODAY YOU ARE YOU!',
		weekDays: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']
	},
	parser () {
		return new Date(2007, 0, 6);
	},
	relativeYearFrom: -20,
	relativeYearTo: 20,
	triggerClassName: 'CUSTOM-TRIGGER-CLASSNAME'
};

describe(DATE_PICKER, () => {
	test('Base DOM & HTML Snapshots look the same', () => {
		testDOMandHTML(SnapshotDefault);
	});

	const customPropsTestName = `
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
DOM Snapshot looks the same`;
	test(customPropsTestName, () => {
		testDOMandHTML(SnapshotDefault, customProps);
	});

	const customIsIsoTestName = `
	isIsoWeekday
DOM Snapshot looks the same`;
	test(customIsIsoTestName, () => {
		testDOMandHTML(SnapshotDefault, { isIsoWeekday: true });
	});

	test('Default Image Snapshot looks the same', async () => {
		await testImageSnapshot(DATE_PICKER, 'Default');
	});

	test('ISO weekdays Image Snapshot looks the same', async () => {
		await testImageSnapshot(DATE_PICKER, 'ISO weekdays');
	});

	test('Custom Input Image Snapshot looks the same', async () => {
		await testImageSnapshot(DATE_PICKER, 'Custom Input');
	});
	test('Inline menu Image Snapshot looks the same', async () => {
		await testImageSnapshot(DATE_PICKER, 'Inline menu');
	});

	test('DOM Snapshot Image Snapshot looks the same', async () => {
		await testImageSnapshot(DATE_PICKER, 'DOM Snapshot');
	});

	test('Weekday picker Image Snapshot looks the same', async () => {
		await testImageSnapshot(DATE_PICKER, 'Weekday picker');
	});
});
