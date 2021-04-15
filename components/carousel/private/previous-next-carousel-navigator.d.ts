declare module '@salesforce/design-system-react/components/carousel/private/previous-next-carousel-navigator' {
	import React from 'react';
	type Props = {
		/**
		 * Description of the previous/next navigation icons for screen-readers.
		 */
		assistiveText?: string;
		/**
		 * Name of icon displayed within the navigation button
		 */
		iconName?: 'chevronleft' | 'chevronright';
		/**
		 * Determines where the navigator indicator has been disabled
		 */
		isDisabled?: boolean;
		/**
		 * Additional styles to be applied to the container
		 */
		inlineStyle?: Record<string, any>;
		/**
		 * Triggered when the indicator is clicked.
		 */
		onClick?: (v: any) => any;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
