declare module '@salesforce/design-system-react/components/global-header/notifications' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 * * `newNotificationsAfter`: Assistive text for when there are new notifications, after the notificationCount. The default is ' new notifications'.
		 * * `newNotificationsBefore`: Assistive text for when there are new notifications, before the notificationCount. The default is ''.
		 * * `noNotifications`: Assistive text for when there are no new notifications.
		 */
		assistiveText?: Partial<{
			newNotificationsAfter?: string;
			newNotificationsBefore?: string;
			noNotifications?: string;
		}>;
		/**
		 * Dictates the number of notifications shown in the new notifications badge.
		 */
		notificationCount?: number;
		/**
		 * A `Popover` component. The props from this popover will be merged and override any default props. The `children` prop will be ignored.
		 */
		popover?: React.ReactNode;
	};
	/**
	 * A GlobalHeaderNotifications component. Notifications are a way to notify a user about a global change within the application.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
