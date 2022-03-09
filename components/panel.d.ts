declare module '@salesforce/design-system-react/components/panel' {
	import React from 'react';
	type Props = {
		/**
		 * The contents of the panel
		 */
		children?: React.ReactNode;
		/**
		 * CSS classes to be added to `slds-panel`.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * The type of panel
		 */
		variant?: 'filters';
	};
	/**
	 * A panel provides detailed contextual information or contextual filtering options. [Filter](/components/filters/) component should be used as children. Menus within a Filter Popover will need to not have "portal mounts" and be inline. */
	function Component(props: Props): JSX.Element;
	export default Component;
}
