import React from 'react';
type Props = {
	/**
	 * Sets the vertical alignment on the title
	 */
	align?: 'top' | 'middle' | 'bottom';
	/**
	 * Optional class name
	 */
	className?: any[] | Record<string, any> | string;
	/**
	 * The title content
	 */
	content?: React.ReactNode;
	/**
	 * Label node, for variants that require a label within the title
	 */
	label?: React.ReactNode;
	/**
	 * Sets whether the title will truncate its content responsively.
	 */
	truncate?: boolean;
};

declare function Component(props: Props): React.JSX.Element;
export default Component;
