declare module '@salesforce/design-system-react/components/date-picker/date-picker' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 * This object is merged with the default props object on every render.
		 * * `nextMonth`: Label for button to go to the next month _Tested with snapshot testing._
		 * * `openCalendar`: Call to action label for calendar dialog trigger _Tested with snapshot testing._
		 * * `previousMonth`: Label for button to go to the previous month _Tested with snapshot testing._
		 */
		assistiveText?: Partial<{
			nextMonth?: string;
			openCalendar?: string;
			previousMonth?: string;
			year?: string;
		}>;
		/**
		 * Aligns the right or left side of the menu with the respective side of the trigger. _Tested with snapshot testing._
		 */
		align?: 'left' | 'right';
		/**
		 * CSS classes to be added to tag with `slds-datepicker`. If you are looking for the outer DOM node (slds-dropdown-trigger), please review `triggerClassName`. _Tested with snapshot testing._
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Disable input and calendar. _Tested with Mocha framework._
		 */
		disabled?: boolean;
		/**
		 * This function callback receives a data object with a key of `date`. Write your own validation and return `true` if the date should be disabled, otherwise please return `false`. The value of `date` is the day rendered in the calendar with the current local time and timezone.
		 */
		dateDisabled?: (v: any) => any;
		/**
		 * Date formatting function that formats the `value` prop (`value` is an ECMAScript `Date()` object) and returns a string to be rendered as the `input` value. Please use an external library such as [MomentJS](https://github.com/moment/moment/) for date formatting and internationalization. _Tested with snapshot testing._
		 * The default `formatter` function is:
		 * ```
		 * formatter(date) {
		 *   return date
		 *    ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
		 *    : '';
		 * }
		 * ```
		 */
		formatter?: (v: any) => any;
		/**
		 * Value of input that gets passed to `parser` prop on initial render. This prop is only present for uncontrolled use of Datepicker which is _highly discouraged_. A better name for this prop would be `defaultFormatedValue`. Please use the `value` prop instead. _Not tested._
		 */
		formattedValue?: string;
		/**
		 * Prevents the dropdown from changing position based on the viewport/window. If set to true your dropdowns can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you might want to consider making the dropdowns contents scrollable to fit the menu on the screen. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements. _Not tested._
		 */
		hasStaticAlignment?: boolean;
		/**
		 * HTML id for component _Tested with snapshot testing._
		 */
		id?: string;
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `abbreviatedWeekDays`: Three letter abbreviations of the days of the week, starting on Sunday. _Tested with snapshot testing._
		 * * `months`: Names of the months. _Tested with snapshot testing._
		 * * `label`: This label appears above the input.
		 * * `placeholder`: Placeholder text for input. _Tested with snapshot testing._
		 * * `today`: Label of shortcut to jump to today within the calendar. This is also used for assistive text on today's date. _Tested with snapshot testing._
		 * * `weekDays`: Full names of the seven days of the week, starting on Sunday. _Tested with snapshot testing._
		 */
		labels?: Partial<{
			abbreviatedWeekDays?: any[];
			label?: string;
			months?: any[];
			placeholder?: string;
			today?: string;
			weekDays?: any[];
		}>;
		/**
		 * An [Input](http://react.lightningdesignsystem.com/components/inputs/) component. The props from this `Input` component will be merged and override any default props. See [Component composition with prop spread](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#component-composition-with-prop-spread) for more information on this methodology.
		 */
		input?: React.ReactNode;
		/**
		 * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices)
		 */
		isOpen?: boolean;
		/**
		 * Makes Monday the first day of the week. _Tested with snapshot testing._
		 */
		isIsoWeekday?: boolean;
		/**
		 * Please select one of the following:
		 * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
		 * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
		 * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
		 */
		menuPosition?: 'absolute' | 'overflowBoundaryElement' | 'relative';
		/**
		 * Triggered when the user wants to focus on a new day with the keyboard. If the target node is a day it will return the keyboard event a data object with the shape: `{date: [Date object]}`. Event will be `null` when new month is re-rendered.  _Tested with Mocha framework._
		 */
		onCalendarFocus?: (v: any) => any;
		/**
		 * Triggered when the date changes. `onChange` can be used for form validation if needed. It receives an event and a data object in the shape: `{date: [Date object], formattedDate: [string], timezoneOffset: [number]}`. `data.date` is Coordinated Universal Time (UTC), but the days of the calendar are in local time of the user. The `timezoneOffset` is the difference, in minutes, between UTC and the local time. Please note that this means that the offset is positive if the local timezone is behind UTC and negative if it is ahead. `timezoneOffset` is in minutes, for hours divide by `60`. _Tested with Mocha framework._
		 */
		onChange?: (v: any) => any;
		/**
		 * Triggered when the calendar is closed. _Tested with Mocha framework._
		 */
		onClose?: (v: any) => any;
		/**
		 * Triggered when the calendar has opened. _Tested with Mocha framework._
		 */
		onOpen?: (v: any) => any;
		/**
		 * Function called when the calendar dialog would like hide. This will turn the calendar dialog into into a controlled component. Please use with `isOpen`. _Tested with Mocha framework._
		 */
		onRequestClose?: (v: any) => any;
		/**
		 * Function called when the calendar dialog would like show. This will turn the calendar dialog into into a controlled component. Please use with `isOpen`. _Tested with Mocha framework._
		 */
		onRequestOpen?: (v: any) => any;
		/**
		 * Custom function to parse date string from the `input` value, which must return an ECMAScript `Date()` object.  Please use an external library such as [MomentJS](https://github.com/moment/moment/) for date parsing and internationalization. The default `parser` passes the input value to ECMAScript `Date()` and _prays_ for a miracle. **Do not use the default parsing function in production.** _Tested with snapshot testing._
		 * The default `parser function is:
		 * ```
		 * parser(str) {
		 *   return new Date(str);
		 * }
		 * ```
		 */
		parser?: (v: any) => any;
		/**
		 * Offset of year from current year that can be selected in the year selection dropdown. (2017 - 5 = 2012). _Tested with snapshot testing._
		 */
		relativeYearFrom?: number;
		/**
		 * Offset of year from current year that can be selected in the year selection dropdown. (2017 + 5 = 2012). _Tested with snapshot testing._
		 */
		relativeYearTo?: number;
		/**
		 * CSS classes to be added to tag with `slds-datepicker-trigger`. This is typically a wrapping `div` around the input. _Tested with snapshot testing._
		 */
		triggerClassName?: any[] | Record<string, any> | string;
		/**
		 * Sets date with a `Date` ECMAScript object. _Tested with snapshot testing._
		 */
		value?: Date;
	};
	/**
	 * A date picker is a non-text input form element. You can select a single date from a popup calendar. Please use an external library such as [MomentJS](https://github.com/moment/moment/) for date formatting and parsing and internationalization. You will want to use your date library within the `parser` and `formatter` callbacks.
	 *
	 * The calendar is rendered with time/dates based on local browser time of the client browser. All dates are in the local user's timezones and time. Another way to put it is if a user selects a date, they are actually selecting midnight in their current time on their current day and not mightnight in UTC. If `Datepicker` is paired with a time and timezone input, you may want to convert dates provided by this component to UTC and then combine the date with your time and timezone input.
	 *
	 * Pairing with any other component besides an `input` is untested.
	 *
	 * This component is wrapped in a [higher order component to listen for clicks outside itself](https://github.com/kentor/react-click-outside) and thus requires use of `ReactDOM`.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
