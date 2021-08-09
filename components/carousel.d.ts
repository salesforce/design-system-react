declare module '@salesforce/design-system-react/components/carousel' {
	import React from 'react';
	type Props = {
		/**
		 * Description of the carousel items for screen-readers.
		 */
		assistiveText?: Record<string, any>;
		/**
		 * Interval for the autoplay iteration
		 */
		autoplayInterval?: number;
		/**
		 * CSS classes that are applied to the main 'slds-carousel' classed component container
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Dictates the currently active/visible carousel panel. Use with `onRequestPanelChange` for a controlled carousel component. If not provided, the carousel will manage this itself via state.
		 */
		currentPanel?: number;
		/**
		 * Boolean showing whether the autoplay button is available or not
		 */
		hasAutoplay?: boolean;
		/**
		 * Boolean for displaying the navigation indicators (left/right arrows) of the carousel
		 */
		hasPreviousNextPanelNavigation?: boolean;
		/**
		 * Id of component, if desired. If not provided an id is automatically generated
		 */
		id?: string;
		/**
		 * Boolean that dictates whether autoplay is active or not. Use with `onRequestAutoplayToggle` for a controlled carousel component.
		 */
		isAutoplayOn?: boolean;
		/**
		 * Boolean for infinite loop navigation. Note: if not true autoplay will stop automatically at the last panel.
		 */
		isInfinite?: boolean;
		/**
		 * * **Array of item objects used by the default carousel item renderer.**
		 * Each object can contain:
		 * * `id`: The id of the carousel item. [REQUIRED]
		 * * `heading`: Primary string that will be used as the heading
		 * * `description`: Secondary string that is used to describe the item
		 * * `buttonLabel`: If assigned a call to button action will be rendered with this text, if unassigned no button is rendered
		 * * `imageAssistiveText`: Image alt text, if not present heading will be used instead
		 * * `href`: Used for item link, if not provided 'javascript:void(0);' is used instead
		 * * `src`: Item image src value
		 */
		items: any[] /*.isRequired*/;
		/**
		 * Number of items to be displayed at a time in the carousel
		 */
		itemsPerPanel?: number;
		/**
		 * Accepts a custom carousel item rendering function
		 */
		onRenderItem?: (v: any) => any;
		/**
		 * Called whenever `isAutoplayOn` is requested to be toggled on or off. Use with `isAutoplayOn` prop for a controlled carousel component. Passes an event object and a data object with the current `isAutoplayOn` value as an attribute.
		 */
		onRequestAutoplayToggle?: (v: any) => any;
		/**
		 * Called whenever the panel is requested to change due to user interaction or auto-play. Use with `currentPanel` for a controlled carousel component. Passes an event object and a data object with `currentPanel` and `requestedPanel` attributes.
		 */
		onRequestPanelChange?: (v: any) => any;
		/**
		 * Handler for clicking on a carousel item
		 */
		onItemClick?: (v: any) => any;
	};
	/**
	 * A carousel allows multiple pieces of featured content to occupy an allocated amount of space.
	 * Currently panel index and auto play cannot be controlled by the app.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
