import React from 'react';
type Props = {
	/**
	 * The contents of the cell. Equivalent to `props.item[props.property]`
	 */
	children?: React.ReactNode | string;
	/**
	 * The string of text (or Regular Expression) to highlight.
	 */
	search?: PropTypes.any;
};

declare function Component(props: Props): React.JSX.Element;
export default Component;
