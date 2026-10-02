/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { ReactNode } from 'react';

import SimpleDataTableCell, { SimpleDataTableCellProps } from './cell';
import Highlighter from '../utilities/highlighter';

import { SIMPLE_DATA_TABLE_CELL } from '../../utilities/constants';

export interface SimpleDataTableHighlightCellProps extends SimpleDataTableCellProps {
	/** The contents of the cell */
	children?: ReactNode;
	/** The string of text (or Regular Expression) to highlight */
	search?: string | RegExp;
}

/**
 * A Cell renderer for the SimpleDataTable that automatically highlights search text.
 */
const SimpleDataTableHighlightCell: React.FC<
	SimpleDataTableHighlightCellProps
> = (props) => (
	<SimpleDataTableCell {...props}>
		<Highlighter search={props.search}>{props.children}</Highlighter>
	</SimpleDataTableCell>
);

// The SimpleDataTable looks for components with this name
SimpleDataTableHighlightCell.displayName = SIMPLE_DATA_TABLE_CELL;

export default SimpleDataTableHighlightCell;
