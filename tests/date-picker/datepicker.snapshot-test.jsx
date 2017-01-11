/* eslint-env jest */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import renderer from 'react-test-renderer';
import jsBeautify from 'js-beautify';

import SnapshotDefault from '../../examples/date-picker/snapshot-default';

test('Datepicker Default DOM Snapshot', () => {
	const domTree = renderer.create(
		<SnapshotDefault />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Datepicker Default HTML Snapshot', () => {
	const domTree = String(
		jsBeautify.html(ReactDOMServer.renderToStaticMarkup(<SnapshotDefault />)),
		'utf-8'
	);
	expect(domTree).toMatchSnapshot();
});

const customProps = {
	align: 'right',
	abbreviatedWeekDayLabels: ['ONE', 'TWO', 'THR', 'FOU', 'FIV', 'SIX', 'SEV'],
	assistiveTextOpenCalendar: 'CUSTOM open Calendar',
	assistiveTextNextMonth: 'CUSTOM next month',
	assistiveTextPreviousMonth: 'CUSTOM previous month',
	className: 'CUSTOM-CLASSNAME',
	formatter () {
		return 'Llama and Lamb\'s epiphany of love';
	},
	id: 'CUSTOM-ID',
	monthLabels: [
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
	parser () {
		return new Date(2007, 0, 6);
	},
	placeholder: 'SWIPE RIGHT :-)',
	relativeYearFrom: -10,
	relativeYearTo: 10,
	todayLabel: 'TODAY YOU ARE YOU!',
	triggerClassName: 'CUSTOM-TRIGGER-CLASSNAME',
	weekDayLabels: [
		'Day 1',
		'Day 2',
		'Day 3',
		'Day 4',
		'Day 5',
		'Day 6',
		'Day 7'
	]
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
	const domTree = renderer.create(
		<SnapshotDefault
			{...customProps}
		/>,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});

test(`Datepicker
	isIsoWeekday
	DOM Snapshot`, () => {
	const domTree = renderer.create(
		<SnapshotDefault
			isIsoWeekday
		/>,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});

