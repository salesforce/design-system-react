/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	forwardRef,
	useCallback,
	useContext,
	useMemo,
	SyntheticEvent,
	ReactNode,
} from 'react';
import classNames from 'classnames';

import Checkbox from '../../checkbox';
import Radio, { type RadioProps } from '../../radio';

import {
	SIMPLE_DATA_TABLE_ROW,
	SIMPLE_DATA_TABLE_ROW_ACTIONS,
	SIMPLE_DATA_TABLE_CELL,
} from '../../../utilities/constants';

import InteractiveElement from '../interactive-element';
import type {
	SimpleDataTableAssistiveText,
	SimpleDataTableColumnConfig,
	SimpleDataTableItem,
} from '../types';
import CellContext from './cell-context';
import TableContext from './table-context';
import useContextHelper from './context-helper';
import { getCornerRowStyle, getCornerStyle } from './corner-style';

/* eslint-disable @typescript-eslint/no-explicit-any */
const InteractiveCheckbox = InteractiveElement(
	Checkbox as any
) as React.ComponentType<any>;
// Radio takes its `<input>` ref through `refs.input`, not `ref`. Without a `ref`,
// InteractiveElement would focus it through Radio's deprecated `requestFocus`
// and `onRequestFocus` props, which warn.
const RadioWithRef = forwardRef<HTMLInputElement, RadioProps>((props, ref) => (
	<Radio
		{...props}
		refs={{
			input: (input: HTMLInputElement | null) => {
				if (typeof ref === 'function') {
					ref(input);
				} else if (ref) {
					ref.current = input;
				}
			},
		}}
	/>
));
RadioWithRef.displayName = 'SimpleDataTableRadio';
const InteractiveRadio = InteractiveElement(
	RadioWithRef as any
) as React.ComponentType<any>;
/* eslint-enable @typescript-eslint/no-explicit-any */

export interface SimpleDataTableRowProps {
	assistiveText?: SimpleDataTableAssistiveText;
	canSelectRows?: boolean | 'checkbox' | 'radio';
	className?: string;
	columns?: SimpleDataTableColumnConfig[];
	fixedLayout?: boolean;
	id: string;
	index?: number;
	item: SimpleDataTableItem;
	onToggle?: (
		item: SimpleDataTableItem,
		selected: boolean,
		event: SyntheticEvent
	) => void;
	rowActions?: ReactNode;
	/** Whether the row's item is in the table's `selection` (matched by `id`) */
	isSelected?: boolean;
	/** Whether the row's item is in the table's `disabledSelection` (matched by `id`) */
	isDisabled?: boolean;
	tableId?: string;
	rowIndex?: number;
	stacked?: boolean;
	/** The row is the table's top row (the header is hidden) */
	isFirstRow?: boolean;
	/** The row is the table's bottom row */
	isLastRow?: boolean;
}

/**
 * Used internally, provides row rendering to the SimpleDataTable.
 */
