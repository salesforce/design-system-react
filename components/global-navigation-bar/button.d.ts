declare module '@salesforce/design-system-react/components/global-navigation-bar/button' {
	import React from 'react';
	type Props = {
		/**
		 * Whether the item is active or not.
		 */
		active?: boolean;
		/**
		 * Determines position of separating bar.
		 */
		dividerPosition?: 'left' | 'right';
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
