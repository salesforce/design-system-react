import React from 'react';
type Props = {
	/**
	 * Optional class name
	 */
	className?: any[] | Record<string, any> | string;
	/**
	 * Contents of info section
	 */
	content?: React.ReactNode;
	/**
	 * Variant passed down from page header
	 */
	variant?: string;
};

declare function Component(props: Props): React.JSX.Element;
export default Component;
