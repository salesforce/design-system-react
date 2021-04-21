/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ## Children
import DataTableCell from './cell';
import Highlighter from '../utilities/highlighter';

// ## Constants
import { DATA_TABLE_CELL } from '../../utilities/constants';

/**
 * A Cell renderer for the DataTable that automatically highlights search text.
 */
const DataTableHighlightCell = (props) => (
	<DataTableCell {...props}>
		<Highlighter search={props.search}>{props.children}</Highlighter>
	</DataTableCell>
);

// ### Display Name
// The DataTable looks for components with this name to determine what it should use to render a given column's cells.
DataTableHighlightCell.displayName = DATA_TABLE_CELL;

// ### Prop Types
DataTableHighlightCell.propTypes = {
	/**
	 * The contents of the cell. Equivalent to `props.item[props.property]`
	 */
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
	/**
	 * The string of text (or Regular Expression) to highlight.
	 */
	search: PropTypes.any,
};

export default DataTableHighlightCell;
