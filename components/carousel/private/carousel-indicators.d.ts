declare module '@salesforce/design-system-react/components/carousel/private/carousel-indicators' {
	import React from 'react';
	type Props = {
		/**
		 * Carousel HTML ID
		 */
		carouselId?: string;
		/**
		 * CSS classes that are applied to the component
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Selected indicator
		 */
		currentIndex?: number;
		/**
		 * Passed from carousel parent state, dictates if indicator currently has focus
		 */
		hasFocus?: boolean;
		/**
		 * Array of objects with shape, needed for building a carousel items
		 */
		items?: any[];
		/**
		 * Number of items to be displayed at a time in the carousel
		 */
		itemsPerPanel?: number;
		/**
		 * Number of indicators to be displayed (corresponds to the number of panels in the carousel)
		 */
		noOfIndicators: number /*.isRequired*/;
		/**
		 * Fires on indicator blur, allows parent carousel to adjust indicatorsHaveFocus state accordingly
		 */
		onBlur?: (v: any) => any;
		/**
		 * Triggered when the indicator is clicked.
		 */
		onClick?: (v: any) => any;
		/**
		 * Fires on indicator focus, allows parent carousel to adjust indicatorsHaveFocus state accordingly
		 */
		onFocus?: (v: any) => any;
	};
	/**
	 * CarouselIndicators is used to display the list of indicators associated to the number of panels
	 * a carousel has
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
