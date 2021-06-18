declare module '@salesforce/design-system-react/components/page-header' {
	import React from 'react';
	type Props = {
		/**
		 * Optional class name
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * An array of detail blocks (used in "recordHome" variant)
		 */
		details?: any[];
		/**
		 * The label property can be a string or a React element
		 */
		label?: string | React.ReactElement;
		/**
		 * The page header icon. Expects an Icon component
		 */
		icon?: React.ReactElement;
		/**
		 * The info property can be a string or a React element
		 */
		info?: string | React.ReactElement;
		/**
		 * Makes PageHeader joinable with DataTable by adding appropriate classes/styling
		 */
		joined?: boolean;
		/**
		 * Used with the `object-home` variant. Accepts a node, typically a Dropdown component
		 */
		nameSwitcherDropdown?: React.ReactNode;
		/**
		 * Actions content to appear on the upper right side of the page header.
		 * Returned content must be either a SLDSPageHeaderControl component or an element/fragment with children that are all SLDSPageHeaderControl components.
		 * Prop 'contentRight' will be deprecated soon, use 'onRenderActions' instead.
		 */
		onRenderActions?: (v: any) => any;
		/**
		 * Controls content to appear on the lower right side of the page header.
		 * Returned content must be either a SLDSPageHeaderControl component or an element/fragment with children that are all SLDSPageHeaderControl components.
		 * Prop 'navRight' will be deprecated soon, use 'onRenderControls' instead.
		 */
		onRenderControls?: (v: any) => any;
		/**
		 * The title property can be a string or a React element
		 */
		title?: string | React.ReactElement;
		/**
		 * An array of react elements presumably anchor <a> elements.
		 */
		trail?: any[];
		/**
		 * The type of component
		 * Note: Extra options are added to make the version backward compatible
		 */
		variant?: 'base' | 'object-home' | 'record-home' | 'related-list';
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
