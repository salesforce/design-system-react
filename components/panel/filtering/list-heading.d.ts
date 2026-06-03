import React from 'react';
type Props = {
	/**
	 * Heading for following PanelFilterList
	 */
	heading?: React.ReactNode | string;
	/**
	 * Displayed a heading for a locked list of filters
	 */
	isLocked?: boolean;
	/**
	 * Heading for a group of filters that are locked
	 */
	lockedHeading?: string;
};

declare function Component(props: Props): React.JSX.Element;
export default Component;
