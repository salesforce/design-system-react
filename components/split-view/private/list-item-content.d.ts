import React from 'react';
type Props = {
	/**
	 * **Item to be displayed**
	 * * `label`: The main label displayed on the top left.
	 * * `topRightText`: The text displayed on the top right.
	 * * `bottomLeftText`: The text displayed on the bottom left.
	 * * `bottomRightText`: The text displayed on the bottom right.
	 */
	item?: Partial<{
		label?: string;
		topRightText?: string;
		bottomLeftText?: string;
		bottomRightText?: string;
	}>;
};

declare function Component(props: Props): React.JSX.Element;
export default Component;
