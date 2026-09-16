/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { ReactNode } from 'react';

import DataTableCell, { DataTableCellProps } from './cell';
import Highlighter from '../utilities/highlighter';

import { DATA_TABLE_CELL } from '../../utilities/constants';

export interface DataTableHighlightCellProps extends DataTableCellProps {
	/** The contents of the cell */
	children?: ReactNode;
	/** The string of text (or Regular Expression) to highlight */
	search?: string | RegExp;
}

/**
 * A Cell renderer for the DataTable that automatically highlights search text.
 */
const DataTableHighlightCell: React.FC<DataTableHighlightCellProps> = (props) => (
	<DataTableCell {...props}>
		<Highlighter search={props.search}>{props.children}</Highlighter>
	</DataTableCell>
);

// The DataTable looks for components with this name
DataTableHighlightCell.displayName = DATA_TABLE_CELL;

export default DataTableHighlightCell;
