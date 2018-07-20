/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

// ### find
import find from 'lodash.find';

// ## Children
import Checkbox from '../../checkbox';

// ## Constants
import {
	DATA_TABLE_ROW,
	DATA_TABLE_ROW_ACTIONS,
	DATA_TABLE_CELL,
} from '../../../utilities/constants';

/**
 * Used internally, provides row rendering to the DataTable.
 */
const DataTableRow = createReactClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: DATA_TABLE_ROW,

	// ### Prop Types
	propTypes: {
		assistiveText: PropTypes.shape({
			actionsHeader: PropTypes.string,
			columnSort: PropTypes.string,
			columnSortedAscending: PropTypes.string,
			columnSortedDescending: PropTypes.string,
			selectAllRows: PropTypes.string,
			selectRow: PropTypes.string,
		}),
		canSelectRows: PropTypes.bool,
		columns: PropTypes.arrayOf(
			PropTypes.shape({
				Cell: PropTypes.func,
				props: PropTypes.object,
			})
		),
		/**
		 * Use this if you are creating an advanced table (selectable, sortable, or resizable rows)
		 */
		fixedLayout: PropTypes.bool,
		id: PropTypes.string.isRequired,
		item: PropTypes.object.isRequired,
		onToggle: PropTypes.func,
		rowActions: PropTypes.element,
		selection: PropTypes.array,
	},

	isSelected () {
		return !!find(this.props.selection, this.props.item);
	},

	handleToggle (e, { checked }) {
		return this.props.onToggle(this.props.item, checked, e);
	},

	// ### Render
	render () {
		const isSelected = this.isSelected();

		// i18n
		return (
			<tr
				className={classNames({
					'slds-hint-parent': this.props.rowActions,
					'slds-is-selected': this.props.canSelectRows && isSelected,
				})}
			>
				{this.props.canSelectRows ? (
					<td
						role={this.props.fixedLayout ? 'gridcell' : null}
						className="slds-text-align--right"
						data-label="Select Row"
						style={{ width: '3.25rem' }}
					>
						<Checkbox
							assistiveText={{
								label: this.props.assistiveText.selectRow,
							}}
							checked={isSelected}
							id={`${this.props.id}-SelectRow`}
							name="SelectRow"
							onChange={this.handleToggle}
						/>
					</td>
				) : null}
				{this.props.columns.map((column) => {
					const Cell = column.Cell;
					const cellId = `${this.props.id}-${DATA_TABLE_CELL}-${
						column.props.property
					}`;

					return (
						<Cell
							{...column.props}
							className={column.props.truncate ? 'slds-truncate' : null}
							fixedLayout={this.props.fixedLayout}
							rowHeader={column.props.primaryColumn}
							id={cellId}
							item={this.props.item}
							key={cellId}
							width={column.props.width}
						>
							{this.props.item[column.props.property]}
						</Cell>
					);
				})}
				{this.props.rowActions
					? React.cloneElement(this.props.rowActions, {
						id: `${this.props.id}-${DATA_TABLE_ROW_ACTIONS}`,
						item: this.props.item,
					})
					: null}
			</tr>
		);
	},
});

export default DataTableRow;