const SimpleDataTableRow: React.FC<SimpleDataTableRowProps> = (props) => {
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

	// Selection is controlled: the checkbox or radio always renders the table's
	// `selection` prop (`checked` is always passed, never `defaultChecked`).
	const isSelected = !!props.isSelected;
	const isDisabled = !!props.isDisabled;

	const { item, onToggle } = props;
	const handleToggle = useCallback(
		(_e: SyntheticEvent, { checked }: { checked: boolean }) => {
			// A disabled row never requests a selection change.
			if (onToggle && !isDisabled) {
				onToggle(item, checked, _e);
			}
		},
		[isDisabled, item, onToggle]
	);

	const { isFirstRow, isLastRow } = props;
	const columnCount = props.columns?.length ?? 0;
	const getColumnCornerStyle = useCallback(
		(index: number) =>
			getCornerStyle({
				isFirstRow,
				isLastRow,
				isFirstColumn: index === 0 && !props.canSelectRows,
				isLastColumn: index === columnCount - 1 && !props.rowActions,
			}),
		[columnCount, isFirstRow, isLastRow, props.canSelectRows, props.rowActions]
	);

	const ariaProps = useMemo(() => {
		const result: { 'aria-selected'?: 'true' | 'false' } = {};

		if (props.canSelectRows) {
			result['aria-selected'] = isSelected ? 'true' : 'false';
		}
		return result;
	}, [isSelected, props.canSelectRows]);

	const radioSelection = useMemo(() => {
		// Disabled rows are not registered for keyboard navigation.
		const RadioComponent = isDisabled ? Radio : InteractiveRadio;
		return (
			<RadioComponent
				assistiveText={{
					label: `${props.assistiveText?.selectRow} ${Number(props.index) + 1}`,
				}}
				aria-labelledby={`${props.id}-SelectRow-label ${props.tableId}-SLDSSimpleDataTableHead-column-group-header-row-select`}
				checked={isSelected}
				className="slds-m-right_x-small"
				id={`${props.id}-SelectRow`}
				labelId={`${props.id}-SelectRow-label`}
				name={`${props.tableId}-SelectRow`}
				onChange={handleToggle}
				disabled={isDisabled}
			/>
		);
	}, [
		handleToggle,
		isSelected,
		isDisabled,
		props.assistiveText?.selectRow,
		props.id,
		props.index,
		props.tableId,
	]);

	const checkboxSelection = useMemo(() => {
		// Disabled rows are not registered for keyboard navigation.
		const CheckboxComponent = isDisabled ? Checkbox : InteractiveCheckbox;
		return (
			<CheckboxComponent
				assistiveText={{
					label: `${props.assistiveText?.selectRow} ${Number(props.index) + 1}`,
				}}
				aria-labelledby={`${props.id}-SelectRow-label ${props.tableId}-SLDSSimpleDataTableHead-column-group-header-row-select`}
				checked={isSelected}
				id={`${props.id}-SelectRow`}
				labelId={`${props.id}-SelectRow-label`}
				name={`SelectRow${(props.index ?? 0) + 1}`}
				onChange={handleToggle}
				disabled={isDisabled}
			/>
		);
	}, [
		handleToggle,
		isSelected,
		isDisabled,
		props.assistiveText?.selectRow,
		props.id,
		props.index,
		props.tableId,
	]);

	return (
		<tr
			{...ariaProps}
			className={classNames(props.className, {
				'slds-hint-parent': props.rowActions,
				'slds-is-selected': props.canSelectRows && isSelected,
				'slds-has-focus': hasFocus,
			})}
			style={getCornerRowStyle({ isFirstRow, isLastRow })}
		>
			{useMemo(
				() => (
					<>
						{props.canSelectRows ? (
							<td
								role={tableContext.isGrid ? 'gridcell' : undefined}
								className="slds-text-align_right"
								data-label={props.stacked ? 'Select Row' : undefined}
								style={{
									...getCornerStyle({
										isFirstRow,
										isLastRow,
										isFirstColumn: true,
										isLastColumn: columnCount === 0 && !props.rowActions,
									}),
									width: '3.25rem',
								}}
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
							const cellId = `${props.id}-${SIMPLE_DATA_TABLE_CELL}-${column.props.property}`;

							return (
								<CellContext.Provider
									key={cellId}
									value={{
										columnIndex: props.canSelectRows ? index + 1 : index,
										rowIndex: props.rowIndex ?? 0,
										cornerStyle: getColumnCornerStyle(index),
									}}
								>
									<Cell
										{...column.props}
										label={
											typeof column.props.label === 'string'
												? column.props.label
												: undefined
										}
										className={
											column.props.truncate ? 'slds-truncate' : undefined
										}
										fixedLayout={props.fixedLayout}
										rowHeader={column.props.primaryColumn}
										id={cellId}
										item={item}
										width={column.props.width}
										headerId={item.headerId}
										columns={props.columns}
									>
										{
											(item as Record<string, ReactNode>)[
												column.props.property || ''
											]
										}
									</Cell>
								</CellContext.Provider>
							);
						})}
						<CellContext.Provider
							value={{
								columnIndex: props.canSelectRows
									? (props.columns?.length ?? 0) + 1
									: (props.columns?.length ?? 0),
								rowIndex: props.rowIndex ?? 0,
								cornerStyle: getCornerStyle({
									isFirstRow,
									isLastRow,
									isFirstColumn: columnCount === 0 && !props.canSelectRows,
									isLastColumn: true,
								}),
							}}
						>
							{props.rowActions
								? React.cloneElement(
										props.rowActions as React.ReactElement<{
											id?: string;
											item?: SimpleDataTableItem;
											fixedLayout?: boolean;
										}>,
										{
											id: `${props.id}-${SIMPLE_DATA_TABLE_ROW_ACTIONS}`,
											item,
											fixedLayout: props.fixedLayout,
										}
									)
								: null}
						</CellContext.Provider>
					</>
				),
				[
					columnCount,
					getColumnCornerStyle,
					handleFocus,
					handleKeyDown,
					hasFocus,
					isFirstRow,
					isLastRow,
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
					tableContext.isGrid,
				]
			)}
		</tr>
	);
};

SimpleDataTableRow.displayName = SIMPLE_DATA_TABLE_ROW;

export default SimpleDataTableRow;
