/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React, { useCallback, useContext, useMemo } from 'react';
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

import InteractiveElement from '../interactive-element';
import CellContext from '../private/cell-context';
import TableContext from '../private/table-context';
import useContextHelper from './context-helper';

const InteractiveCheckbox = InteractiveElement(Checkbox);
const InteractiveRadio = InteractiveElement(Radio);

const propTypes = {
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
	className: PropTypes.string,
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

/**
 * Used internally, provides row rendering to the DataTable.
 */
const DataTableRow = (props) => {
	const tableContext = useContext(TableContext);
	const selectRowCellContext = useMemo(
		() => ({
			rowIndex: props.rowIndex,
			columnIndex: 0,
		}),
		[props.rowIndex]
	);
	const { tabIndex, hasFocus, handleFocus, handleKeyDown } = useContextHelper(
		tableContext,
		selectRowCellContext,
		props.fixedLayout
	);

	const { item, onToggle } = props;
	const handleToggle = useCallback(
		(e, { checked }) => onToggle(item, checked, e),
		[item, onToggle]
	);

	const isSelected = !!find(props.selection, item);
	const ariaProps = useMemo(() => {
		const result = {};

		if (props.canSelectRows) {
			result['aria-selected'] = isSelected ? 'true' : 'false';
		}
		return result;
	}, [isSelected, props.canSelectRows]);

	// i18n
	return (
		<tr
			{...ariaProps}
			className={classNames(props.className, {
				'slds-hint-parent': props.rowActions,
				'slds-is-selected': props.canSelectRows && isSelected,
				'slds-has-focus': hasFocus,
			})}
		>
			{useMemo(
				() => (
					<React.Fragment>
						{props.canSelectRows ? (
							// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
							<td
								role={props.fixedLayout ? 'gridcell' : null}
								className="slds-text-align_right"
								data-label={props.stacked ? 'Select Row' : undefined}
								style={{ width: '3.25rem' }}
								onFocus={handleFocus}
								onKeyDown={handleKeyDown}
								ref={(ref) => {
									if (ref && hasFocus) {
										ref.focus();
									}
								}}
								tabIndex={tabIndex}
							>
								<CellContext.Provider value={selectRowCellContext}>
									{props.canSelectRows === 'radio' ? (
										<InteractiveRadio
											assistiveText={{
												label: `${props.assistiveText.selectRow} ${
													Number(props.index) + 1
												}`,
											}}
											aria-labelledby={`${props.id}-SelectRow-label ${props.tableId}-SLDSDataTableHead-column-group-header-row-select`}
											checked={isSelected}
											className="slds-m-right_x-small"
											id={`${props.id}-SelectRow`}
											labelId={`${props.id}-SelectRow-label`}
											name={`${props.tableId}-SelectRow`}
											onChange={handleToggle}
										/>
									) : (
										<InteractiveCheckbox
											assistiveText={{
												label: `${props.assistiveText.selectRow} ${
													Number(props.index) + 1
												}`,
											}}
											aria-labelledby={`${props.id}-SelectRow-label ${props.tableId}-SLDSDataTableHead-column-group-header-row-select`}
											checked={isSelected}
											id={`${props.id}-SelectRow`}
											labelId={`${props.id}-SelectRow-label`}
											name={`SelectRow${props.index + 1}`}
											onChange={handleToggle}
										/>
									)}
								</CellContext.Provider>
							</td>
						) : null}
						{props.columns.map((column, index) => {
							const { Cell } = column;
							const cellId = `${props.id}-${DATA_TABLE_CELL}-${column.props.property}`;

							return (
								<CellContext.Provider
									key={cellId}
									value={{
										columnIndex: props.canSelectRows ? index + 1 : index,
										rowIndex: props.rowIndex,
									}}
								>
									<Cell
										{...column.props}
										className={column.props.truncate ? 'slds-truncate' : null}
										fixedLayout={props.fixedLayout}
										rowHeader={column.props.primaryColumn}
										id={cellId}
										item={item}
										width={column.props.width}
										headerId={item.headerId}
										columns={props.columns}
									>
										{item[column.props.property]}
									</Cell>
								</CellContext.Provider>
							);
						})}
						<CellContext.Provider
							value={{
								columnIndex: props.canSelectRows
									? props.columns.length + 1
									: props.columns.length,
								rowIndex: props.rowIndex,
							}}
						>
							{props.rowActions
								? React.cloneElement(props.rowActions, {
										id: `${props.id}-${DATA_TABLE_ROW_ACTIONS}`,
										item,
										fixedLayout: props.fixedLayout,
								  })
								: null}
						</CellContext.Provider>
					</React.Fragment>
				),
				[
					handleFocus,
					handleKeyDown,
					handleToggle,
					hasFocus,
					isSelected,
					item,
					tabIndex,
					props.assistiveText.selectRow,
					props.canSelectRows,
					props.columns,
					props.fixedLayout,
					props.id,
					props.index,
					props.rowActions,
					props.rowIndex,
					props.stacked,
					props.tableId,
					selectRowCellContext,
				]
			)}
		</tr>
	);
};

DataTableRow.displayName = DATA_TABLE_ROW;
DataTableRow.propTypes = propTypes;
export default DataTableRow;
