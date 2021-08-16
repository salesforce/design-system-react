declare module '@salesforce/design-system-react/components/utilities/highlighter' {
	import React from 'react';
	type Props = {
		/**
		 * The full string to display.
		 */
		children?: string | number | boolean | React.ReactNode;
		className?: string;
		/**
		 * The string of text (or Regular Expression) to highlight.
		 */
		search?: PropTypes.any;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
