declare module '@salesforce/design-system-react/components/alert/container' {
	import React from 'react';
	type Props = {
		/**
		 * CSS classes to be added to tag with `.slds-notify_alert`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Alert components
		 */
		children?: React.ReactNode;
	};
	/**
	 * A fixed container for alert banners.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
