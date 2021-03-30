declare module '@salesforce/design-system-react/components/page-header/private/related-list' {
	import React from 'react';
	type Props = {
		/**
		 * The label property can be a string or a React element
		 */
		label?: React.ReactNode;
		/**
		 * The info property can be a string or a React element
		 */
		info?: React.ReactNode;
		/**
		 * Content to appear on the right hand side of the page header
		 * prop 'contentRight' will be deprecated soon, use 'onRenderActions' instead
		 */
		onRenderActions?: (v: any) => any;
		/**
		 * Nav content which appears in the upper right hand corner.
		 * prop 'navRight' will be deprecated soon, use 'onRenderControls' instead
		 */
		onRenderControls?: (v: any) => any;
		/**
		 * The title property can be a string or a React element
		 */
		title?: React.ReactNode;
		/**
		 * An array of react elements presumably anchor <a> elements.
		 */
		trail?: any[];
		/**
		 * The type of component
		 * Note: Extra options are added to make the version backward compatible
		 */
		variant?: string;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
