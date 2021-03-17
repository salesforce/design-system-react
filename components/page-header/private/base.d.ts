declare module '@salesforce/design-system-react/components/page-header/private/base' {
	import React from 'react';
	type Props = {
		/**
		 * The page header icon
		 */
		icon?: React.ReactNode;
		/**
		 * The info property can be a string or a React element
		 */
		info?: React.ReactNode;
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
		 * The type of component
		 */
		variant?: string;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
