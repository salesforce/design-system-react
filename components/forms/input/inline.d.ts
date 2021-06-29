declare module '@salesforce/design-system-react/components/forms/input/inline' {
	import React from 'react';
	type Props = {
		/**
		 * Class names to be added to the outer container of the input.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Name of the submitted form parameter.
		 */
		name?: string;
		/**
		 * Disables the Inline Edit component and prevents editing the contents.
		 */
		disabled?: boolean;
		/**
		 * Every Inline Edit component must have a unique ID in order to support keyboard navigation and ARIA support.
		 */
		id: string /*.isRequired*/;
		/**
		 * This event fires when the input changes.
		 */
		onChange?: (v: any) => any;
		/**
		 * Function will run when keyup during text edit
		 */
		onKeyUp?: (v: any) => any;
		/**
		 * Function will run when we enter edit mode
		 */
		onEnterEditMode?: (v: any) => any;
		/**
		 * Function will run when we leave edit mode
		 */
		onLeaveEditMode?: (v: any) => any;
		/**
		 * Typically an Inline Edit component will be of the type text, but like the Input element it includes support for all HTML5 types.
		 */
		type?:
			| 'text'
			| 'password'
			| 'datetime'
			| 'datetime-local'
			| 'date'
			| 'month'
			| 'time'
			| 'week'
			| 'number'
			| 'email'
			| 'url'
			| 'search'
			| 'tel'
			| 'color';
		/**
		 * Inline Edit is a controlled component, and will always display this value.
		 */
		value: string /*.isRequired*/;
	};
	/**
	 * An inline input is rendered as a label by default. When clicked (or tabbed in), it's rendered as an input. When the focus is lost, the current input value is saved and the input is rendered as a label again.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
