/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Tabs Component

// Implements the [Tabs design pattern](https://www.lightningdesignsystem.com/components/tabs/) in React.

// ## Dependencies

// ### React
import { type ReactNode } from 'react';

// ### classNames
import classNames from 'classnames';
import { TABS_LIST } from '../../../utilities/constants';
import { type TabsVariant } from '../index';

export interface TabsListProps {
	/**
	 * The `children` are the actual tabs to be rendered as `li` elements. They get created by [tabs/index.tsx](../index.tsx) in the `renderTabsList` function.
	 */
	children?: ReactNode;
	/**
	 * Class names to be added to the tabs list element.
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * Inherits the `id` from the parent `<Tabs />` component and appends `-tabs__nav`. Becomes the HTML `id` attribute of UL element that has the class `.slds-tabs_default__nav` on it.
	 */
	id?: string;
	/**
	 * If the Tabs should be scoped, vertical, or default (default value)
	 */
	variant?: TabsVariant;
}

const TabsList = ({ id, className, children, variant }: TabsListProps) => (
	<ul
		id={`${id}-slds-tabs__nav`}
		className={classNames(className as string, {
			'slds-tabs_default__nav': variant === 'default',
			'slds-tabs_scoped__nav': variant === 'scoped',
			'slds-vertical-tabs__nav': variant === 'vertical',
		})}
		role="tablist"
		aria-orientation={variant === 'vertical' ? 'vertical' : undefined}
	>
		{children}
	</ul>
);

TabsList.displayName = TABS_LIST;

export default TabsList;
