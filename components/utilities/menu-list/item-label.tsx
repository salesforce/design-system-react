/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # List Item Label Component

// ## Dependencies

// ### React
import { type ReactNode } from 'react';

// ## Constants
import { LIST_ITEM_LABEL } from '../../../utilities/constants';

/**
 * Props a menu item passes to its label renderer (`renderLabel` or
 * `labelRenderer`), taken from the menu option.
 */
export interface ListItemLabelProps {
	/** The option's `data`. */
	data?: Record<string, unknown>;
	/** The rendered left icon, or the checkmark in the checkmark variant. */
	icon?: ReactNode;
	/** Index of the item in the menu. */
	index?: number;
	/** Whether the menu uses the inverse color scheme. */
	inverted?: boolean;
	/** Whether the item is selected. */
	isSelected?: boolean;
	/** The option's `label`. Also used as the `title`. */
	label?: string;
	/** Whether the item shows a checkmark when selected. */
	checkmark?: boolean;
	/** The option's `value`. */
	value?: unknown;
}

/**
 * Component description.
 */
const ListItemLabel = ({ label = '', icon }: ListItemLabelProps) => (
	<span className="slds-truncate" title={label}>
		{icon}
		{label}
	</span>
);

ListItemLabel.displayName = LIST_ITEM_LABEL;

export default ListItemLabel;
