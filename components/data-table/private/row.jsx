/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

// ### find
import find from 'lodash.find';

// ## Children
import Checkbox from '../../checkbox';
import Radio from '../../radio';

// ## Constants
import {
	DATA_TABLE_ROW,
	DATA_TABLE_ROW_ACTIONS,
	DATA_TABLE_CELL,
} from '../../../utilities/constants';

/**
 * Used internally, provides row rendering to the DataTable.
 */
class DataTableRow extends React.Component {
	// ### Display Name
	// Always use the canonical component name as the React display name.
	static displayName = DATA_TABLE_ROW;

	// ### Prop Types
	static propTypes = {
		assistiveText: PropTypes.shape({
			actionsHeader: PropTypes.string,
			columnSort: PropTypes.string,
			columnSortedAscending: PropTypes.string,
			columnSortedDescending: PropTypes.string,
			selectAllRows: PropTypes.string,
			selectRow: PropTypes.string,
		}),
		canSelectRows: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.oneOf(['checkbox', 'radio']),
		]),
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
		tableId: PropTypes.string,
	};

	isSelected = () => !!find(this.props.selection, this.props.item);

	handleToggle = (e, { checked }) =>
		this.props.onToggle(this.props.item, checked, e);

	// ### Render
	render() {
		const ariaProps = {};
		const isSelected = this.isSelected();

		if (this.props.canSelectRows) {
			ariaProps['aria-selected'] = isSelected ? 'true' : 'false';
		}

		// i18n
		return (
			<tr
				{...ariaProps}
				className={classNames({
					'slds-hint-parent': this.props.rowActions,
					'slds-is-selected': this.props.canSelectRows && isSelected,
				})}
			>
				{this.props.canSelectRows ? (
					<td
						role={this.props.fixedLayout ? 'gridcell' : null}
						className="slds-text-align_right"
						data-label={this.props.stacked ? 'Select Row' : undefined}
						style={{ width: '3.25rem' }}
					>
						{this.props.canSelectRows === 'radio' ? (
							<Radio
								assistiveText={{
									label: `${this.props.assistiveText.selectRow} ${Number(
										this.props.index
									) + 1}`,
								}}
								aria-labelledby={`${this.props.id}-SelectRow-label ${
									this.props.tableId
								}-SLDSDataTableHead-column-group-header-row-select`}
								checked={isSelected}
								className="slds-m-right_x-small"
								id={`${this.props.id}-SelectRow`}
								labelId={`${this.props.id}-SelectRow-label`}
								name={`${this.props.tableId}-SelectRow`}
								onChange={this.handleToggle}
							/>
						) : (
							<Checkbox
								assistiveText={{
									label: `${this.props.assistiveText.selectRow} ${Number(
										this.props.index
									) + 1}`,
								}}
								aria-labelledby={`${this.props.id}-SelectRow-label ${
									this.props.tableId
								}-SLDSDataTableHead-column-group-header-row-select`}
								checked={isSelected}
								id={`${this.props.id}-SelectRow`}
								labelId={`${this.props.id}-SelectRow-label`}
								name="SelectRow"
								onChange={this.handleToggle}
							/>
						)}
					</td>
				) : null}
				{this.props.columns.map((column) => {
					const { Cell } = column;
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
	}
}

export default DataTableRow;
