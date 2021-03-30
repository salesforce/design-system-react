declare module '@salesforce/design-system-react/components/card/filter' {
	import React from 'react';
	type Props = {
		/**
		 * The HTML `id` from the card with a suffixe.
		 */
		id?: string;
		/**
		 * This callback fires when the input changes.
		 */
		onChange?: (v: any) => any;
		/**
		 * Text present in input until the user enters text. This text will also be used for a visually hidden label on the filter `input` element for accessibility.
		 */
		placeholder: string /*.isRequired*/;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
