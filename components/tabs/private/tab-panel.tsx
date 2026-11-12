/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Tabs Component

// Implements the [Tabs design pattern](https://www.lightningdesignsystem.com/components/tabs/) in React.

// ## Dependencies

// ### React
import { type ReactElement, type ReactNode } from 'react';

// ### classNames
import classNames from 'classnames';
import { TAB_PANEL } from '../../../utilities/constants';
import { type TabsVariant } from '../index';

export interface TabPanelProps {
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
	 */
	children?: ReactElement<{ children?: ReactNode }>;
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
	 * The HTML ID of the `<Tab />` that controls this panel.
	 */
	tabId?: string;
	/**
	 * If the Tabs should be scoped, vertical, or default (default value)
	 */
	variant?: TabsVariant;
}

/**
 * The containers of content that are shown and hidden by `Tabs`.
 */
const TabPanel = ({
	className,
	children,
	variant = 'default',
	selected = false,
	id,
	tabId,
}: TabPanelProps) => (
	<div
		aria-labelledby={tabId}
		className={classNames(className, {
			'slds-show': selected,
			'slds-hide': !selected,
			'slds-tabs_default__content': variant === 'default',
			'slds-tabs_scoped__content': variant === 'scoped',
			'slds-vertical-tabs__content': variant === 'vertical',
		})}
		id={id}
		role="tabpanel"
	>
		{children?.props.children}
	</div>
);

TabPanel.displayName = TAB_PANEL;

export default TabPanel;
