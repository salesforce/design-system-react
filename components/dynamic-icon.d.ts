declare module '@salesforce/design-system-react/components/dynamic-icon' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 * * `label`: Used as a visually hidden label to describe the dynamic icon.
		 */
		assistiveText?: Partial<{
			label?: string;
		}>;
		/**
		 * CSS class names to be added to the icon.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Pauses the icon animation if the value is true.
		 */
		isPaused?: boolean;
		/**
		 * Disables icon animation if set to true
		 */
		isStatic?: boolean;
		/**
		 * Polarity values for the 'score' variant. Defaults to 'positive'
		 */
		scorePolarity?: 'positive' | 'negative';
		/**
		 * Range of strength values for the 'strength' variant. Defaults to '0'.
		 */
		strengthLevel?:
			| '-3'
			| '-2'
			| '-1'
			| '0'
			| '1'
			| '2'
			| '3'
			| -3
			| -2
			| -1
			| 0
			| 1
			| 2
			| 3;
		/**
		 * HTML title attribute.
		 */
		title: string /*.isRequired*/;
		/**
		 * Signals direction for the 'trend' variant. The default value 'neutral' points to the east.
		 */
		trendDirection?: 'down' | 'up' | 'neutral';
		/**
		 * Different types of dynamic icons. Possible variants:
		 *
		 * `ellie` - Displays a pulsing blue circle, which pulses and stops after one animation cycle.
		 * `eq` - Displays an animated graph with three bars that rise and fall randomly.
		 * `score` - Displays a green filled circle or a red unfilled circle.
		 * `strength` - Displays three animated horizontal circles that are colored green or red.
		 * `trend` - Displays animated arrows that point up, down, or straight.
		 * `waffle` - Displays a 3x3 grid of dots that animates on hover.
		 */
		variant?:
			| 'ellie'
			| 'eq'
			| 'score'
			| 'strength'
			| 'trend'
			| 'typing'
			| 'waffle' /*.isRequired*/;
	};
	/**
	 * A set of delightful animated icons.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
