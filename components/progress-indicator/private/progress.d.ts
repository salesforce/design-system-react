declare module '@salesforce/design-system-react/components/progress-indicator/private/progress' {
	import React from 'react';
	type Props = {
		/**
		 * Assistive text for percentage
		 */
		assistiveText?: Partial<{
			percentage?: string;
		}>;
		/**
		 * Steps in the component
		 */
		children?: React.ReactNode;
		/**
		 * CSS class names to be added to the container element.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * HTML id for component.
		 */
		id: string /*.isRequired*/;
		/**
		 * Determines the orientation of the progress indicator
		 */
		orientation?: 'horizontal' | 'vertical';
		/**
		 * Percentage of progress completion, ranging [0, 100]
		 */
		value: string /*.isRequired*/;
		/**
		 * Determines component style
		 */
		variant?: 'base' | 'modal' | 'setup-assistant';
	};
	/**
	 * Progress renders all step buttons and a container wrapping these buttongs and a progress bar
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
