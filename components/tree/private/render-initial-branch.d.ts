declare module '@salesforce/design-system-react/components/tree/private/render-initial-branch' {
	import React from 'react';
	type Props = {
		/**
		 * HTML `id` of the wrapping container element.
		 */
		htmlId: number | string /*.isRequired*/;
		/*
		 * Class names to be added to the top-level `ul` element.
		 */
		initalClassName?: any[] | Record<string, any> | string;
		/*
		 * Styles to be added to the top-level `ul` element. Useful for `overflow:hidden`.
		 */
		initialStyle?: Record<string, any>;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
