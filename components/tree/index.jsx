/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Tree Component (PROTOTYPE)

// THIS IS A PROTOTYPE and does NOT meet accessibility standards. It implements the [Tree design pattern](https://www.lightningdesignsystem.com/components/trees/) in React.

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

// Child components
import Branch from './private/branch';

// Similar to React's PropTypes check. When in development mode, it issues errors in the console about properties.
import checkProps from './check-props';

// ## Constants
import { TREE } from '../../utilities/constants';

/**
 * A tree is visualization of a structure hierarchy. A branch can be expanded or collapsed. This is a controlled component, since visual state is present in the `nodes` data.
 */
class Tree extends React.Component {
	constructor (props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleNodeBlur = this.handleNodeBlur.bind(this);
		this.handleExpandClick = this.handleExpandClick.bind(this);
		this.state = {
			flattenedNodes: this.flattenTree({
				nodes: this.props.nodes,
				expanded: true,
			}).slice(1),
			selectedNodeIndexes: [],
		};
	}

	componentWillMount () {
		checkProps(TREE, this.props);
	}

	componentWillReceiveProps (nextProps) {
		this.setState({
			flattenedNodes: this.flattenTree({
				nodes: nextProps.nodes,
				expanded: true,
			}).slice(1),
		});
	}

	shouldComponentUpdate (nextProps, nextState) {
		// There is no need to render when blurring a node because focus is either:
		//  - outside of the tree, or
		//  - focused on another node in the tree, which triggers its own render
		if (!nextState.treeHasFocus) {
			return false;
		}
		return true;
	}

	// Flattens hierarchical tree structure into a flat array.
	flattenTree (root, treeIndex = '') {
		if (!root.nodes) {
			return [{ node: root, treeIndex }];
		}
		let nodes = [{ node: root, treeIndex }];
		if (root.expanded) {
			for (let index = 0; index < root.nodes.length; index++) {
				const curNode = root.nodes[index];
				nodes = nodes.concat(
					this.flattenTree(
						curNode,
						treeIndex ? `${treeIndex}-${index}` : `${index}`
					)
				);
			}
		}
		return nodes;
	}

	handleClick (event, data, clearSelectedNodes) {
		// When triggered by a key event, other nodes should be deselected.
		if (clearSelectedNodes) {
			this.state.flattenedNodes.forEach((flattenedNode) => {
				if (flattenedNode.node.selected) {
					flattenedNode.node.selected = false;
				}
			});
		}

		// Do the click.
		this.props.onClick(event, data);

		// Keep track of the currently selected and focused nodes.
		let selectedNodeIndexes;
		if (data.select) {
			selectedNodeIndexes = this.state.selectedNodeIndexes.concat([
				data.treeIndex,
			]);
		} else {
			selectedNodeIndexes = this.state.selectedNodeIndexes.filter(
				(treeIndex) => treeIndex !== data.treeIndex
			);
		}
		this.setState({
			focusedNodeIndex: data.treeIndex,
			selectedNodeIndexes,
			treeHasFocus: true,
		});
	}

	handleNodeBlur () {
		this.setState({ treeHasFocus: false });
	}

	handleExpandClick (event, data) {
		this.props.onExpandClick(event, data);
		this.setState({ treeHasFocus: true });
	}

	render () {
		// One of these is required to pass accessibility tests
		const headingText = this.props.assistiveText || this.props.heading;

		// Start the zero level branch--that is the tree root. There is no label for
		// the tree root, but is required by all other nodes
		return (
			<div
				id={this.props.id}
				className={classNames(
					'slds-tree_container',
					this.props.className
				)} /* role="application" */
			>
				<h4
					className={classNames('slds-text-title--caps', {
						'slds-assistive-text': this.props.assistiveText,
					})}
					id={`${this.props.id}__heading`}
				>
					{headingText}
				</h4>
				<Branch
					getNodes={this.props.getNodes}
					initalClassName={this.props.listClassName}
					htmlId={this.props.id}
					initialStyle={this.props.listStyle}
					level={0}
					node={{ nodes: this.props.nodes }}
					flattenedNodes={this.state.flattenedNodes}
					selectedNodeIndexes={this.state.selectedNodeIndexes}
					focusedNodeIndex={this.state.focusedNodeIndex}
					treeHasFocus={this.state.treeHasFocus}
					onNodeBlur={this.handleNodeBlur}
					onClick={this.handleClick}
					onExpandClick={this.handleExpandClick}
					onScroll={this.props.onScroll}
					searchTerm={this.props.searchTerm}
					treeId={this.props.id}
				/>
			</div>
		);
	}
}

Tree.defaultProps = {
	getNodes: (node) => node.nodes,
};

// ### Display Name
// Always use the canonical component name as the React display name.
Tree.displayName = TREE;

// ### Prop Types
Tree.propTypes = {
	/**
	 * For users of assistive technology, if set the heading will be hidden. One of `heading` or `assistiveText` must be set in order to label the tree.
	 */
	assistiveText: PropTypes.string,
	/**
	 * Class names to be added to the container element which has the heading and the `ul.slds-tree` element as children.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Class names to be added to the top-level `ul` element of the tree.
	 */
	listClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * A function that will be called by every branch to receive its child nodes. The parent `node` object with the branch data is passed into this function: `getNodes(node)`. If your state engine is Flux or Redux, then your tree data structure will probably be flattened or normalized within the store. This will allow you to build out your tree without transversing an actual tree of data and may be more performant.
	 */
	getNodes: PropTypes.func,
	/**
	 * This is the tree's heading and describes its contents. It can be hidden, see `assistiveText`.
	 * */
	heading: PropTypes.string,
	/**
	 * HTML `id` of primary element that has `.slds-tree` on it. This component has a wrapping container element outside of `.slds-tree`.
	 */
	id: PropTypes.string.isRequired,
	/**
	 * Array of items starting at the top of the tree. The required shape is: `{expanded: string, id: string, label: string, selected: string, type: string, nodes: array}`, but only `id` and `label` are required. Use `type: 'branch'` for folder and categories.
	 */
	nodes: PropTypes.array,
	/**
	 * Function that will run whenever an item or branch is clicked.
	 */
	onClick: PropTypes.func.isRequired,
	/**
	 * This function triggers when the expand or collapse icon is clicked.
	 */
	onExpandClick: PropTypes.func.isRequired,
	/**
	 * This function triggers when the top-level `ul` element scrolls. This can be used to implement an "infinite scroll" pattern and update the `nodes` prop accordingly.
	 */
	onScroll: PropTypes.func,
	/**
	 * Highlights term if found in node label. This does not auto-expand branches.
	 */
	searchTerm: PropTypes.string,
	/**
	 * Styles to be added to the top-level `ul` element. Useful for `overflow:hidden`.
	 */
	listStyle: PropTypes.object,
};

export default Tree;
