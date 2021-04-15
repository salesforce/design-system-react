declare module '@salesforce/design-system-react/components/time-picker/private/dropdown-trigger' {
	import React from 'react';
	type Props = {
		/**
		 * Icon for right side of trigger
		 */
		iconRight?: React.ReactNode;
		/**
		 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering input.
		 */
		id?: string;
		/**
		 * This label appears above the input.
		 */
		label?: string;
		/**
		 * The dropdown menu.
		 */
		menu?: React.ReactNode;
		/**
		 * Is only called when `openOn` is set to `hover` and when the triggering input loses focus.
		 */
		onBlur?: (v: any) => any;
		/**
		 * This prop is passed onto the triggering `Input`. Triggered when the trigger input is clicked.
		 */
		onClick?: (v: any) => any;
		/**
		 * Is only called when `openOn` is set to `hover` and when the triggering input gains focus.
		 */
		onFocus?: (v: any) => any;
		/**
		 * Called when a key pressed.
		 */
		onKeyDown?: (v: any) => any;
		/**
		 * Called when mouse clicks down on the trigger input.
		 */
		onMouseDown?: (v: any) => any;
		/**
		 * The ref of the actual triggering input.
		 */
		triggerRef?: (v: any) => any;
		/**
		 * Date
		 */
		value?: string;
	};
	/**
	 *  Component description.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
