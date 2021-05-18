declare module '@salesforce/design-system-react/components/page-header/private/info' {
	import React from 'react';
	type Props = {
		/**
		 * Optional class name
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Contents of info section
		 */
		content?: React.ReactNode;
		/**
		 * Variant passed down from page header
		 */
		variant?: string;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
