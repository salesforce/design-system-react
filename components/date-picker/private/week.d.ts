declare module '@salesforce/design-system-react/components/date-picker/private/week' {
	import React from 'react';
	type Props = {
		/**
		 * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
		 */
		initialDateForCalendarRender: Date /*.isRequired*/;
		/**
		 * Is true if calendar day has focus.
		 */
		calendarHasFocus: boolean /*.isRequired*/;
		/**
		 * dateDisabled() takes a date as input argument, returns true if given date should be disabled, otherwise returns false.
		 */
		dateDisabled?: (v: any) => any;
		/**
		 * First day of week.
		 */
		firstDayOfWeek: Date /*.isRequired*/;
		/**
		 * Date that has focus.
		 */
		focusedDate: Date /*.isRequired*/;
		/**
		 * Triggered when the keyboard moves focus off the calendar.
		 */
		onCalendarBlur: (v: any) => any /*.isRequired*/;
		/**
		 * For keyboard navigation. Changes the focus to the next day on the calendar. Triggered when right arrow button is pressed.
		 */
		onKeyboardNavigateToNextDay: (v: any) => any /*.isRequired*/;
		/**
		 * For keyboard navigation. Changes the focus to the same day in the next week on the calendar. Triggered when down arrow button is pressed.
		 */
		onKeyboardNavigateToNextWeek: (v: any) => any /*.isRequired*/;
		/**
		 * For keyboard navigation. Changes the focus to the previous day on the calendar. Triggered when left arrow button is pressed.
		 */
		onKeyboardNavigateToPreviousDay: (v: any) => any /*.isRequired*/;
		/**
		 * For keyboard navigation. Changes the focus to the same day in the previous week on the calendar. Triggered when up arrow button is pressed.
		 */
		onKeyboardNavigateToPreviousWeek: (v: any) => any /*.isRequired*/;
		/**
		 * Triggered when the user wants to focus on a new day witht he keyboard. It returns the keyboard event a data object with the shape: `{date: [Date object]}`. Keyboard event is ommited if a new month is rendered.  _Tested with Mocha framework._
		 */
		onRequestInternalFocusDate: (v: any) => any /*.isRequired*/;
		/**
		 * Triggered when a date on the calendar is clicked.
		 */
		onSelectDate: (v: any) => any /*.isRequired*/;
		/**
		 * Currently selected date. This should be present in the input field.
		 */
		selectedDate: Date /*.isRequired*/;
		/**
		 * Component reference / DOM node for selected day.
		 */
		selectedDateRef: (v: any) => any /*.isRequired*/;
		/**
		 * Label of shortcut to jump to today within the calendar. Also used for assistive text for the current day.
		 */
		todayLabel: string /*.isRequired*/;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
