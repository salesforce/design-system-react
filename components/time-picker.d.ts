declare module '@salesforce/design-system-react/components/time-picker' {
	import React from 'react';
	type Props = {
		/**
		 * If true, constrains the menu to the scroll parent. See `Dropdown`.
		 */
		constrainToScrollParent?: boolean;
		/**
		 * Disables the input and prevents editing the contents.
		 */
		disabled?: boolean;
		/**
		 * Time formatting function
		 */
		formatter?: (v: any) => any;
		/**
		 * Sets the dialog width to the width of the target. Menus attached to `input` typically follow this UX pattern.
		 */
		inheritTargetWidth?: boolean;
		/**
		 * This label appears above the input.
		 */
		label?: string;
		/**
		 * Custom element that overrides the default Menu Item component.
		 */
		listItemRenderer?: (v: any) => any;
		/**
		 * Please select one of the following:
		 * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
		 * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
		 * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
		 */
		menuPosition?: 'absolute' | 'overflowBoundaryElement' | 'relative';
		/**
		 * Receives the props `(dateValue, stringValue)`
		 */
		onDateChange?: (v: any) => any;
		/**
		 * Parsing date string into Date
		 */
		parser?: (v: any) => any;
		/**
		 * Text that will appear in an empty input.
		 */
		placeholder?: string;
		/**
		 * If true, adds asterisk next to input label to indicate it is a required field.
		 */
		required?: boolean;
		/**
		 * Frequency of options
		 */
		stepInMinutes?: number;
		/**
		 * Value for input that is parsed to create an internal state in the `date` format.
		 */
		strValue?: string;
		/**
		 * Instance an internal state in the `date` format.
		 */
		value?: Date;
	};
	/**
	 *  Component description.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
