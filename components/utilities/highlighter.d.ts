import React from 'react';
type Props = {
	/**
	 * The full string to display.
	 */
	children?: string | number | boolean | React.ReactNode;
	className?: string;
	/**
	 * The string of text (or Regular Expression) to highlight.
	 */
	search?: PropTypes.any;
};

declare function Component(props: Props): React.JSX.Element;
export default Component;
