/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useCallback, useContext, useMemo, SyntheticEvent, ReactNode } from 'react';
import classNames from 'classnames';
import find from 'lodash.find';

import Checkbox from '../../checkbox';
import Radio from '../../radio';

import {
	DATA_TABLE_ROW,
	DATA_TABLE_ROW_ACTIONS,
	DATA_TABLE_CELL,
} from '../../../utilities/constants';

import InteractiveElement from '../interactive-element';
import CellContext from './cell-context';
import TableContext from './table-context';
import useContextHelper from './context-helper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InteractiveCheckbox = InteractiveElement(Checkbox as any) as React.ComponentType<any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InteractiveRadio = InteractiveElement(Radio as any) as React.ComponentType<any>;

interface DataTableItem {
	id: string;
	[key: string]: unknown;
}

interface DataTableColumnConfig {
	Cell: React.ComponentType<Record<string, unknown>>;
	props: {
		property?: string;
		truncate?: boolean;
		primaryColumn?: boolean;
		width?: string;
		[key: string]: unknown;
	};
}

interface AssistiveText {
	selectRow?: string;
	[key: string]: unknown;
}

export interface DataTableRowProps {
	assistiveText?: AssistiveText;
	canSelectRows?: boolean | 'checkbox' | 'radio';
	className?: string;
	columns?: DataTableColumnConfig[];
	fixedLayout?: boolean;
	id: string;
	index?: number;
	item: DataTableItem;
	onToggle?: (item: DataTableItem, selected: boolean, event: SyntheticEvent) => void;
	rowActions?: ReactNode;
	selection?: DataTableItem[];
	disabledSelection?: DataTableItem[];
	tableId?: string;
	rowIndex?: number;
	stacked?: boolean;
}

/**
 * Used internally, provides row rendering to the DataTable.
 */
const DataTableRow: React.FC<DataTableRowProps> = (props) => {
	const tableContext = useContext(TableContext);
	const selectRowCellContext = useMemo(
		() => ({
			rowIndex: props.rowIndex ?? 0,
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
		(_e: SyntheticEvent, { checked }: { checked: boolean }) => {
			if (onToggle) {
				onToggle(item, checked, _e);
			}
		},
		[item, onToggle]
	);

	const isSelected = !!find(props.selection, item);
	const isDisabled =
		props.disabledSelection && !!find(props.disabledSelection, item);

	const ariaProps = useMemo(() => {
		const result: { 'aria-selected'?: 'true' | 'false' } = {};

		if (props.canSelectRows) {
			result['aria-selected'] = isSelected ? 'true' : 'false';
		}
		return result;
	}, [isSelected, props.canSelectRows]);

	const radioSelection = useMemo(
		() =>
			isDisabled ? (
				<Radio
					assistiveText={{
						label: `${props.assistiveText?.selectRow} ${
							Number(props.index) + 1
						}`,
					}}
					aria-labelledby={`${props.id}-SelectRow-label ${props.tableId}-SLDSDataTableHead-column-group-header-row-select`}
					checked={isSelected}
					className="slds-m-right_x-small"
					id={`${props.id}-SelectRow`}
					labelId={`${props.id}-SelectRow-label`}
					name={`${props.tableId}-SelectRow`}
					disabled={isDisabled}
				/>
			) : (
				<InteractiveRadio
					assistiveText={{
						label: `${props.assistiveText?.selectRow} ${
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
					disabled={isDisabled}
				/>
			),
		[
			handleToggle,
			isSelected,
			isDisabled,
			props.assistiveText?.selectRow,
			props.id,
			props.index,
			props.tableId,
		]
	);

	const checkboxSelection = useMemo(
		() =>
			isDisabled ? (
				<Checkbox
					assistiveText={{
						label: `${props.assistiveText?.selectRow} ${
							Number(props.index) + 1
						}`,
					}}
					aria-labelledby={`${props.id}-SelectRow-label ${props.tableId}-SLDSDataTableHead-column-group-header-row-select`}
					checked={isSelected}
					id={`${props.id}-SelectRow`}
					labelId={`${props.id}-SelectRow-label`}
					name={`SelectRow${(props.index ?? 0) + 1}`}
					disabled={isDisabled}
				/>
			) : (
				<InteractiveCheckbox
					assistiveText={{
						label: `${props.assistiveText?.selectRow} ${
							Number(props.index) + 1
						}`,
					}}
					aria-labelledby={`${props.id}-SelectRow-label ${props.tableId}-SLDSDataTableHead-column-group-header-row-select`}
					checked={isSelected}
					id={`${props.id}-SelectRow`}
					labelId={`${props.id}-SelectRow-label`}
					name={`SelectRow${(props.index ?? 0) + 1}`}
					onChange={handleToggle}
					disabled={isDisabled}
				/>
			),
		[
			handleToggle,
			isSelected,
			isDisabled,
			props.assistiveText?.selectRow,
			props.id,
			props.index,
			props.tableId,
		]
	);

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
					<>
						{props.canSelectRows ? (
							<td
								role={props.fixedLayout ? 'gridcell' : undefined}
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
									{props.canSelectRows === 'radio'
										? radioSelection
										: checkboxSelection}
								</CellContext.Provider>
							</td>
						) : null}
						{props.columns?.map((column, index) => {
							const { Cell } = column;
							const cellId = `${props.id}-${DATA_TABLE_CELL}-${column.props.property}`;

							return (
								<CellContext.Provider
									key={cellId}
									value={{
										columnIndex: props.canSelectRows ? index + 1 : index,
										rowIndex: props.rowIndex ?? 0,
									}}
								>
									<Cell
										{...column.props}
										className={column.props.truncate ? 'slds-truncate' : undefined}
										fixedLayout={props.fixedLayout}
										rowHeader={column.props.primaryColumn}
										id={cellId}
										item={item}
										width={column.props.width}
										headerId={item.headerId}
										columns={props.columns}
									>
										{item[column.props.property || '']}
									</Cell>
								</CellContext.Provider>
							);
						})}
						<CellContext.Provider
							value={{
								columnIndex: props.canSelectRows
									? (props.columns?.length ?? 0) + 1
									: props.columns?.length ?? 0,
								rowIndex: props.rowIndex ?? 0,
							}}
						>
							{props.rowActions
								? React.cloneElement(
										props.rowActions as React.ReactElement<{
											id?: string;
											item?: DataTableItem;
											fixedLayout?: boolean;
										}>,
										{
											id: `${props.id}-${DATA_TABLE_ROW_ACTIONS}`,
											item,
											fixedLayout: props.fixedLayout,
										}
								  )
								: null}
						</CellContext.Provider>
					</>
				),
				[
					handleFocus,
					handleKeyDown,
					hasFocus,
					item,
					tabIndex,
					props.canSelectRows,
					props.columns,
					props.fixedLayout,
					props.id,
					props.rowActions,
					props.rowIndex,
					props.stacked,
					selectRowCellContext,
					checkboxSelection,
					radioSelection,
				]
			)}
		</tr>
	);
};

DataTableRow.displayName = DATA_TABLE_ROW;

export default DataTableRow;
