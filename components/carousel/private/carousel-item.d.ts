declare module '@salesforce/design-system-react/components/carousel/private/carousel-item' {
	import React from 'react';
	type Props = {
		/**
		 * Label of the button to be displayed. If not provided, no button will be rendered.
		 */
		buttonLabel?: string;
		/**
		 * Carousel HTML ID
		 */
		carouselId?: string;
		/**
		 * CSS classes that are applied to the component
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Visible paragraph text to be displayed on the carousel item
		 */
		description?: string | React.ReactNode;
		/**
		 * Carousel Item's visible heading
		 */
		heading: string | Record<string, any> /*.isRequired*/;
		href?: string;
		/**
		 * Id of the item component.
		 */
		id: number /*.isRequired*/;
		/**
		 * Image alt text
		 */
		imageAssistiveText?: string;
		/**
		 * Boolean indicating whether this item is currently visible in the active parent carousel panel
		 */
		isInCurrentPanel?: boolean;
		/**
		 * Width of the carousel item
		 */
		itemWidth?: number;
		/**
		 * Accepts a callback to handle when the a tag is focused on
		 */
		onFocus?: (v: any) => any;
		/**
		 * Accepts a custom carousel item rendering function
		 */
		onRenderItem?: (v: any) => any;
		/**
		 * Index of the panel this item belongs to, to be used when associating it to an indicator
		 */
		panelIndex?: number;
		/**
		 * Path of the image to be used
		 */
		src: string /*.isRequired*/;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
