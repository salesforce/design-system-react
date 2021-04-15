declare module '@salesforce/design-system-react/components/utilities/label' {
	import React from 'react';
	type Props = {
		/*
		 * Assistive Text to use instead of a visible label
		 */
		assistiveText?: Record<string, any>;
		/**
		 * Class names to be added to the label
		 */
		className?: any[] | Record<string, any> | string;
		/*
		 * Id of the input associated with this label
		 */
		htmlFor?: string;
		/*
		 * Input Label
		 */
		label?: string;
		/*
		 * Applies label styling for a required form element
		 */
		required?: boolean;
		/**
		 * Changes markup of label.
		 */
		variant?: 'base' | 'static';
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
