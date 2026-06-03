import React from 'react';
type Props = {
	/**
	 * Optional class name
	 */
	className?: any[] | Record<string, any> | string;
	/**
	 * Type of this controls component ('actions' or 'controls')
	 */
	type?: 'actions' | 'controls';
};

declare function Component(props: Props): React.JSX.Element;
export default Component;
