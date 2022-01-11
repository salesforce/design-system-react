declare module '@salesforce/design-system-react/components/progress-ring' {
	import React from 'react';
	type Props = {
		/**
		 * HTML id for component.
		 */
		id?: string;
		/**
		 * CSS classes to be added to tag with `.slds-progress-ring`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * The theme applied to the ring.
		 */
		theme?: 'active' | 'warning' | 'expired' | 'complete';
		/**
		 * Overrides the icon to be displayed.
		 */
		icon?: React.ReactNode;
		/**
		 * Display the icon associated with the theme.
		 */
		hasIcon?: boolean;
		/**
		 * Percentage of progress completion, ranging [0, 100].
		 */
		value: number /*.isRequired*/;
		/**
		 * Direction that the progress ring "flows." Default is counter-clockwise, or `drain`. For clockwise flow, use `fill`
		 */
		flowDirection?: 'drain' | 'fill';
		/**
		 * Size of the progress ring. Default is 'medium'
		 */
		size?: 'medium' | 'large';
	};
	/**
	 * Customizable and configurable progress ring. Will display progress in a circular progress bar factor, and is capable of displaying iconography inside of the ring structure.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
