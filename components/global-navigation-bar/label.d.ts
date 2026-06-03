import React from 'react';
type Props = {
	/**
	 * Class names to be added to the `span` element
	 */
	className?: any[] | Record<string, any> | string;
	/**
	 * Determines position of separating bar.
	 */
	dividerPosition?: 'left' | 'right';
	/**
	 * Id string applied to first <span> inside of <li>
	 */
	id?: string;
	/**
	 * Text to show
	 */
	label?: string;
};

declare function Component(props: Props): React.JSX.Element;
export default Component;
