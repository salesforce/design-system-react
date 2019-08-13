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

	events: PropTypes.shape({}),

	labels: PropTypes.shape({
		chooseRow: PropTypes.string,
		selectAll: PropTypes.string,
	}),

	/**
	 * This function triggers when a row is expanded
	 */
	onExpandRow: PropTypes.func.isRequired,
	/**
	 * This function fires when the selection of rows changes. This component passes in `event, { selection }` to the function. `selection` is an array of objects from the `items` prop.
	 */
	onRowChange: PropTypes.func,
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

	isSingleSelect: PropTypes.bool,

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
};

/**
 * A tree is visualization of a structure hierarchy. A branch can be expanded or collapsed.
 */
class TreeGrid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectAll: false,
		};
		this.generatedId = shortid.generate();
	}

	/**
	 * Get the TreeGrid's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	selectAll() {
		const curr = this.state.selectAll;
		this.setState({ selectAll: !curr });
	}

	render() {
		const assistiveText = assign(
			{},
			defaultProps.assistiveText,
			this.props.assistiveText
		);

		console.log(this.state.selectAll);

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
				aria-multiselectable="true"
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
							{!this.props.isSingleSelect ? (
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
											checked={this.state.selectAll}
											onChange={() => this.selectAll()}
										/>
									</div>
								</th>
							) : null}
							{this.props.children}
							<th className="" scope="col" style={{ width: '3.25rem' }}>
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
				<tbody>{
					this.props.items.map((row, i) => (
						<TreeGridRow
							key={`${this.props.id}-row-${i}`}
							id={`${this.props.id}-${this.state.selectAll}-${i}`}
							columns={columns}
							isSelected={this.state.selectAll}
							row={row}
							onClickMoreActions={this.props.events.onClickMoreActions}
						/>
					))
				}</tbody>
			</table>
		);
	}
}

TreeGrid.displayName = displayName;
TreeGrid.propTypes = propTypes;
TreeGrid.defaultProps = defaultProps;

export default TreeGrid;
