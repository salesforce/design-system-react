/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Tabs Component

// Implements the [Tabs design pattern](https://www.lightningdesignsystem.com/components/tabs/) in React.

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';
import { TAB_PANEL } from '../../../utilities/constants';

/**
 * The containers of content that are shown and hidden by `Tabs`.
 */
const TabPanel = ({
	className,
	children,
	variant,
	selected,
	id,
	tabId,
	...attributes // eslint-disable-line no-unused-vars
}) => (
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
		{children.props.children}
	</div>
);

TabPanel.displayName = TAB_PANEL;

TabPanel.propTypes = {
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
	children: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),

	/**
	 * CSS classes to be added to the tab panel.
	 */
	className: PropTypes.string,

	/**
	 * The HTML ID of this tab panel. Also used by the `<Tab />`that controls it as `panelId`.
	 */
	id: PropTypes.string,

	/**
	 * Whether this panel is hidden or shown. Uses the `.slds-show` and `.slds-hide` classes.
	 */
	selected: PropTypes.bool,

	/**
	 * If the Tabs should be scoped, vertical, or default (default value)
	 */
	variant: PropTypes.oneOf(['default', 'scoped', 'vertical']),

	/**
	 * The HTML ID of the `<Tab />` that controls this panel.
	 */
	tabId: PropTypes.string,
};

TabPanel.defaultProps = {
	variant: 'default',
	selected: false,
};

export default TabPanel;
