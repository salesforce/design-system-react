declare module '@salesforce/design-system-react/components/app-launcher/link' {
	import React from 'react';
	type Props = {
		/**
		 * Contents of the link
		 */
		children?: React.ReactNode;
		/**
		 * Classes to be applied to the link
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * The `href` attribute of the link. If the `onClick` callback is specified this URL will be prevented from changing the browser's location.
		 */
		href?: string;
		/**
		 * Callback for when the link is clicked. Passes back event and data object with href prop. Prevents click from changing browser's location if set.
		 */
		onClick?: (v: any) => any;
		/**
		 * Text used to highlight content in link
		 */
		search?: string;
		/**
		 * The title for the link. If not provided it will attempt to use child content if that content is a string.
		 */
		title?: string;
	};
	/**
	 * App Launcher Link component creates simple links to be used in "All Items" sections
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
