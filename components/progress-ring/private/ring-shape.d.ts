declare module '@salesforce/design-system-react/components/progress-ring/private/ring-shape' {
	import React from 'react';
	type Props = {
		/**
		 * HTML id for component.
		 */
		id?: string;
		/**
		 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Decimal percentage drain of the ring [0.0 - 1.0]
		 */
		fillPercentDecimal?: number;
		/**
		 * Direction that the progress ring "flows." Default is counter-clockwise, or `drain`. For clockwise flow, use `fill`
		 */
		flowDirection?: 'drain' | 'fill';
		/**
		 * Size of the progress ring. Default is 'medium'
		 */
		size?: 'medium' | 'large';
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
