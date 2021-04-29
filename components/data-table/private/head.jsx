/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// ## Children
import CellFixed from './cell-fixed';
import Checkbox from '../../checkbox';
import HeaderCell from './header-cell';
import InteractiveElement from '../interactive-element';
import CellContext from '../private/cell-context';
import TableContext from '../private/table-context';
import contextHelper from './context-helper';

// ## Constants
import { DATA_TABLE_HEAD } from '../../../utilities/constants';

const InteractiveCheckbox = InteractiveElement(Checkbox);

/**
 * Used internally, provides header row rendering to the DataTable.
 */
class DataTableHead extends React.Component {
	// ### Display Name
	// Always use the canonical component name as the React display name.
	static displayName = DATA_TABLE_HEAD;

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
		allSelected: PropTypes.bool,
		headerRefs: PropTypes.func,
		indeterminateSelected: PropTypes.bool,
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
		fixedHeader: PropTypes.bool,
		id: PropTypes.string,
		onToggleAll: PropTypes.func,
		onSort: PropTypes.func,
		showRowActions: PropTypes.bool,
	};

	getActionsHeader = () => {
		const { fixedHeader } = this.props;
		const getContent = (style) => (
			<div className="slds-th__action" style={style}>
				<span className="slds-assistive-text">
					{this.props.assistiveText.actionsHeader}
				</span>
			</div>
		);
		let actionsHeader = null;

		if (this.props.showRowActions) {
			actionsHeader = (
				<TableContext.Consumer>
					{(tableContext) => {
						const columnIndex = this.props.canSelectRows
							? this.props.columns.length + 1
							: this.props.columns.length;
						const cellContext = { columnIndex, rowIndex: 0 };
						const {
							tabIndex,
							hasFocus,
							handleFocus,
							handleKeyDown,
						} = contextHelper(
							tableContext,
							cellContext,
							this.props.fixedLayout
						);
						return (
							<th
								className={classNames({ 'slds-has-focus': hasFocus })}
								ref={(ref) => {
									if (this.props.headerRefs) {
										this.props.headerRefs(ref, 'action');
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
					}}
				</TableContext.Consumer>
			);
		}

		return actionsHeader;
	};

	getSelectHeader = () => {
		const { canSelectRows, fixedHeader } = this.props;
		const getContent = (idSuffix, style, ariaHidden) => {
			let render = null;

			if (canSelectRows === 'radio') {
				render = (
					<div
						className="slds-truncate slds-assistive-text"
						id={`${this.props.id}-column-group-header-row-select`}
						title={this.props.assistiveText.selectRowGroup}
					>
						{this.props.assistiveText.selectRowGroup}
					</div>
				);
			} else if (canSelectRows === true || canSelectRows === 'checkbox') {
				render = (
					<div
						className="slds-th__action slds-th__action_form"
						aria-hidden={ariaHidden && true}
						style={style}
					>
						{!ariaHidden ? (
							<span
								id={`${this.props.id}-column-group-header-row-select`}
								className="slds-assistive-text"
							>
								{this.props.assistiveText.selectAllRows}
							</span>
						) : null}
						<InteractiveCheckbox
							assistiveText={{
								label: this.props.assistiveText.selectAllRows,
							}}
							checked={this.props.allSelected}
							indeterminate={this.props.indeterminateSelected}
							id={`${this.props.id}-${idSuffix}`}
							// There is a checkbox for user interaction and a checkbox for positioning. ariaHidden is for the checkbox for positioning and it should be removed from the accessibility tree.
							name={!ariaHidden ? 'SelectAll' : undefined}
							onChange={this.props.onToggleAll}
						/>
					</div>
				);
			}

			return render;
		};

		let selectHeader = null;

		if (canSelectRows) {
			selectHeader = (
				<TableContext.Consumer>
					{(tableContext) => {
						const cellContext = { columnIndex: 0, rowIndex: 0 };
						const {
							tabIndex,
							hasFocus,
							handleFocus,
							handleKeyDown,
						} = contextHelper(
							tableContext,
							cellContext,
							this.props.fixedLayout
						);
						return (
							<th
								className={classNames('slds-text-align_right', {
									'slds-has-focus': hasFocus,
								})}
								ref={(ref) => {
									if (this.props.headerRefs) {
										this.props.headerRefs(ref, 'select');
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
					}}
				</TableContext.Consumer>
			);
		}

		return selectHeader;
	};

	// ### Render
	render() {
		const actionsHeader = this.getActionsHeader();
		const selectHeader = this.getSelectHeader();

		return (
			<thead>
				<tr className="slds-line-height_reset">
					{selectHeader}
					{this.props.columns.map((column, index) => (
						<CellContext.Provider
							key={`${this.props.id}-${column.props.property}`}
							value={{
								columnIndex: this.props.canSelectRows ? index + 1 : index,
								rowIndex: 0,
							}}
						>
							<HeaderCell
								assistiveText={this.props.assistiveText}
								cellRef={(ref) => {
									if (this.props.headerRefs) {
										this.props.headerRefs(ref, index);
									}
								}}
								fixedHeader={this.props.fixedHeader}
								id={`${this.props.id}-${column.props.property}`}
								onSort={this.props.onSort}
								{...column.props}
							/>
						</CellContext.Provider>
					))}
					{actionsHeader}
				</tr>
			</thead>
		);
	}
}

export default DataTableHead;
