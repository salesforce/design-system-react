declare module '@salesforce/design-system-react/components/global-navigation-bar/label' {
	import React from 'react';
	type Props = {
		/**
		 * Class names to be added to the `span` element
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Determines position of separating bar.
		 */
		dividerPosition?: 'left' | 'right';
		/**
		 * Id string applied to first <span> inside of <li>
		 */
		id?: string;
		/**
		 * Text to show
		 */
		label?: string;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
