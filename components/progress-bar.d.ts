declare module '@salesforce/design-system-react/components/progress-bar' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 * This object is merged with the default props object on every render.
		 * * `progress`: This is a visually hidden label for the percent of progress.
		 * _Tested with snapshot testing._
		 */
		assistiveText?: Partial<{ progress?: string }>;
		/**
		 * HTML id for component.
		 */
		id?: string;
		/**
		 * CSS classes to be added to tag with `.slds-progress-bar`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Label for the progress bar
		 */
		labels?: Partial<{
			label?: string | React.ReactNode;
			complete?: string | React.ReactNode;
		}>;
		/**
		 *  Set radius of progress bar
		 */
		radius?: 'circular';
		/**
		 *  Set fill of progress bar
		 */
		color?: 'success';
		/**
		 *  Set progress bar thickness
		 */
		thickness?: 'x-small' | 'small' | 'medium' | 'large';
		/**
		 * Percentage of progress completion, ranging [0, 100].
		 */
		value: number /*.isRequired*/;
		/**
		 * Orientation of the progress bar to be used
		 */
		orientation?: 'horizontal' | 'vertical';
		/**
		 * Custom styles to be passed to the component
		 */
		style?: Record<string, any>;
	};
	/**
	 * A progress bar component communicates to the user the progress of a particular process
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
