// # Datepicker Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

export const CONTROL = 'Datepicker';

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
		range: [new Date('1991'), new Date('2030')],

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
	
	_isDateInRange (date) {
		if (!date) {
			return false;
		}
		
		const time = date && this._roundDate(date).getTime();
		const range = Lib.getDataAdapter(this.getProperty('range'));
		const length = range.length();
		let inRange = false;
		
		switch (length) {
			case 2:
				inRange = (time >= this._roundDate(range.at(0)).getTime() && time <= this._roundDate(range.at(1)).getTime());
				break;
			case 1:
				inRange = (time >= this._roundDate(range.at(0)).getTime());
				break;
			default:
				break;
		}
		
		return inRange;
	},
	
	_isDateSelected (date) {
		const startDate = this._roundDate(this.getProperty('startDate'));
		const endDate = this._roundDate(this.getProperty('endDate'));
		const time = date && this._roundDate(date).getTime();
		let selected = false;
		
		if (this.getProperty('multiSelect') && endDate) {
			if (time && startDate) {
				selected = (time >= startDate.getTime());
			}
			
			if (time && endDate) {
				selected = (selected && time <= endDate.getTime());
			}
		} else if (time && startDate) {
			selected = (time === startDate.getTime());
		}
		
		return selected;
	},

	_getCalendarData (baseDate) {
		const date = this.getState('dateViewing') || baseDate;
		const year = date.getFullYear(); // Year of the date selected
		const month = date.getMonth(); // Month of the date selected
		const firstDay = new Date(year, month, 1).getDay(); // Index of first day base 0 sunday
		const lastDate = new Date(year, month + 1, 0).getDate(); // Date of the last day
		const lastMonthDate = new Date(year, month, 0).getDate(); // Last date for previous month

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

				if (!cell.outside && !this._isDateInRange(cell.date)) {
					cell.outside = true;
				}
				
				if (!cell.outside && this._isDateSelected(cell.date)) {
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

	_getMonthName (baseDate) {
		const date = this.getState('dateViewing') || baseDate;
		const month = date.getMonth();

		return this._monthNames[month];
	},

	_getYear (baseDate) {
		const date = this.getState('dateViewing') || baseDate;

		return date.getFullYear();
	},

	_getYearRangeData () {
		const range = this.getProperty('range');
		const viewingYear = this._getYear();
		const allDates = [];
		let selDate;
		let curDate;

		for (curDate = range[0].getFullYear(); curDate <= range[1].getFullYear(); curDate++) {
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
	
	_formatDate (date) {
		if (date) {
			return [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/');
		}
	},

	_formatSelectedDates () {
		const formattedDates = [];
		const startDate = this.getProperty('startDate');
		
		if (startDate) {
			formattedDates.push(this._formatDate(startDate));
		}
		
		if (startDate && this.getProperty('multiSelect')) {
			const endDate = this.getProperty('endDate');
			
			if (endDate) {
				formattedDates.push(this._formatDate(endDate));
			}
		}

		return formattedDates.join(' - ');
	},
	
	_convertToDate (string) {
		const date = new Date(string);
		
		if (Lib.isValidDate(date) && this._isDateInRange(date)) {
			return date;
		}
	},

	_getStartAndEndDates (input) {
		const isDateRange = (input.length >= 21 && input.length <= 23);
		let startDate;
		let endDate;
		
		if (isDateRange) {
			const dates = input.split('-');
			startDate = this._convertToDate(dates[0]);
			endDate = this._convertToDate(dates[1]);
			
			if (endDate && (!startDate || startDate.getTime() > endDate.getTime())) {
				const tempDate = startDate;
				startDate = endDate;
				endDate = tempDate;
			}
		} else {
			startDate = this._convertToDate(input);
		}

		return {
			startDate,
			endDate
		};
	},
	
	_roundDate (date) {
		if (date) {
			return new Date(this._formatDate(date));
		}
	}
});

export default DatepickerCore;
