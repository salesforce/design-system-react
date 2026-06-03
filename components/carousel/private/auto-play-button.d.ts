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

declare function Component(props: Props): React.JSX.Element;
export default Component;
