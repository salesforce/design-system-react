declare module '@salesforce/design-system-react/components/date-picker/private/calendar-wrapper' {
	import React from 'react';
	type Props = {
		/**
		 * Label for button to go to the next month
		 */
		assistiveTextNextMonth: string /*.isRequired*/;
		/**
		 * Label for button to go to the previous month
		 */
		assistiveTextPreviousMonth: string /*.isRequired*/;
		/**
		 * Label for year picklist/combobox
		 */
		assistiveTextYear: string /*.isRequired*/;
		/**
		 * One letter abbreviations of the days of the week, starting on Sunday.
		 */ abbreviatedWeekDayLabels: any[] /*.isRequired*/;
		/**
		 * Whether or not the `CalendarWrapper` can steal focus from the main `Input`
		 */
		canFocusCalendar: boolean /*.isRequired*/;
		/**
		 * CSS classes to be added to tag with `slds-datepicker`.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * dateDisabled() takes a date as input argument, returns true if given date should be disabled, otherwise returns false.
		 */
		dateDisabled?: (v: any) => any;
		/**
		 * HTML id for component
		 */
		id?: string;
		/**
		 * Makes Monday the first day of the week
		 */
		isIsoWeekday?: boolean;
		/**
		 * For use of datepicker outside of dropdown.
		 */
		isolated?: boolean;
		/**
		 * Names of the months
		 */
		monthLabels: any[] /*.isRequired*/;
		/**
		 * Triggered when the keyboard moves focus on the calendar. {date: [Date object], formattedDate: [string]}  _Tested with Mocha framework._
		 */
		onCalendarFocus?: (v: any) => any;
		/**
		 * Triggered when the calendar is supposed to close.
		 */
		onRequestClose: (v: any) => any /*.isRequired*/;
		/**
		 * Triggered when a date on the calendar is clicked.
		 */
		onSelectDate: (v: any) => any /*.isRequired*/;
		/**
		 * The earliest year that can be selected in the year selection dropdown.
		 */
		relativeYearFrom: number /*.isRequired*/;
		/**
		 * The maximum year that can be selected in the year selection dropdown.
		 */
		relativeYearTo: number /*.isRequired*/;
		/**
		 * Currently selected date
		 */
		selectedDate?: Date;
		/**
		 * Component reference / DOM node for selected day.
		 */
		selectedDateRef?: (v: any) => any;
		/**
		 * Label of shortcut to jump to today within the calendar. Also used for assistive text for the current day.
		 */
		todayLabel: string /*.isRequired*/;
		/**
		 * Names of the seven days of the week, starting on Sunday.
		 */
		weekDayLabels: any[] /*.isRequired*/;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
