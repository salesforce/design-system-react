declare module '@salesforce/design-system-react/components/toast/container' {
	import React from 'react';
	type Props = {
		/**
		 * CSS classes to be added to tag with `.slds-notify-container`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Toast components
		 */
		children?: React.ReactNode;
	};
	/**
	 * A fixed container for toast banners.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
