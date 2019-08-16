/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Welcome Mat design pattern](https://lightningdesignsystem.com/components/welcome-mat/) in React.
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';
import assign from 'lodash.assign';
import reject from 'lodash.reject';
import find from 'lodash.find';

import { TREE_GRID } from '../../utilities/constants';
import TreeGridRow from './private/row';
import TreeGridColumn from './column';
import Checkbox from '../checkbox';

const displayName = TREE_GRID;

const propTypes = {
	/**
	 * **Assistive text for accessibility.**
	 * This object is merged with the default props object on every render.
	 * * `actionsHeader`: Text for heading of actions column
	 * * `columnSort`: Text for sort action on table column header
	 * * `columnSortedAscending`: Text announced once a column is sorted in ascending order
	 * * `columnSortedDescending`: Text announced once a column is sorted in descending order
	 * * `selectAllRows`: Text for select all checkbox within the table header
	 * * `selectRow`: Text for select row
	 */
	assistiveText: PropTypes.shape({
		actions: PropTypes.string,
		actionsHeader: PropTypes.string,
		// columnSort: PropTypes.string,
		// columnSortedAscending: PropTypes.string,
		// columnSortedDescending: PropTypes.string,
		selectAll: PropTypes.string,
		selectRow: PropTypes.string,
	}),
	/**
	 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * HTML id for component.
	 */
	id: PropTypes.string,
	/**
	 * 	onSelectAll:  function triggers when
	 * 	onExpandRow: function triggers when a row is expanded
	 * 	onCollapseRow: function triggers when a row is collapsed
	 */
	events: PropTypes.shape({
		onSelectAll: PropTypes.func,
		onDeselectAll: PropTypes.func,
		onRowChange: PropTypes.func,
		onExpandRow: PropTypes.func,
		onCollapseRow: PropTypes.func,
	}),

	labels: PropTypes.shape({
		chooseRow: PropTypes.string,
		selectAll: PropTypes.string,
	}),
	/**
	 * Specifies a row selection UX pattern.
	 * * `multiple`: This is the default
	 * * `single`: Single row selection.
	 * _This prop used to be a `boolean`, a `true` value will be considered `checkbox` for backwards compatibility._
	 */
	selectRows: PropTypes.oneOf(['single', 'multiple']),
	/**
	 * TreeGrids have horizontal borders by default. This removes them.
	 */
	unborderedRow: PropTypes.bool,

	items: PropTypes.arrayOf(PropTypes.object).isRequired,

	isHeadless: PropTypes.bool,
	isBorderless: PropTypes.bool,
};

const defaultProps = {
	assistiveText: {
		actions: 'Actions',
		actionsHeader: 'Action Header',
		selectAll: 'Select All',
		selectRow: 'Select Row',
	},
	selectRows: 'multiple'
};

/**
 * A tree is visualization of a structure hierarchy. A branch can be expanded or collapsed.
 */
class TreeGrid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSelectAll: false,
			selection: [],
		};
		this.generatedId = shortid.generate();
	}

	/**
	 * Get the TreeGrid's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	handleSelectAll = (event) => {
		const { isSelectAll } = this.state;
		if (!isSelectAll) {
			this.props.events.onSelectAll(event);
			this.setState({ isSelectAll: true, selection: this.props.items });
		} else {
			this.props.events.onDeselectAll(event);
			this.setState({ isSelectAll: false, selection: [] });
		}
	};

	handleSelection = (event, row) => {
		let { selection } = this.state;
		if(this.props.selectRows === "multiple")
		{
			if (find(selection, row)) {
				selection = reject(selection, row);
				const obj = { selection, row, selected: false };
				this.props.events.onRowChange(event, obj);
				this.setState({ selection, isSelectAll: false });
			} else {
				selection.push(row);
				const obj = { selection, row, selected: true };
				this.props.events.onRowChange(event, obj);
				if (selection.length === this.props.items.length)
					this.setState({ selection, isSelectAll: true });
				else this.setState({ selection });
			}
		} else {
			this.props.events.onRowChange(event, row);
			if(this.state.selection!==row)
				this.setState({ selection: row });
			else
				this.setState({ selection: null });
		}
	};

	render() {
		const assistiveText = assign(
			{},
			defaultProps.assistiveText,
			this.props.assistiveText
		);

		console.log(this.state.selection);

		const columns = [];
		React.Children.forEach(this.props.children, (child) => {
			if (child && child.type.displayName === TreeGridColumn.displayName) {
				const { children, ...columnProps } = child.props;

				const props = assign({}, this.props);
				delete props.children;
				assign(props, columnProps);

				columns.push({
					props,
					dataTableProps: this.props,
				});
			}
		});

		return (
			<table
				id={this.getId()}
				aria-multiselectable={this.props.selectRows==="multiple"}
				className={classNames(
					'slds-table',
					'slds-table_edit',
					'slds-table_fixed-layout',
					'slds-tree slds-table_tree',
					{ 'slds-table_bordered': !this.props.isBorderless },
					{ 'slds-table_header-hidden': this.props.isHeadless },
					this.props.className
				)}
				role="treegrid"
			>
				{this.props.isHeadless ? null : (
					<thead>
						<tr className="slds-line-height_reset">
							{this.props.selectRows === 'multiple' ? (
								<th
									className="slds-text-align_right"
									scope="col"
									style={{ width: '3.5rem' }}
								>
									<span
										id="column-group-header"
										className="slds-assistive-text"
									>
										{assistiveText.selectRow}
									</span>
									<div className="slds-th__action slds-th__action_form">
										<Checkbox
											assistiveText={{
												label: assistiveText.selectAll,
											}}
											name="options"
											indeterminate={
												this.state.selection.length > 0 &&
												!this.state.isSelectAll
											}
											checked={this.state.isSelectAll}
											onChange={this.handleSelectAll}
										/>
									</div>
								</th>
							) : null}
							{this.props.children}
							<th scope="col" style={{ width: '3.25rem' }}>
								<div
									className="slds-truncate slds-assistive-text"
									title={assistiveText.actions}
								>
									{assistiveText.actions}
								</div>
							</th>
						</tr>
					</thead>
				)}
				<tbody>
					{this.props.items.map((row, i) => (
						<TreeGridRow
							key={`${this.props.id}-row-${i}`}
							id={`${this.props.id}-row-${i}`}
							columns={columns}
							row={row}
							isSelected={find(this.state.selection, row)}
							isSingleSelect={this.props.selectRows==="single"}
							events={this.props.events}
							onExpand={(event, obj) =>
								this.props.events.onExpandRow(event, obj)
							}
							onCollapse={(event, obj) =>
								this.props.events.onCollapseRow(event, obj)
							}
							onSelect={(event) => this.handleSelection(event, row)}
						/>
					))}
				</tbody>
			</table>
		);
	}
}

TreeGrid.displayName = displayName;
TreeGrid.propTypes = propTypes;
TreeGrid.defaultProps = defaultProps;

export default TreeGrid;
