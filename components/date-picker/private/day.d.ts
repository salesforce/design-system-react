declare module '@salesforce/design-system-react/components/date-picker/private/day' {
	import React from 'react';
	type Props = {
		/**
		 * If elements within the calendar have focus. This is helpful for keyboard event trapping.
		 */
		calendarHasFocus: boolean /*.isRequired*/;
		/**
		 * Date of day
		 */
		date: Date /*.isRequired*/;
		/**
		 * If date is disabled
		 */
		disabled?: boolean;
		/**
		 * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
		 */
		initialDateForCalendarRender: Date /*.isRequired*/;
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
		focusedDate?: Date;
		onRequestInternalFocusDate?: (v: any) => any;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
