declare module '@salesforce/design-system-react/components/notification' {
	import React from 'react';
	type Props = {
		iconCategory?: string;
		/**
		 * Custom classes applied to Notification element.
		 */
		className?: string;
		/**
		 * Message for Notification.
		 */
		content: React.ReactNode /*.isRequired*/;
		/**
		 * If true, close button appears for users to dismiss Notification.
		 */
		dismissible?: boolean;
		/**
		 * If duration exists, the Notification will disappear after that amount of time.
		 */
		duration?: number;
		/**
		 * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lighning Design System Icons</a> to reference icon names.
		 */
		iconName?: string;
		isOpen: boolean /*.isRequired*/;
		onDismiss?: (v: any) => any;
		/**
		 * Styling for Notification background.
		 */
		texture?: boolean;
		/**
		 * Styling for Notification background color. Please reference <a href='http://www.lightningdesignsystem.com/components/utilities/themes/#color'>Lighning Design System Themes > Color</a>.
		 */
		theme?: 'success' | 'warning' | 'error' | 'offline';
		variant: 'alert' | 'toast' /*.isRequired*/;
	};
	/**
	 * The Notification component is the Alert and Toast variants of the Lightning Design System Notification component. For prompt notifications, use the <a href='#/modal'>Modal</a> component with <code>prompt={true}</code>.
	 * The Notification opens from a state change outside of the component itself (pass this state to the <code>isOpen</code> prop).
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
