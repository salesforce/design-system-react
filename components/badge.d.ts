declare module '@salesforce/design-system-react/components/badge' {
	import React from 'react';
	type Props = {
		/**
		 * CSS classes that are applied to the component
		 */
		className?: any[] | Record<string, any> | string;

		/**
		 * Id of component, if desired. If not provided an id is automatically generated
		 */
		id?: string;

		/**
		 * Custom styles to be passed to the component
		 */
		style?: Record<string, any>;

		/**
		 * Color variant for the badge component
		 */
		color?: 'default' | 'inverse' | 'light';

		/**
		 * Icon alignment for the badge component
		 */
		iconAlignment?: 'left' | 'right';

		/**
		 *  Content to be placed inside the badge component
		 */
		content?: string | React.ReactNode;
	};
	/**
	 * Badges are labels which hold small amounts of information.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
