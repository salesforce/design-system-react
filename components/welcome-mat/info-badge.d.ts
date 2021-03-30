declare module '@salesforce/design-system-react/components/welcome-mat/info-badge' {
	import React from 'react';
	type Props = {
		/**
		 *  **Assistive text for accessibility.**
		 * * `completed` : For users of assistive technology, assistive text for completed icon.
		 */
		assistiveText?: Partial<{
			completed?: string;
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
		 * Icon for the tile
		 */
		image?: string;
		/**
		 * Whether the trail is completed
		 */
		isComplete?: boolean;
		/**
		 * Actions to be rendered on completion of the trail
		 */
		onCompleteRenderActions?: (v: any) => any;
	};
	/**
	 * InfoBadge component item represents a tile in a Welcome Mat
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
