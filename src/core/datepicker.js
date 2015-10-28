// DATEPICKER CORE

import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import Disableable from '../traits/disableable';
import Multiselectable from '../traits/multiselectable';

export const CONTROL = 'datepicker';

const DatepickerCore = Lib.merge({}, Base, Disableable, Multiselectable, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL,
		WRAPPER: 'slds-datepicker-form'
	},

	_defaultProperties: {

	},

	_defaultState: {
		selectedDate: null,
		dateViewing: new Date()
	},

	_monthNames: [
		'January', 'February', 'March', 'April', 'May', 'June', 'July',
		'August', 'September', 'October', 'November', 'December'
	],

	accessors: {
		getDate (item) {
			return item.get('date');
		}
	},

	_getCalendarData: function (baseDate) {
		const date = this.getState('dateViewing') || baseDate;
		const selectedDates = this.getSelectedItems();
		const selectedDate = selectedDates[0] ? selectedDates[0].date : null;// TODO: multi day select

		const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // Index of first day base 0 sunday
		const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); // Date of the last day
		const lastMonthDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate(); // Last date for previous month
		const month = date.getMonth(); // Month of the date selected
		const year = date.getFullYear(); // Year of the date selected
		const now = new Date(); // Today Date
		const nowDate = now.getDate(); // Today Day
		const nowMonth = now.getMonth(); // Today Month
		const nowYear = now.getFullYear(); // Today Year
		const MonthData = [];
		let curDate;
		let rows;
		let wk;
		let dy;

		if (firstDay !== 0) {
			curDate = lastMonthDate - firstDay + 1;
		} else {
			curDate = 1;
		}

		rows = (lastDate <= (35 - firstDay)) ? 5 : 6;

		for (wk = 0; wk < rows; wk++) {
			MonthData.push([]);
			for (dy = 0; dy < 7; dy++) {
				MonthData[wk].push({
					day: curDate,
					month: month,
					year: year,
					date: new Date((month + 1) + '-' + curDate + '-' + year)
				});

				if (selectedDate && MonthData[wk][dy].date.getTime() === selectedDate.getTime()) {
					MonthData[wk][dy].selected = true;
				}

				if (wk === 0) {
					if (curDate === lastMonthDate) {
						curDate = 0;
						MonthData[wk][dy].month = month - 1;
						MonthData[wk][dy].outside = true;
					} else if (curDate > 7) {
						MonthData[wk][dy].month = month - 1;
						MonthData[wk][dy].outside = true;
					}
				} else if ( wk >= 4 ) {
					if (curDate === lastDate) {
						curDate = 0;
					} else if (curDate < 7) {
						MonthData[wk][dy].month = month + 1;
						MonthData[wk][dy].outside = true;
					}
				}

				MonthData[wk][dy].today = (year === nowYear && MonthData[wk][dy].month === nowMonth && curDate === nowDate);

				curDate++;
			}
		}

		return MonthData;
	},

	_getMonthName: function (baseDate) {
		const date = this.getState('dateViewing') || baseDate;
		const month = date.getMonth();

		return this._monthNames[month];
	},

	_getYear: function (baseDate) {
		const date = this.getState('dateViewing') || baseDate;

		return date.getFullYear();
	},

	_getYearRangeData: function () {
		const dateRange = [1990, 2025];
		const viewingYear = this._getYear();
		const allDates = [];
		let selDate;
		let curDate;

		for (curDate = dateRange[0]; curDate <= dateRange[1]; curDate++) {
			allDates.push({text: curDate, value: curDate });

			if (viewingYear === curDate) {
				selDate = {text: curDate, value: curDate };
			}
		}

		return {
			selected: selDate,
			all: allDates
		};
	},

	_formatDate: function () {
		const selectedDates = this._getSelectedItems();
		const selectedDate = selectedDates[0] ? selectedDates[0].date : null;// TODO: multi day select
		let formattedDate;

		if (selectedDate) {// TODO: custom date formatting
			formattedDate = (selectedDate.getMonth() + 1) + '/' + selectedDate.getDate() + '/' + selectedDate.getFullYear();
		}

		return formattedDate;
	}

});

export default DatepickerCore;
