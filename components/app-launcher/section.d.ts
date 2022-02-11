declare module '@salesforce/design-system-react/components/app-launcher/section' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `collapseSection`: The assistive text for the section collapse icons.
		 */

		assistiveText?: Partial<{
			collapseSection?: string;
		}>;
		/**
		 * The title for this section of apps
		 */

		title: string /*.isRequired*/;
		/**
		 * Allows the user to show/hide the section
		 */

		toggleable?: boolean;
		/**
		 * An array of applications to display
		 */

		children: React.ReactNode /*.isRequired*/;
		/**
		 * Controls the open/closed state of the section
		 */

		isOpen?: boolean;
		/**
		 * Callback for when section is toggled. Passes "isOpen" bool. Forces `toggleable` to true
		 */

		onToggleClick?: (v: any) => any;
	};
	/**
	 * App Launcher Sections allow users to categorize App Tiles as well as toggle their display
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
