declare module '@salesforce/design-system-react/components/page-header/private/detail-row' {
	import React from 'react';
	type Props = {
		children?: React.ReactNode;
		/**
		 * Optional class name
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * An array of detail blocks
		 */
		details?: any[];
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
