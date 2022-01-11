declare module '@salesforce/design-system-react/components/tabs/private/tab-panel' {
	import React from 'react';
	type Props = {
		/**
		 * The `children` are the contents of the tab panel.
		 *
		 * Note that the structure of the `<Tabs />` component **does not** correspond to the DOM structure that is rendered. The `<Tabs />` component requires one or more children of type `<TabsPanel />`, which themselves require a `label` property which will be what shows in the `<Tab />` and has `children`, which end up being the _contents of the tab's corresponding panel_.
		 *
		 * The component iterates through each `<TabsPanel />` and rendering one `<Tab />` and one `<TabPanel />` for each of them. The tab(s) end up being children of the `<TabsList />`.
		 *
		 * The tab panel component actually returns the _children_ of the _children_ which were provided by the `<TabsPanel />` component.
		 *
		 * Due to React's nature, the `<TabsPanel />` component wraps its children in a `div` element which we don't need nor want in our rendered DOM structure, so we just bypass it and get its kids via `{children.props.children}` in the render method below.
		 * ```
		 * <Tabs>
		 * 	<TabsPanel label="Tab 1">
		 * 		<h2 className="slds-text-heading_medium">This is my tab 1 contents!</h2>
		 * 		<p>They show when you click the first tab.</p>
		 * 	</TabsPanel>
		 * 	<TabsPanel label="Tab 2">
		 * 		<h2 className="slds-text-heading_medium">This is my tab 2 contents!</h2>
		 * 		<p>They show when you click the second tab.</p>
		 * 	</TabsPanel>
		 * </Tabs>
		 * ```
		 */
		children?: any[] | Record<string, any> | string;

		/**
		 * CSS classes to be added to the tab panel.
		 */
		className?: string;

		/**
		 * The HTML ID of this tab panel. Also used by the `<Tab />`that controls it as `panelId`.
		 */
		id?: string;

		/**
		 * Whether this panel is hidden or shown. Uses the `.slds-show` and `.slds-hide` classes.
		 */
		selected?: boolean;

		/**
		 * If the Tabs should be scopped, defaults to false
		 */
		variant?: 'default' | 'scoped';

		/**
		 * The HTML ID of the `<Tab />` that controls this panel.
		 */
		tabId?: string;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
