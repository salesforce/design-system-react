declare module '@salesforce/design-system-react/components/date-picker/private/calendar' {
	import React from 'react';
	type Props = {
		/**
		 * Three letter abbreviations of the days of the week, starting on Sunday.
		 */
		abbreviatedWeekDayLabels: any[] /*.isRequired*/;
		/**
		 * dateDisabled() takes a date as input argument, returns true if given date should be disabled, otherwise returns false.
		 */
		dateDisabled?: (v: any) => any;
		/**
		 * HTML id for component
		 */
		id: string /*.isRequired*/;
		/**
		 * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
		 */
		initialDateForCalendarRender: Date /*.isRequired*/;
		/**
		 * Makes Monday the first day of the week
		 */
		isIsoWeekday?: boolean;
		/**
		 * Triggered when the keyboard moves focus off the calendar.
		 */
		onCalendarBlur: (v: any) => any /*.isRequired*/;
		/**
		 * Displayed calendar has changed or re-rendered
		 */
		onChangeMonth: (v: any) => any /*.isRequired*/;
		/**
		 * Internal callback that will eventually trigger when the keyboard moves focus on the calendar. `{date: [Date object], formattedDate: [string]}`.
		 */
		onRequestInternalFocusDate?: (v: any) => any;
		/**
		 * Triggered when the calendar is cancelled.
		 */
		onRequestClose: (v: any) => any /*.isRequired*/;
		/**
		 * Triggered when a date on the calendar is clicked.
		 */
		onSelectDate: (v: any) => any /*.isRequired*/;
		/**
		 * Currently selected date. This should be present in the input field.
		 */
		selectedDate?: Date;
		/**
		 * Component reference / DOM node for selected day.
		 */
		selectedDateRef?: (v: any) => any;
		/**
		 * Label of shortcut to jump to today within the calendar. This is also used for assistive text on today's date.
		 */
		todayLabel: string /*.isRequired*/;
		/**
		 * For keyboard navigation. Listens for key presses on the last focusable DOM Node, the "Today" link, so that dialog focus can be trapped.
		 */
		onLastFocusableNodeKeyDown?: (v: any) => any;
		/**
		 * Callback that passes in the DOM reference of the Today `a` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous. `buttonRef={(component) => { if(component) console.log(component); }}`
		 */
		todayRef?: (v: any) => any;
		/**
		 * Names of the seven days of the week, starting on Sunday.
		 */
		weekDayLabels: any[] /*.isRequired*/;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
