/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # List Item Label Component

// ## Dependencies

// ### React
import { type ReactNode } from 'react';

// ## Constants
import { LIST_ITEM_LABEL } from '../../../utilities/constants';

export interface ListItemLabelProps {
	data?: Record<string, unknown>;
	icon?: ReactNode;
	index?: number;
	inverted?: boolean;
	isSelected?: boolean;
	label?: string;
	checkmark?: boolean;
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
