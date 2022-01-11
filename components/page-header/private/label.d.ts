declare module '@salesforce/design-system-react/components/page-header/private/label' {
	import React from 'react';
	type Props = {
		/**
		 * Contents of label section
		 */
		content?: React.ReactNode;
		/**
		 * An array of react elements, presumably anchor <a> elements.
		 */
		trail?: any[];
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
