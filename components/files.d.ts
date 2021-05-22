declare module '@salesforce/design-system-react/components/files' {
	import React from 'react';
	type Props = {
		/**
		 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * HTML id for component.
		 */
		id?: string;
		/**
		 * Crop ratio for the file preview image
		 */
		crop?: '16-by-9' | '4-by-3' | '1-by-1';
		/**
		 * Column class names to be added each file in the grid
		 */
		columnClassName?: string;
	};
	/**
	 * Files is a component that wraps multiple file components that represent an attachment
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
