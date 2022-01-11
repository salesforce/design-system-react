declare module '@salesforce/design-system-react/components/global-navigation-bar/region' {
	import React from 'react';
	type Props = {
		/**
		 * Contents of region. Expects `GlobalNavigationBarLink`, `GlobalNavigationBarDropdown`, `GlobalNavigationBarApplicationName`, `AppSwitcher`, but could be any component. This is the place to pass in an Object Switcher until that is supported.
		 */
		children?: React.ReactNode;
		/**
		 * Determines position of separating bar.
		 */
		dividerPosition?: 'left' | 'right';
		/**
		 * CSS classes to be added to the region
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Wraps the `secondary` region in a `nav` and adds a role attribute
		 */
		navigation?: boolean;
		/**
		 * Region wrap children in styling specific to that region. When `tertiary`
		 * region is used, secondary region only supports four list items.
		 */
		region: 'primary' | 'secondary' | 'tertiary' /*.isRequired*/;
	};
	/* eslint-enable react/display-name */

	/**
	 * Regions make up a GlobalNavigation Bar and typically contain links and dropdowns. The Primary region contains the AppSwitcher, Application Name, and Object Switcher. The secondary region typically has navigation betweens sections of the application. The tertiary region is aligned to the right side of the screen and contains shortcuts or actions.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
