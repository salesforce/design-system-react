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
		actionsHeader: PropTypes.string,
		// columnSort: PropTypes.string,
		// columnSortedAscending: PropTypes.string,
		// columnSortedDescending: PropTypes.string,
		selectAllRows: PropTypes.string,
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
};

/**
 * A tree is visualization of a structure hierarchy. A branch can be expanded or collapsed.
 */
class TreeGrid extends React.Component {
	componentWillMount() {
		this.generatedId = shortid.generate();
	}

	/**
	 * Get the TreeGrid's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	render() {
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
					'slds-table_bordered',
					'slds-table_edit',
					'slds-table_fixed-layout',
					'slds-tree slds-table_tree',
					this.props.className
				)}
				role="treegrid"
			>
				<thead>
					<tr className="slds-line-height_reset">
						{!this.props.isSingleSelect ? (
							<th
								className="slds-text-align_right"
								scope="col"
								style={{ width: '3.5rem' }}
							>
								<span id="column-group-header" className="slds-assistive-text">
									Choose a row
								</span>
								<div className="slds-th__action slds-th__action_form">
									<div className="slds-checkbox">
										<input
											type="checkbox"
											name="options"
											id="checkbox-177"
											value="checkbox-177"
											tabIndex="-1"
											aria-labelledby="check-select-all-label column-group-header"
										/>
										<label
											className="slds-checkbox__label"
											htmlFor="checkbox-177"
											id="check-select-all-label"
										>
											<span className="slds-checkbox_faux" />
											<span className="slds-form-element__label slds-assistive-text">
												Select All
											</span>
										</label>
									</div>
								</div>
							</th>
						) : null}
						{this.props.children}
					</tr>
				</thead>
				<tbody>
					{this.props.items.map((row, i) => (
						<TreeGridRow
							key={`${this.props.id}-row-${i}`}
							id={`${this.props.id}-row-${i}`}
							columns={columns}
							row={row}
						/>
					))}
				</tbody>
			</table>
		);
	}
}

TreeGrid.displayName = displayName;
TreeGrid.propTypes = propTypes;

export default TreeGrid;
