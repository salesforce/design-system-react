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
		 * Triggered when click on individual steps. By default, it receives an event and returns all info passed to that step.
		 * users are able to re-define it by passing a function as a prop
		 */
		onClick?: (v: any) => any;
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
	function Component(props: Props): JSX.Element;
	export default Component;
}
