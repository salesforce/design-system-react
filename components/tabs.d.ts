declare module '@salesforce/design-system-react/components/tabs' {
	import React from 'react';
	type Props = {
		/**
		 * HTML `id` attribute of primary element that has `.slds-tabs_default` on it. Optional: If one is not supplied, a `shortid` will be created.
		 */
		id?: string;

		/**
		 * The `children` are the actual tabs and panels to be displayed.
		 *
		 * Note that the structure of the `<Tabs />` component **does not** correspond to the DOM structure that is rendered. The `<Tabs />` component requires one or more children of type `<TabsPanel />`, which themselves require a `label` property which will be what shows in the `<Tab />` and has `children`, which end up being the _contents of the tab's corresponding panel_.
		 *
		 * The component iterates through each `<TabsPanel />` and rendering one `<Tab />` and one `<TabPanel />` for each of them. The tab(s) end up being children of the `<TabsList />`.
		 *
		 * ```
		 * <Tabs>
		 * 	<TabsPanel label="Tab 1">
		 * 		<div>
		 * 			<h2 className="slds-text-heading_medium">This is my tab 1 contents!</h2>
		 * 			<p>They show when you click the first tab.</p>
		 * 		</div>
		 * 	</TabsPanel>
		 * 	<TabsPanel label="Tab 2">
		 * 		<div>
		 * 			<h2 className="slds-text-heading_medium">This is my tab 2 contents!</h2>
		 * 			<p>They show when you click the second tab.</p>
		 * 		</div>
		 * 	</TabsPanel>
		 * </Tabs>
		 * ```
		 */
		children?:
			| React.ReactNode[]
			| React.ReactNode
			| React.ReactElement /*.isRequired*/;

		/**
		 * Class names to be added to the container element and is passed along to its children.
		 */
		className?: any[] | Record<string, any> | string;

		/**
		 * The Tab (and corresponding TabPanel) that is selected when the component first renders. Defaults to `0`.
		 */
		defaultSelectedIndex?: number;

		/**
		 * This function triggers when a tab is selected.
		 */
		onSelect?: (v: any) => any;

		/**
		 * If the Tabs should be scopped, defaults to false
		 */
		variant?: 'default' | 'scoped';

		/**
		 * The Tab (and corresponding TabPanel) that is currently selected.
		 */
		selectedIndex?: number;
	};
	/**
	 * A tab keeps related content in a single container that is shown and hidden through navigation.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
