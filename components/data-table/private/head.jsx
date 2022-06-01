/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// ## Children
import CellFixed from './cell-fixed';
import Checkbox from '../../checkbox';
import HeaderCell from './header-cell';
import InteractiveElement from '../interactive-element';
import CellContext from '../private/cell-context';
import TableContext from '../private/table-context';
import useContextHelper from './context-helper';

// ## Constants
import { DATA_TABLE_HEAD } from '../../../utilities/constants';

const InteractiveCheckbox = InteractiveElement(Checkbox);

// ### Prop Types
const propTypes = {
	assistiveText: PropTypes.shape({
		actionsHeader: PropTypes.string,
		columnSort: PropTypes.string,
		columnSortedAscending: PropTypes.string,
		columnSortedDescending: PropTypes.string,
		selectAllRows: PropTypes.string,
		selectRow: PropTypes.string,
	}),
	allSelected: PropTypes.bool,
	headerRefs: PropTypes.func,
	isHidden: PropTypes.bool,
	indeterminateSelected: PropTypes.bool,
	canSelectRows: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf(['checkbox', 'radio']),
	]),
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			Cell: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
			props: PropTypes.object,
		})
	),
	fixedHeader: PropTypes.bool,
	id: PropTypes.string,
	onToggleAll: PropTypes.func,
	onSort: PropTypes.func,
	showRowActions: PropTypes.bool,
};

const ActionsHeader = (props) => {
	const tableContext = useContext(TableContext);
	const cellContext = { columnIndex: props.columnIndex, rowIndex: 0 };
	const { tabIndex, hasFocus, handleFocus, handleKeyDown } = useContextHelper(
		tableContext,
		cellContext,
		props.fixedLayout
	);
	const { fixedHeader } = props;
	const getContent = (style) => (
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
				height: fixedHeader ? 0 : null,
				lineHeight: fixedHeader ? 0 : null,
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
					: null
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

const SelectHeader = (props) => {
	const tableContext = useContext(TableContext);
	const cellContext = { columnIndex: 0, rowIndex: 0 };
	const { tabIndex, hasFocus, handleFocus, handleKeyDown } = useContextHelper(
		tableContext,
		cellContext,
		props.fixedLayout
	);
	const { fixedHeader, canSelectRows } = props;
	const getContent = (idSuffix, style, ariaHidden) => {
		let render = null;

		if (canSelectRows === 'radio') {
			render = !ariaHidden ? (
				<div
					className="slds-truncate slds-assistive-text"
					id={`${props.id}-column-group-header-row-select`}
					title={props.assistiveText.selectRowGroup}
				>
					{props.assistiveText.selectRowGroup}
				</div>
			) : null;
		} else if (canSelectRows === true || canSelectRows === 'checkbox') {
			render = (
				<div
					className="slds-th__action slds-th__action_form"
					aria-hidden={ariaHidden && true}
					style={style}
				>
					{!ariaHidden ? (
						<span
							id={`${props.id}-column-group-header-row-select`}
							className="slds-assistive-text"
						>
							{props.assistiveText.selectAllRows}
						</span>
					) : null}
					<InteractiveCheckbox
						assistiveText={{
							label: props.assistiveText.selectAllRows,
						}}
						checked={props.allSelected}
						indeterminate={props.indeterminateSelected}
						id={`${props.id}-${idSuffix}`}
						// There is a checkbox for user interaction and a checkbox for positioning. ariaHidden is for the checkbox for positioning and it should be removed from the accessibility tree.
						name={!ariaHidden ? 'SelectAll' : undefined}
						onChange={props.onToggleAll}
					/>
				</div>
			);
		}

		return render;
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
				height: fixedHeader ? 0 : null,
				lineHeight: fixedHeader ? 0 : null,
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
						: null,
					fixedHeader && 'ariaHidden'
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

/**
 * Used internally, provides header row rendering to the DataTable.
 */
const DataTableHead = (props) => {
	const getActionsHeader = () => {
		let actionsHeader = null;

		if (props.showRowActions) {
			actionsHeader = (
				<ActionsHeader
					assistiveText={props.assistiveText.actionsHeader}
					columnIndex={
						props.canSelectRows
							? props.columns.length + 1
							: props.columns.length
					}
					fixedLayout={props.fixedLayout}
					fixedHeader={props.fixedHeader}
					headerRefs={props.headerRefs}
				/>
			);
		}

		return actionsHeader;
	};

	const getSelectHeader = () => {
		const { canSelectRows } = props;
		let selectHeader = null;

		if (canSelectRows) {
			selectHeader = (
				<SelectHeader
					allSelected={props.allSelected}
					assistiveText={{
						selectAllRows: props.assistiveText.selectAllRows,
						selectRowGroup: props.assistiveText.selectRowGroup,
					}}
					canSelectRows={canSelectRows}
					fixedHeader={props.fixedHeader}
					fixedLayout={props.fixedLayout}
					headerRefs={props.headerRefs}
					id={props.id}
					indeterminateSelected={props.indeterminateSelected}
					onToggleAll={props.onToggleAll}
				/>
			);
		}

		return selectHeader;
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
				{props.columns.map((column, index) => (
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

// ### Display Name
// Always use the canonical component name as the React display name.
DataTableHead.displayName = DATA_TABLE_HEAD;
DataTableHead.propTypes = propTypes;

export default DataTableHead;
