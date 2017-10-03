/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Tabs: Panel child component
//
// Helps implement the [Tabs design pattern](https://www.lightningdesignsystem.com/components/tabs/) in React.
//
// The `<TabsPanel />` component allows us to simplify the structure of the `<Tabs />` component.
//
// Rather than require different (deeply nested) children for tabslist, with its tab(s) as well as tabpanel(s), we provide this TabsPanel component which takes a `label` property that will become what is shown on the `<Tab />` that will be associated with it.
//
// The `children` of the Panel will be fed to the `<TabPanel />` component, while its `label` is handled in `<Tab />`, via `<TabsList />`.
/**
 *
 * ```
 * <TabsPanel label="Tab 1">
 * 	<div>
 * 		<h2 className="slds-text-heading--medium">This is my tab 1 contents!</h2>
 * 		<p>They show when you click the first tab.</p>
 * 	</div>
 * </TabsPanel>
 * ```
 */

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ## Constants
import { TABS_PANEL } from '../../utilities/constants';

const Panel = ({ children }) => <div>{React.Children.toArray(children)}</div>;

Panel.displayName = TABS_PANEL;

Panel.propTypes = {
	/**
	 * The string or element that is handed off to the `<Tab />` component, ends up being the title and the label for the tab associated with its tab panel.
	 */
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]).isRequired,

	/**
	 * The `children` are the actual tab panels to be rendered. They get created by [tabs/index.jsx](./index.jsx) in the `renderTabPanels` function.
	 *
	 * Note that the `<TabsPanel />` component inserts a `div` element around the children, because React requires exactly one "parent" element returned. The `<TabPanel />` component simply dips down into `children` to get the children of this wrapping `div` so that it does not get rendered in the DOM.
	 */
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.element
	]).isRequired
};

export default Panel;
