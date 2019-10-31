/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ## Children
import CellFixed from './cell-fixed';
import Checkbox from '../../checkbox';
import HeaderCell from './header-cell';

// ## Constants
import { DATA_TABLE_HEAD } from '../../../utilities/constants';

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
				<th
					ref={(ref) => {
						if (this.props.headerRefs) {
							this.props.headerRefs(ref, 'action');
						}
					}}
					scope="col"
					style={{
						height: fixedHeader ? 0 : null,
						lineHeight: fixedHeader ? 0 : null,
						width: '3.25rem',
					}}
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
						<Checkbox
							assistiveText={{
								label: this.props.assistiveText.selectAllRows,
							}}
							checked={this.props.allSelected}
							indeterminate={this.props.indeterminateSelected}
							id={`${this.props.id}-${idSuffix}`}
							// There is a checkbox for user interaction and a checkbox for positioning. ariaHidden is for the checkbox for positioning and it should be removed from the accessibility tree.
							name={!ariaHidden && 'SelectAll'}
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
				<th
					className="slds-text-align_right"
					ref={(ref) => {
						if (this.props.headerRefs) {
							this.props.headerRefs(ref, 'select');
						}
					}}
					scope="col"
					style={{
						height: fixedHeader ? 0 : null,
						lineHeight: fixedHeader ? 0 : null,
						width: '3.25rem',
					}}
				>
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
				</th>
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
						<HeaderCell
							assistiveText={this.props.assistiveText}
							cellRef={(ref) => {
								if (this.props.headerRefs) {
									this.props.headerRefs(ref, index);
								}
							}}
							fixedHeader={this.props.fixedHeader}
							id={`${this.props.id}-${column.props.property}`}
							key={`${this.props.id}-${column.props.property}`}
							onSort={this.props.onSort}
							{...column.props}
						/>
					))}
					{actionsHeader}
				</tr>
			</thead>
		);
	}
}

export default DataTableHead;
