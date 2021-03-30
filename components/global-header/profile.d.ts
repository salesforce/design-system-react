declare module '@salesforce/design-system-react/components/global-header/profile' {
	import React from 'react';
	type Props = {
		/**
		 * Extra classnames to apply to the popover.
		 */
		className?: string;
		/**
		 * An image URL or avatar node to display for the user profile. Defaults to a base64 encoded generic user avatar image string
		 */
		avatar?: string | React.ReactNode;
		/**
		 * CSS classes to be added to the `button` element.
		 */
		buttonClassName?: any[] | Record<string, any> | string;
		/**
		 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the popover to the triggering button. If an id is not provided, it will be automatically generated.
		 */
		id?: string;
		/**
		 * A `Popover` component. The props from this popover will be merged and override any default props.
		 */
		popover?: React.ReactNode;
		/**
		 * The user name of the profile. Defaults to "User Name"
		 */
		userName?: string;
	};
	/**
	 * This component is an `Avatar` component that opens a `Popover` component when clicked.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
