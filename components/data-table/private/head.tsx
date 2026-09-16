/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useContext, SyntheticEvent, ReactNode } from 'react';
import classNames from 'classnames';

import CellFixed from './cell-fixed';
import Checkbox from '../../checkbox';
import HeaderCell from './header-cell';
import InteractiveElement from '../interactive-element';
import CellContext from './cell-context';
import TableContext from './table-context';
import useContextHelper from './context-helper';

import { DATA_TABLE_HEAD } from '../../../utilities/constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InteractiveCheckbox = InteractiveElement(Checkbox as any) as React.ComponentType<any>;

interface DataTableColumnConfig {
	Cell: React.ComponentType<Record<string, unknown>>;
	props: Record<string, unknown>;
}

interface AssistiveText {
	actionsHeader?: string;
	selectAllRows?: string;
	selectRowGroup?: string;
	columnSort?: string;
	columnSortedAscending?: string;
	columnSortedDescending?: string;
}

interface ActionsHeaderProps {
	assistiveText?: string;
	columnIndex: number;
	fixedLayout?: boolean;
	fixedHeader?: boolean;
	headerRefs?: (ref: HTMLElement | null, index: 'action' | 'select' | number) => void;
}

const ActionsHeader: React.FC<ActionsHeaderProps> = (props) => {
	const tableContext = useContext(TableContext);
	const cellContext = { columnIndex: props.columnIndex, rowIndex: 0 };
	const { tabIndex, hasFocus, handleFocus, handleKeyDown } = useContextHelper(
		tableContext,
		cellContext,
		props.fixedLayout
	);
	const { fixedHeader } = props;

	const getContent = (style?: React.CSSProperties) => (
		<div className="slds-th__action" style={style}>
			<span className="slds-assistive-text">{props.assistiveText}</span>
		</div>
	);

	return (
		<th
			className={classNames({ 'slds-has-focus': hasFocus })}
			ref={(ref) => {
				if (props.headerRefs) {
					props.headerRefs(ref, 'action');
				}
				if (ref && hasFocus) {
					ref.focus();
				}
			}}
			scope="col"
			style={{
				height: fixedHeader ? 0 : undefined,
				lineHeight: fixedHeader ? 0 : undefined,
				width: '3.25rem',
			}}
			onFocus={handleFocus}
			onKeyDown={handleKeyDown}
			tabIndex={tabIndex}
		>
			{getContent(
				fixedHeader
					? {
							height: 0,
							overflow: 'hidden',
							paddingBottom: 0,
							paddingTop: 0,
							visibility: 'hidden',
					  }
					: undefined
			)}
			{fixedHeader ? (
				<CellFixed>
					{getContent({
						lineHeight: 1,
						width: '100%',
					})}
				</CellFixed>
			) : null}
		</th>
	);
};

interface SelectHeaderProps {
	allSelected?: boolean;
	assistiveText?: {
		selectAllRows?: string;
		selectRowGroup?: string;
	};
	canSelectRows?: boolean | 'checkbox' | 'radio';
	fixedHeader?: boolean;
	fixedLayout?: boolean;
	headerRefs?: (ref: HTMLElement | null, index: 'action' | 'select' | number) => void;
	id?: string;
	indeterminateSelected?: boolean;
	onToggleAll?: (event: SyntheticEvent, data: { checked: boolean }) => void;
}

