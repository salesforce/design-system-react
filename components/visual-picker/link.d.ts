declare module '@salesforce/design-system-react/components/visual-picker/link' {
	import React from 'react';
	type Props = {
		/**
		 * HTML id for component.
		 */
		id?: string;
		/**
		 * CSS classes to be added to tag with `.slds-form-element`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * URL for the Link
		 */
		href?: string;
		/**
		 * Icon node for the Link
		 */
		icon?: React.ReactNode;
		/**
		 * Title for the Link
		 */
		title?: string;
		/**
		 * Description for the Link
		 */
		description?: string;
	};
	/**
	 * Visual Picker Link Component
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
