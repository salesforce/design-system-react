import React from 'react';
type Props = {
	/**
	 * Whether the item is active or not.
	 */
	active?: boolean;
	/**
	 * Determines position of separating bar.
	 */
	dividerPosition?: 'left' | 'right';
};

declare function Component(props: Props): React.JSX.Element;
export default Component;
