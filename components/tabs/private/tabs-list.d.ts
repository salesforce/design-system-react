declare module '@salesforce/design-system-react/components/tabs/private/tabs-list' {
	import React from 'react';
	type Props = {
		/**
		 * Inherits the `id` from the parent `<Tabs />` component and appends `-tabs__nav`. Becomes the HTML `id` attribute of UL element that has the class `.slds-tabs_default__nav` on it.
		 */
		id?: string;

		/**
		 * Class names to be added to the tabs list element.
		 */
		className?: any[] | Record<string, any> | string;

		/**
		 * The `children` are the actual tabs to be rendered as `li` elements. They get created by [tabs/index.jsx](./index.jsx) in the `renderTabsList` function.
		 */
		children?: Record<string, any> | any[];

		/**
		 * If the Tabs should be scopped, defaults to false
		 */
		variant?: 'default' | 'scoped';
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
