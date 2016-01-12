// # Datepicker Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

export const CONTROL = 'Datepicker';

function addYears (years, currentDate) {
	const date = currentDate || new Date();
	
	date.setFullYear(date.getFullYear() + years);
	
	return date;
}

const DatepickerCore = Lib.merge({}, Base, {
	CONTROL,
	
	// CSS classes used within this control
	cssClasses: {
		CONTROL: 'slds-datepicker',
		WRAPPER: 'slds-datepicker-form'
	},

	_defaultProperties: {
		inputLabel: null,
		startDate: null,
		endDate: null,
		multiSelect: false,
		range: [addYears(-15), addYears(15)],

		// Positionable trait
		positionedTargetVerticalAttachment: 'bottom',
		constrainWidthToTarget: false,
		constrainPositionedToWindow: true,
		modalMenu: false,
		positionedOffset: 0,
		positionedTargetHorizontalAttachment: 'left',
		positionedZIndex: '10001',
		supportedCSSTransformKey: Lib.getSupportedCSSTransformKey()
	},

	_defaultState: {
		dateViewing: new Date()
	},

	_monthNames: [
		'January', 'February', 'March', 'April', 'May', 'June', 'July',
		'August', 'September', 'October', 'November', 'December'
	],
	
	_getRange () {
		const range = this.getProperty('range');
		
		return (range || []).map((val) => {
			return this._roundDate(val).getTime();
		});
	},
	
	_isDateInRange (date, dateRange) {
		if (!date) {
			return false;
		}
		const time = date.getTime();
		
		let range;
		if (!dateRange) {
			range = this._getRange();
		} else {
			range = dateRange;
		}
		
		let inRange = false;
		switch (range.length) {
			case 2:
				inRange = (time >= range[0] && time <= range[1]);
				break;
			case 1:
				inRange = (time === range[0]);
				break;
			default:
				break;
		}
		
		return inRange;
	},
	
	_getSelectionRange () {
		const range = [];
		const startDate = this.getProperty('startDate');
		const endDate = this.getProperty('endDate');
		
		if (startDate) {
			range.push(this._roundDate(startDate).getTime());
			
			if (this.getProperty('multiSelect') && endDate) {
				range.push(this._roundDate(endDate).getTime());
			}
		}
		
		return range;
	},
	
	_isDateSelected (date, selectionRange) {
		let range;
		if (!selectionRange) {
			range = this._getSelectionRange();
		} else {
			range = selectionRange;
		}
		
		return this._isDateInRange(date, range);
	},

	_getCalendarData (date) {
		const year = this._getYear(date); // Year of the date viewing
		const month = this._getMonth(date); // Month of the date viewing
		const firstDay = new Date(year, month, 1).getDay(); // Index of first day base 0 sunday
		const lastDate = new Date(year, month + 1, 0).getDate(); // Date of the last day
		const lastMonthDate = new Date(year, month, 0).getDate(); // Last date for previous month
		const range = this._getRange();
		const selection = this._getSelectionRange();

		// Today's Date
		const now = this._roundDate(new Date());

		let curDate;
		if (firstDay !== 0) {
			curDate = lastMonthDate - firstDay + 1;
		} else {
			curDate = 1;
		}

		const rows = (lastDate <= (35 - firstDay)) ? 5 : 6;
		const MonthData = [];

		for (let wk = 0; wk < rows; wk++) {
			const row = [];
			
			for (let dy = 0; dy < 7; dy++) {
				const cell = {
					day: curDate,
					month: month,
					year: year,
					date: new Date(year, month, curDate)
				};

				if (wk === 0) {
					if (curDate === lastMonthDate) {
						curDate = 0;
						cell.month = month - 1;
						cell.outside = true;
					} else if (curDate > 7) {
						cell.month = month - 1;
						cell.outside = true;
					}
				} else if ( wk >= 4 ) {
					if (curDate === lastDate) {
						curDate = 0;
					} else if (curDate < 7) {
						cell.month = month + 1;
						cell.outside = true;
					}
				}

				if (!cell.outside && !this._isDateInRange(cell.date, range)) {
					cell.outside = true;
				}
				
				if (!cell.outside && this._isDateSelected(cell.date, selection)) {
					cell.selected = true;
				}
				
				if (cell.date === now) {
					cell.today = true;
				}

				row.push(cell);

				curDate++;
			}
			
			MonthData.push(row);
		}

		return MonthData;
	},

	_getYear (date) {
		return (date || this.getState('dateViewing')).getFullYear();
	},

	_getMonth (date) {
		return (date || this.getState('dateViewing')).getMonth();
	},

	_getMonthName (date) {
		return this._monthNames[this._getMonth(date)];
	},
	
	_jumpToDate (date) {
		const range = this._getRange();
		let dateViewing = date;
		
		if (dateViewing.getTime() < range[0]) {
			dateViewing = new Date(range[0]);
		} else if (dateViewing.getTime() > range[1]) {
			dateViewing = new Date(range[1]);
		}
		
		if (this._isDateInRange(dateViewing, range)) {
			this.setState({ dateViewing } );
			return true;
		}
	},
	
	_jumpToYear (year) {
		if (year !== this._getYear()) {
			const date = new Date(this.getState('dateViewing'));
			date.setYear(year);
			
			return this._jumpToDate(date);
		}
	},
	
	_jumpToNextMonth () {
		return this._jumpToDate(new Date(this._getYear(), this._getMonth() + 1, 1));
	},
	
	_jumpToPreviousMonth () {
		return this._jumpToDate(new Date(this._getYear(), this._getMonth(), 0));
	},

	_getYearRangeData () {
		const range = this.getProperty('range');
		let year = range[0].getFullYear();
		const endYear = range[1].getFullYear();
		const viewingYear = this._getYear();
		
		const rangeData = {
			collection: []
		};

		for (; year <= endYear; year++) {
			const yearData = {
				text: year,
				value: year
			};
			
			rangeData.collection.push(yearData);

			if (year === viewingYear) {
				rangeData.selection = yearData;
			}
		}

		return rangeData;
	},

	_convertStringToDate (string) {
		const date = new Date(string);
		
		if (Lib.isValidDate(date) && this._isDateInRange(date)) {
			return date;
		}
	},

	_convertDateToString (date) {
		if (date) {
			return [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/');
		}
	},

	_formatSelectedDates (startDate, endDate) {
		const formattedDates = [];
		
		if (startDate) {
			formattedDates.push(this._convertDateToString(startDate));
		}
		
		if (startDate && this.getProperty('multiSelect')) {
			if (endDate) {
				formattedDates.push(this._convertDateToString(endDate));
			}
		}

		return formattedDates.join(' - ');
	},

	_getStartAndEndDates (dates) {
		let startDate = dates[0];
		let endDate = dates[1];
		
		if (!this.getProperty('multiSelect')) {
			endDate = undefined;
		} else if (endDate && (!startDate || startDate.getTime() > endDate.getTime())) {
			const tempDate = startDate;
			startDate = endDate;
			endDate = tempDate;
		}

		return {
			startDate,
			endDate
		};
	},

	_getStartAndEndDatesFromString (string) {
		const isDateRange = (string.length >= 19 && string.length <= 23);
		let dates;
		
		if (isDateRange) {
			dates = string.split('-');
			
			dates[0] = this._convertStringToDate(dates[0]);
			dates[1] = this._convertStringToDate(dates[1]);
		} else {
			dates = [this._convertStringToDate(string)];
		}
		
		return this._getStartAndEndDates(dates);
	},

	_roundDate (date) {
		if (date) {
			return new Date(this._convertDateToString(date));
		}
	}
});

export default DatepickerCore;
