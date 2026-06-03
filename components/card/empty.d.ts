import React from 'react';
type Props = {
	/**
	 * Additional call to actions that will render under the heading. Often this is an "Add Item" button.
	 */
	children?: React.ReactNode;
	/**
	 * Primary text for an Empty Card.
	 */
	heading?: string;
};

declare function Component(props: Props): React.JSX.Element;
export default Component;
