declare module '@salesforce/design-system-react/components/tabs/panel' {
	import React from 'react';
	type Props = {
		/**
		 * The string or element that is handed off to the `<Tab />` component, ends up being the title and the label for the tab associated with its tab panel.
		 */
		label: string | React.ReactElement /*.isRequired*/;

		/**
		 * The `children` are the actual tab panels to be rendered. They get created by [tabs/index.jsx](./index.jsx) in the `renderTabPanels` function.
		 *
		 * Note that the `<TabsPanel />` component inserts a `div` element around the children, because React requires exactly one "parent" element returned. The `<TabPanel />` component simply dips down into `children` to get the children of this wrapping `div` so that it does not get rendered in the DOM.
		 */
		children?:
			| React.ReactNode[]
			| React.ReactNode
			| React.ReactElement /*.isRequired*/;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
