declare module '@salesforce/design-system-react/components/scoped-notification' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility.**
		 * * `icon`: The assistive text for the icon. Is overridden by `label` assistive text passed directly to an `Icon` component via the `icon` prop
		 */
		assistiveText?: Partial<{
			icon?: string;
		}>;
		/**
		 * CSS classes to be added to tag with `.slds-scoped-notification`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 *  The icon to be displayed in the scoped notification. Accepts an `Icon` component
		 */
		icon?: React.ReactNode;
		/**
		 *  Theme for the scoped notification
		 */
		theme?: 'dark' | 'light';
	};
	/**
	 * A Scoped Notification Component serve advisory information for the user that is not important enough to justify an alert.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
