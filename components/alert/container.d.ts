import React from 'react';
type Props = {
	/**
	 * CSS classes to be added to tag with `.slds-notify_alert`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className?: any[] | Record<string, any> | string;
	/**
	 * Alert components
	 */
	children?: React.ReactNode;
};
/**
 * A fixed container for alert banners.
 */
declare function Component(props: Props): React.JSX.Element;
export default Component;
