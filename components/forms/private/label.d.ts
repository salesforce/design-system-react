declare module '@salesforce/design-system-react/components/forms/private/label' {
	import React from 'react';
	type Props = {
		/*
		 * Assistive Text to use instead of a visible label
		 */
		assistiveText?: Record<string, any>;
		/*
		 * Id of the input associated with this label
		 */
		htmlFor?: string;
		/*
		 * Input Label or inner node for formatting purposes
		 */
		label?: React.ReactNode | string;
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
