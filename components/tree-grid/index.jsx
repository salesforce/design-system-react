/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Tree Grid design pattern](https://lightningdesignsystem.com/components/tree-grid/) in React.
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';
import assign from 'lodash.assign';

import { TREE_GRID } from '../../utilities/constants';
import TreeGridColumn from './column';
import Checkbox from '../checkbox';
import Branch from './private/branch';

const displayName = TREE_GRID;

const propTypes = {
	/**
	 * **Assistive text for accessibility.**
	 * This object is merged with the default props object on every render.
	 * * `actionsHeader`: Text for heading of actions column
	 * * `selectAllRows`: Text for select all checkbox within the table header
	 * * `selectRow`: Text for select row
	 */
	assistiveText: PropTypes.shape({
		actions: PropTypes.string,
		actionsHeader: PropTypes.string,
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
	 *  State of the checkbox
	 */
	checked: PropTypes.bool,
	/**
	 * Specifies a row selection UX pattern.
	 * * `multiple`: This is the default
	 * * `single`: Single row selection.
	 */
	selectRows: PropTypes.oneOf(['single', 'multiple']),

	nodes: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
			PropTypes.shape({
				id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
					.isRequired,
				label: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
					.isRequired,
				type: PropTypes.string.isRequired,
				selected: PropTypes.bool,
				expanded: PropTypes.bool,
			}),
		])
	).isRequired,
	/**
	 * Callback function for selection of rows
	 */
	onSelect: PropTypes.func.isRequired,
	/**
	 * Callback function for selection of all rows
	 */
	onSelectAll: PropTypes.func.isRequired,
	/**
	 * Callback function for expansion of rows
	 */
	onExpand: PropTypes.func.isRequired,
	/**
	 * Whether the TreeGrid is headless
	 */
	isHeadless: PropTypes.bool,
	/**
	 * Whether the TreeGrid is borderless
	 */
	isBorderless: PropTypes.bool,
};

const defaultProps = {
	assistiveText: {
		actions: 'Actions',
		actionsHeader: 'Action Header',
		selectAll: 'Select All',
		selectRow: 'Select Row',
	},
	selectRows: 'multiple',
};

/**
 * A tree is visualization of a structure hierarchy. A branch can be expanded or collapsed.
 */
class TreeGrid extends React.Component {
	constructor(props) {
		super(props);

		const flattenedNodes = this.flattenTree({
			nodes: this.props.getNodes({ nodes: this.props.nodes }),
			expanded: true,
		}).slice(1);

		let focusedNodeIndex;

		this.state = {
			flattenedNodes,
			focusedNodeIndex,
		};

		this.generatedId = shortid.generate();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			flattenedNodes: this.flattenTree({
				nodes: this.props.getNodes({ nodes: nextProps.nodes }),
				expanded: true,
			}).slice(1),
		});
	}

	/**
	 * Get the TreeGrid's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	flattenTree = (root, treeIndex = '', firstLevel = true) => {
		if (!root.nodes) {
			return [{ node: root, treeIndex }];
		}
		let nodes = [{ node: root, treeIndex }];
		if (root.expanded) {
			for (let index = 0; index < root.nodes.length; index += 1) {
				const curNode = firstLevel
					? root.nodes[index]
					: this.props.getNodes(root)[index];
				nodes = nodes.concat(
					this.flattenTree(
						curNode,
						treeIndex ? `${treeIndex}-${index}` : `${index}`,
						false
					)
				);
			}
		}
		return nodes;
	};

	handleFocus = (event, data) => {
		this.setState({
			focusedNodeIndex: data.treeIndex,
		});
	};

	handleSelection = (event, data) => {
		this.props.onSelect(event, data);
	};

	handleSelectAll = (event, data) => {
		this.props.onSelectAll(event, data);
	};

	handleExpansion = (event, data) => {
		this.props.onExpand(event, data);
	};

	render() {
		const assistiveText = assign(
			{},
			defaultProps.assistiveText,
			this.props.assistiveText
		);

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
				aria-readonly="true"
				aria-multiselectable={this.props.selectRows === 'multiple'}
				role="treegrid"
				className={classNames(
					'slds-table',
					'slds-table_edit',
					'slds-table_fixed-layout',
					'slds-tree slds-table_tree',
					{ 'slds-table_bordered': !this.props.isBorderless },
					{ 'slds-table_header-hidden': this.props.isHeadless },
					this.props.className
				)}
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
									<div
										className="slds-th__action slds-th__action_form"
										tabIndex="-1"
									>
										<Checkbox
											assistiveText={{
												label: assistiveText.selectAll,
											}}
											name="options"
											indeterminate={this.props.checked === null}
											checked={this.props.checked}
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
					{
						<Branch
							level={0}
							treeId={this.getId()}
							getNodes={this.props.getNodes}
							node={{ nodes: this.props.nodes }}
							flattenedNodes={this.state.flattenedNodes}
							focusedNodeIndex={this.state.focusedNodeIndex}
							columns={columns}
							onSelect={this.handleSelection}
							onExpand={this.handleExpansion}
							onFocus={this.handleFocus}
							selectRows={this.props.selectRows}
							moreActionsDropdown={this.props.moreActionsDropdown}
						/>
					}
				</tbody>
			</table>
		);
	}
}

TreeGrid.displayName = displayName;
TreeGrid.propTypes = propTypes;
TreeGrid.defaultProps = defaultProps;

export default TreeGrid;
