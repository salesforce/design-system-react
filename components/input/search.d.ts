declare module '@salesforce/design-system-react/components/input/search' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `label`: Assistive text to search input
		 */
		assistiveText?: Partial<{
			label?: string;
		}>;
		/**
		 * Adds a clear button to right side of the input
		 */
		clearable?: boolean;
		/**
		 * Triggers when the clear button is clicked
		 */
		onClear?: (v: any) => any;
		/**
		 * This event fires when enter is pressed in the `input` or the search button is clicked.
		 */
		onSearch?: (v: any) => any;
		/**
		 * Placeholder for the input
		 */
		placeholder?: string;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
