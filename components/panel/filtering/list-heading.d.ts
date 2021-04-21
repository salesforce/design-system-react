declare module '@salesforce/design-system-react/components/panel/filtering/list-heading' {
	import React from 'react';
	type Props = {
		/**
		 * Heading for following PanelFilterList
		 */
		heading?: React.ReactNode | string;
		/**
		 * Displayed a heading for a locked list of filters
		 */
		isLocked?: boolean;
		/**
		 * Heading for a group of filters that are locked
		 */
		lockedHeading?: string;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
