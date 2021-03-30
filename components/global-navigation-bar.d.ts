declare module '@salesforce/design-system-react/components/global-navigation-bar' {
	import React from 'react';
	type Props = {
		/**
		 * The items to be displayed in the Global Navigation Bar.
		 */
		children?: React.ReactNode;
		/**
		 * CSS class names to be added to the container element.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Typically the cloud name (e.g.- "sales" or "marketing"). This primarily changes the background color.
		 */
		cloud?: string;
		/**
		 * Transforms text and interactions (such as hover) to be more visually accessible.
		 */
		theme?: 'light' | 'dark';
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
