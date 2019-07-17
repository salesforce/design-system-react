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
import Icon from '../icon';
import Button from '../button';

import { TREE_GRID } from '../../utilities/constants';

const displayName = TREE_GRID;

const propTypes = {
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

	data: PropTypes.object.isRequired,
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
		return (
			<table
				id={this.getId()}
				aria-multiselectable="true"
				className={classNames(
					'slds-table',
					'slds-table_bordered',
					'slds-table_edit',
					'slds-table_fixed-layout',
					'slds-table_resizable-cols',
					'slds-tree slds-table_tree',
					this.props.className
				)}
				role="treegrid"
			>
				<thead>
					<tr className="slds-line-height_reset">
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
						{this.props.data.cols.map((col) => (
							<th
								aria-label={col.label}
								aria-sort="none"
								className="slds-has-button-menu slds-is-resizable slds-is-sortable"
								scope="col"
							>
								<a
									className="slds-th__action slds-text-link_reset"
									href={col.href}
									role="button"
									tabIndex="-1"
								>
									<span className="slds-assistive-text">Sort by: </span>
									<div className="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">
										<span className="slds-truncate" title="Account Name">
											{col.label}
										</span>
										<Icon
											category="utility"
											name="arrowdown"
											className="slds-is-sortable__icon"
										/>
									</div>
								</a>
								<Button
									variant="base"
									className="slds-th__action-button"
									iconSize="small"
									iconCategory="utility"
									iconName="chevrondown"
									assistiveText={{
										icon: `Show ${col.label} column actions`,
									}}
								/>
								<div className="slds-resizable">
									<input
										type="range"
										aria-label={`${col.label} column width`}
										className="slds-resizable__input slds-assistive-text"
										max="1000"
										min="20"
										tabIndex="-1"
									/>
									<span className="slds-resizable__handle">
										<span className="slds-resizable__divider" />
									</span>
								</div>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{this.props.data.rows
						? this.props.data.rows.map((row) => (
								<tr
									aria-level="1"
									aria-posinset="1"
									aria-selected="false"
									aria-setsize="4"
									className="slds-hint-parent"
									tabIndex="0"
								>
									<td
										className="slds-text-align_right"
										role="gridcell"
										style={{ width: '3.25rem' }}
									>
										<div className="slds-checkbox">
											<input
												type="checkbox"
												name="options"
												id={`checkbox-${row.id}`}
												value={`checkbox-${row.id}`}
												aria-labelledby={`check-button-label-${
													row.id
												} column-group-header`}
											/>
											<label
												className="slds-checkbox__label"
												htmlFor={`checkbox-${row.id}`}
												id={`check-button-label-${row.id}`}
											>
												<span className="slds-checkbox_faux" />
												<span className="slds-form-element__label slds-assistive-text">
													Select item {row.id}
												</span>
											</label>
										</div>
									</td>
									{row.cols.map(
										(col, i) =>
											i === 0 ? (
												<th
													className="slds-tree__item"
													data-label={col.label}
													scope="row"
												>
													<div className="slds-truncate" title={col.label}>
														<a href={col.href} tabIndex="-1">
															{col.label}
														</a>
													</div>
												</th>
											) : (
												<td data-label="Employees" role="gridcell">
													<div className="slds-truncate" title={col.label}>
														{col.href ? (
															<a href={col.href} tabIndex="-1">
																{col.label}
															</a>
														) : (
															<>{col.label}</>
														)}
													</div>
												</td>
											)
									)}
									<td role="gridcell" style={{ width: '3.25rem' }}>
										<Button
											variant="icon"
											className="slds-button_icon-border-filled"
											iconSize="x-small"
											iconCategory="utility"
											iconName="down"
											assistiveText={{
												icon: `More actions for ${row.cols[0].labels}`,
											}}
										/>
									</td>
								</tr>
							))
						: null}
				</tbody>
			</table>
		);
	}
}

TreeGrid.displayName = displayName;
TreeGrid.propTypes = propTypes;
// TreeGrid.defaultProps = defaultProps;

export default TreeGrid;
