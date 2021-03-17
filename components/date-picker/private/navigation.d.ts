declare module '@salesforce/design-system-react/components/date-picker/private/navigation' {
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
		 * HTML id for component
		 */
		id?: string;
		/**
		 * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
		 */
		initialDateForCalendarRender: Date /*.isRequired*/;
		/**
		 * Displayed calendar has changed or re-rendered
		 */
		onChangeMonth: (v: any) => any /*.isRequired*/;
		/**
		 * Names of the months
		 */
		monthLabels: any[] /*.isRequired*/;
		/**
		 * For keyboard navigation. In order to trap focus within the dialog, the first DOM node with a tab index should be listened to.
		 */
		onPreviousMonthKeyDown?: (v: any) => any;
		/**
		 * Callback that passes in the DOM reference of the `<button>` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous.
		 */
		previousMonthRef: (v: any) => any /*.isRequired*/;
		/**
		 * Offset of year from current year that can be selected in the year selection dropdown. (2017 - 5 = 2012).
		 */
		relativeYearFrom?: number;
		/**
		 * Offset of year from current year that can be selected in the year selection dropdown. (2017 + 5 = 2012).
		 */
		relativeYearTo?: number;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
