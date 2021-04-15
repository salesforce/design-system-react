declare module '@salesforce/design-system-react/components/welcome-mat/tile' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `completeIcon`: Text that is visually hidden but read aloud by screenreaders to tell the user what the complete icon means.
		 */
		assistiveText?: Partial<{
			completedIcon?: string;
		}>;
		/**
		 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * HTML id for component.
		 */
		id?: string;
		/**
		 * Title for the tile component.
		 */
		title?: string;
		/**
		 * Description for the tile component.
		 */
		description?: string;
		/**
		 * Href for the tile link
		 */
		href?: string;
		/**
		 * Icon for the tile
		 */
		icon?: React.ReactNode;
		/**
		 * Whether the tile is completed
		 */
		isComplete?: boolean;
		/**
		 * Variant of the Welcome Mat Tile
		 */
		variant?: 'steps' | 'info-only' | 'splash' | 'trailhead-connected';
	};
	/**
	 * Tile component item represents a tile in a Welcome Mat
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
