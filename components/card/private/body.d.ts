declare module '@salesforce/design-system-react/components/card/private/body' {
	import React from 'react';
	type Props = {
		/**
		 * Elements to place in the body.
		 */
		children?: React.ReactNode;
		/**
		 * CSS classes to be added to the card.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Set the HTML `id` of the body.
		 */
		id?: string;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
