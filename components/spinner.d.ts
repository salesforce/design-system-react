declare module '@salesforce/design-system-react/components/spinner' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `label`: Assistive text that is read out loud to screen readers.
		 */
		assistiveText?: Partial<{
			label?: string;
		}>;
		/**
		 * Custom css classes applied to Spinner container
		 */
		containerClassName?: string;
		/**
		 * Custom css properties applied to Spinner container
		 */
		containerStyle?: Record<string, any>;
		/**
		 * Render the spinner inside of a container.
		 */
		hasContainer?: boolean;
		/**
		 * Unique html id placed on div with role="status".
		 */
		id?: string;
		/**
		 * Adds delay of 300ms to the spinner
		 */
		isDelayed?: boolean;
		/**
		 * Add styling to support a spinner inside an input field.
		 */
		isInput?: boolean;
		/**
		 * Add styling to support an inline spinner inside of the document flow.
		 */
		isInline?: boolean;
		/**
		 * Determines the size of the spinner
		 */
		size?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large';
		/**
		 * Determines the color of the spinner: `base` is gray, `brand` is blue, and `inverse` is white.
		 */
		variant?: 'base' | 'brand' | 'inverse';
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
