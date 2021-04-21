declare module '@salesforce/design-system-react/components/data-table/highlight-cell' {
	import React from 'react';
	type Props = {
		/**
		 * The contents of the cell. Equivalent to `props.item[props.property]`
		 */
		children?: React.ReactNode | string;
		/**
		 * The string of text (or Regular Expression) to highlight.
		 */
		search?: PropTypes.any;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
