declare module '@salesforce/design-system-react/components/page-header/private/controls' {
	import React from 'react';
	type Props = {
		/**
		 * Optional class name
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Type of this controls component ('actions' or 'controls')
		 */
		type?: 'actions' | 'controls';
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