const SelectHeader: React.FC<SelectHeaderProps> = (props) => {
	const tableContext = useContext(TableContext);
	const cellContext = { columnIndex: 0, rowIndex: 0 };
	const { tabIndex, hasFocus, handleFocus, handleKeyDown } = useContextHelper(
		tableContext,
		cellContext,
		props.fixedLayout
	);
	const { fixedHeader, canSelectRows } = props;

	const getContent = (
		idSuffix: string,
		style?: React.CSSProperties,
		ariaHidden?: boolean
	): ReactNode => {
		if (canSelectRows === 'radio') {
			if (!ariaHidden) {
				return (
					<div
						className="slds-truncate slds-assistive-text"
						id={`${props.id}-column-group-header-row-select`}
						title={props.assistiveText?.selectRowGroup}
					>
						{props.assistiveText?.selectRowGroup}
					</div>
				);
			}
			return null;
		}

		if (canSelectRows === true || canSelectRows === 'checkbox') {
			return (
				<div
					className="slds-th__action slds-th__action_form"
					aria-hidden={ariaHidden ? true : undefined}
					style={style}
				>
					{!ariaHidden ? (
						<span
							id={`${props.id}-column-group-header-row-select`}
							className="slds-assistive-text"
						>
							{props.assistiveText?.selectAllRows}
						</span>
					) : null}
					<InteractiveCheckbox
						assistiveText={{
							label: props.assistiveText?.selectAllRows,
						}}
						checked={props.allSelected}
						indeterminate={props.indeterminateSelected}
						id={`${props.id}-${idSuffix}`}
						name={!ariaHidden ? 'SelectAll' : undefined}
						onChange={props.onToggleAll}
					/>
				</div>
			);
		}

		return null;
	};

	return (
		<th
			className={classNames('slds-text-align_right', {
				'slds-has-focus': hasFocus,
			})}
			ref={(ref) => {
				if (props.headerRefs) {
					props.headerRefs(ref, 'select');
				}
				if (ref && hasFocus) {
					ref.focus();
				}
			}}
			scope="col"
			style={{
				height: fixedHeader ? 0 : undefined,
				lineHeight: fixedHeader ? 0 : undefined,
				width: '3.25rem',
			}}
			onFocus={handleFocus}
			onKeyDown={handleKeyDown}
			tabIndex={tabIndex}
		>
			<CellContext.Provider value={cellContext}>
				{getContent(
					'SelectAll-fixed-header',
					fixedHeader
						? {
								display: 'flex',
								height: 0,
								overflow: 'hidden',
								paddingBottom: 0,
								paddingTop: 0,
								visibility: 'hidden',
						  }
						: undefined,
					fixedHeader
				)}
				{fixedHeader ? (
					<CellFixed>
						{getContent('SelectAll', {
							display: 'flex',
							justifyContent: 'flex-end',
							lineHeight: 1,
							width: '100%',
						})}
					</CellFixed>
				) : null}
			</CellContext.Provider>
		</th>
	);
};

export interface DataTableHeadProps {
	assistiveText?: AssistiveText;
	allSelected?: boolean;
	headerRefs?: (ref: HTMLElement | null, index: 'action' | 'select' | number) => void;
	isHidden?: boolean;
	indeterminateSelected?: boolean;
	canSelectRows?: boolean | 'checkbox' | 'radio';
	columns?: DataTableColumnConfig[];
	fixedHeader?: boolean;
	fixedLayout?: boolean;
	id?: string;
	onToggleAll?: (event: SyntheticEvent, data: { checked: boolean }) => void;
	onSort?: (
		data: { property: string; sortDirection: 'asc' | 'desc' },
		event: SyntheticEvent
	) => void;
	showRowActions?: boolean;
}

/**
 * Used internally, provides header row rendering to the DataTable.
 */
const DataTableHead: React.FC<DataTableHeadProps> = (props) => {
	const getActionsHeader = () => {
		if (props.showRowActions) {
			return (
				<ActionsHeader
					assistiveText={props.assistiveText?.actionsHeader}
					columnIndex={
						props.canSelectRows
							? (props.columns?.length ?? 0) + 1
							: props.columns?.length ?? 0
					}
					fixedLayout={props.fixedLayout}
					fixedHeader={props.fixedHeader}
					headerRefs={props.headerRefs}
				/>
			);
		}
		return null;
	};

	const getSelectHeader = () => {
		if (props.canSelectRows) {
			return (
				<SelectHeader
					allSelected={props.allSelected}
					assistiveText={{
						selectAllRows: props.assistiveText?.selectAllRows,
						selectRowGroup: props.assistiveText?.selectRowGroup,
					}}
					canSelectRows={props.canSelectRows}
					fixedHeader={props.fixedHeader}
					fixedLayout={props.fixedLayout}
					headerRefs={props.headerRefs}
					id={props.id}
					indeterminateSelected={props.indeterminateSelected}
					onToggleAll={props.onToggleAll}
				/>
			);
		}
		return null;
	};

	const actionsHeader = getActionsHeader();
	const selectHeader = getSelectHeader();

	return (
		<thead
			className={classNames({
				'slds-assistive-text': props.isHidden,
			})}
		>
			<tr className="slds-line-height_reset">
				{selectHeader}
				{props.columns?.map((column, index) => (
					<CellContext.Provider
						key={`${props.id}-${column.props.property}`}
						value={{
							columnIndex: props.canSelectRows ? index + 1 : index,
							rowIndex: 0,
						}}
					>
						<HeaderCell
							assistiveText={props.assistiveText}
							cellRef={(ref) => {
								if (props.headerRefs) {
									props.headerRefs(ref, index);
								}
							}}
							fixedHeader={props.fixedHeader}
							fixedLayout={props.fixedLayout}
							id={`${props.id}-${column.props.property}`}
							onSort={props.onSort}
							{...column.props}
						/>
					</CellContext.Provider>
				))}
				{actionsHeader}
			</tr>
		</thead>
	);
};

DataTableHead.displayName = DATA_TABLE_HEAD;

export default DataTableHead;
