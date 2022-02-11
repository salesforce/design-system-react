declare module '@salesforce/design-system-react/components/page-header/private/detail-block' {
	import React from 'react';
	type Props = {
		/**
		 * Optional class name
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * The content property can be a string or a React element
		 */
		content?: React.ReactNode;
		/**
		 * Sets the 'flavor' of a block, which adds the following sizing class: `slds-size_${flavor}`
		 */
		flavor?: string;
		/**
		 * Sets the label of a detail block
		 */
		label?: React.ReactNode;
		/**
		 * Sets whether the fields truncate
		 */
		truncate?: boolean;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
