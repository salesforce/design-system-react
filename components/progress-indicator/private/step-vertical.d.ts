declare module '@salesforce/design-system-react/components/progress-indicator/private/step-vertical' {
	import React from 'react';
	type Props = {
		/**
		 * Index of step. Used for id's if no step ID exists
		 */
		index?: number;
		/**
		 * Determines if the step has been completed
		 */
		isCompleted?: boolean;
		/**
		 * Determines if the step contains an error
		 */
		isError?: boolean;
		/**
		 * Determines if the step is currently selected (active)
		 */
		isSelected?: boolean;
		/**
		 * Step object. This is passed into event callbacks.
		 */
		step?: Record<string, any>;
		/**
		 * The variant of the parent progress indicator
		 */
		variant?: string;
	};
	/**
	 * StepVertical renders a step icon and its step label if applied
	 */
	function Component(props: Props): React.ReactNode;
	export default Component;
}
