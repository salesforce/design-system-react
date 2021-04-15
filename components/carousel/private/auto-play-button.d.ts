declare module '@salesforce/design-system-react/components/carousel/private/auto-play-button' {
	import React from 'react';
	type Props = {
		/**
		 * Description of the start/pause autoplay button for screen-readers.
		 */
		assistiveText?: string;
		/**
		 * Indicates whether autoplay is enabled
		 */
		isAutoplayOn?: boolean;
		/**
		 * Triggered when the autoplay button is clicked.
		 */
		onClick?: (v: any) => any;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
