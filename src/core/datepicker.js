// # Datepicker Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

// Traits
import Disableable from '../traits/disableable';
import Openable from '../traits/openable';
import Multiselectable from '../traits/multiselectable';
import Positionable from '../traits/positionable';

export const CONTROL = 'Datepicker';

const DatepickerCore = Lib.merge({}, Base, Disableable, Openable, Multiselectable, Positionable, {
	CONTROL,
	
	// CSS classes used within this control
	cssClasses: {
		CONTROL: 'slds-datepicker',
		WRAPPER: 'slds-datepicker-form'
	},

	_defaultProperties: {
		inputLabel: null,
		dateSelected: null,
		multiSelect: false,
		dateRange: [new Date('1991'), new Date('2030')],
		positionedOffset: 4,
		positionedTargetHorizontalAttachment: 'left',
		positionedTargetVerticalAttachment: 'bottom'
	},

	_defaultState: {
		dateViewing: new Date()
	},

	_monthNames: [
		'January', 'February', 'March', 'April', 'May', 'June', 'July',
		'August', 'September', 'October', 'November', 'December'
	],

	// ### Accessors
	// These may be supplied in the options hash / properties to override default behavior. All accessors take 'item' as their first properties, which is an object from the collection wrapped in an item adapter.
	accessors: {
		// Return the date
		getDate (item) {
			return item.get('date');
		},
		
		getKey (item) {
			return item.getDate().getTime();
		}
	},

	// TODO: Clean up all this logic. In particular, we shuld probably be setting every date in the selection, not just the first and last dates
	_getCalendarData: function (baseDate) {
		const date = this.getState('dateViewing') || baseDate;
		const selectedDates = this._getDataAdapter(this.getProperty('selection'));
		const isRangeSelect = this.getProperty('multiSelect') && selectedDates.length() > 1;
		const dateConstraints = this.getProperty('dateRange');
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
		let dateCurrentLoop;
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

				if ( MonthData[wk][dy].date.getTime() < dateConstraints[0].getTime() || MonthData[wk][dy].date.getTime() > dateConstraints[1].getTime() ) {
					MonthData[wk][dy].outside = true;
				}

				if (selectedDates.length() && !MonthData[wk][dy].outside) {
					dateCurrentLoop = MonthData[wk][dy].date.getTime();

					if (!isRangeSelect && dateCurrentLoop === selectedDates.at(0).date.getTime()) {
						MonthData[wk][dy].selected = true;
					} else if (isRangeSelect && dateCurrentLoop >= selectedDates.at(0).date.getTime() && dateCurrentLoop <= selectedDates.at(1).date.getTime() ) {
						MonthData[wk][dy].selected = true;
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
		const dateRange = this.getProperty('dateRange');
		const viewingYear = this._getYear();
		const allDates = [];
		let selDate;
		let curDate;

		for (curDate = dateRange[0].getFullYear(); curDate <= dateRange[1].getFullYear(); curDate++) {
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
		const selectedDates = this._getDataAdapter(this.getProperty('selection'));
		let formattedDate;

		if (selectedDates.length()) {
			if (selectedDates.length() > 1) {
				formattedDate = (selectedDates.at(0).date.getMonth() + 1) + '/' + selectedDates.at(0).date.getDate() + '/' + selectedDates.at(0).date.getFullYear();
				formattedDate += ' - ' + (selectedDates.at(1).date.getMonth() + 1) + '/' + selectedDates.at(1).date.getDate() + '/' + selectedDates.at(1).date.getFullYear();
			} else {
				formattedDate = (selectedDates.at(0).date.getMonth() + 1) + '/' + selectedDates.at(0).date.getDate() + '/' + selectedDates.at(0).date.getFullYear();
			}
		}

		return formattedDate;
	},

	_validateDateInput: function (input) {
		let inputDate;
		let splitString;
		let hasAppropriateSpacers;
		let hasAppropriateLength;
		let validDate;

		if (this.getProperty('multiSelect')) {
			hasAppropriateLength = input.length >= 21 && input.length <= 23;
			splitString = input.split('-');

			if (hasAppropriateLength && splitString.length === 2) {
				inputDate = [new Date(splitString[0]), new Date(splitString[1])];
				validDate = [
					Lib.isValidDate(inputDate[0]) && this._isWithinDateRange(inputDate[0]) ? inputDate[0] : false,
					Lib.isValidDate(inputDate[1]) && this._isWithinDateRange(inputDate[1]) ? inputDate[1] : false
				];
				validDate = validDate[0] && validDate[1] ? validDate : false;
			}
		} else {
			inputDate = new Date(input);
			hasAppropriateSpacers = input.match(/\//g) || input.match(/\-/g);
			hasAppropriateLength = input.length >= 8 && input.length <= 10;

			validDate = (Lib.isValidDate(input) && this._isWithinDateRange(inputDate) && hasAppropriateSpacers && hasAppropriateLength) ? inputDate : false;
		}

		return validDate;
	},

	_isWithinDateRange: function (date) {
		const dateRange = this.getProperty('dateRange');

		return date.getTime() >= dateRange[0] && date.getTime() <= dateRange[1];
	},

	_roundDate: function (date) {
		return new Date(date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear());
	}

});

export default DatepickerCore;
