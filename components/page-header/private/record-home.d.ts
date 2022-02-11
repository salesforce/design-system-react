declare module '@salesforce/design-system-react/components/page-header/private/record-home' {
	import React from 'react';
	type Props = {
		/**
		 * An array of detail blocks (used in "recordHome" variant)
		 */
		details?: any[];
		/**
		 * The label property can be a string or a React element
		 */
		label?: React.ReactNode;
		/**
		 * The page header icon
		 */
		icon?: React.ReactElement;
		/**
		 * Content to appear on the right hand side of the page header
		 * prop 'contentRight' will be deprecated soon, use 'onRenderActions' instead
		 */
		onRenderActions?: (v: any) => any;
		/**
		 * The title property can be a string or a React element
		 */
		title?: React.ReactNode;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
