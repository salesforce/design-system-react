declare module '@salesforce/design-system-react/components/app-launcher' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `trigger`: This is a visually hidden label for the app launcher icon.
		 */
		assistiveText?: Partial<{
			trigger?: string;
		}>;
		/**
		 * Boolean indicating if the appElement should be hidden.
		 */
		ariaHideApp?: boolean;
		/**
		 * One or more `<AppLauncherExpandableSection />`s, each containing one or more `<AppLauncherTile />`s or `<AppLauncherLink />`s
		 */
		children: React.ReactNode /*.isRequired*/;
		/**
		 * The app launcher id. If not provided, one will be generated for accessibility
		 */
		id?: string;
		/**
		 * Control the open/close state of the App Launcher
		 */
		isOpen?: boolean;
		/**
		 * CSS classes to be added to App Launcher Modal.
		 */
		modalClassName?: any[] | Record<string, any> | string;
		/**
		 * Button that exists in the upper right hand corner of the App Launcher modal
		 */
		modalHeaderButton?: React.ReactNode;
		/**
		 * Allows longer application names without truncating them.
		 */
		noTruncate?: boolean;
		/**
		 * Callback when the App Launcher Modal is closed
		 */
		onClose?: (v: any) => any;
		/**
		 * Search bar for the Modal's header. Will typically be an instance of `design-system-react/input/search`
		 */
		search?: React.ReactNode;
		/**
		 * Set the App Launcher's title text (for localization)
		 */
		title?: string;
		/**
		 * This is typically the name of the cloud or application
		 */
		triggerName?: React.ReactNode;
		/**
		 * Callback when the App Launcher icon is clicked
		 */
		triggerOnClick?: (v: any) => any;
	};
	/**
	 * The App Launcher allows the user to quickly access all the apps and functionality with their organization.
	 * The App Launcher should generally only be used as a sub-component of the [Global Navigation Bar](/components/global-navigation-bar)
	 *
	 * USAGE EXAMPLE:
	 * ```
	 * <AppLauncher>
	 * 	<AppLauncherExpandableSection>
	 * 		<AppLauncherTile />
	 * 		<AppLauncherTile />
	 * 		<AppLauncherTile />
	 * 	</AppLauncherExpandableSection>
	 * 	<AppLauncherExpandableSection>
	 * 		<AppLauncherTile />
	 * 		<AppLauncherTile />
	 * 	</AppLauncherExpandableSection>
	 * </AppLauncher>
	 * ```
	 *
	 * By default, `Modal`, a child component of App Launcher, will add `aria-hidden=true` to the `body` tag, but this disables some assistive technologies. To prevent this you can add the following to your application with `#mount` being the root node of your application that you would like to hide from assistive technologies when the `Modal` is open.
	 * ```
	 * import settings from 'design-system-react/components/settings';
	 * settings.setAppElement('#mount');
	 * ```
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
