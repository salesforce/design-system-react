/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Tree Branch Component
import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

// Child components
import Item from './item';
import RenderInitialBranch from './render-initial-branch';
import RenderBranch from './render-branch';

import { TREE_BRANCH } from '../../../utilities/constants';

/**
 * A Tree Item is a non-branching node in a hierarchical list.
 */
const Branch = (props) => {
	let treeIndex = '';
	let children;

	const { treeId, level, onExpand, searchTerm } = props;

	if (Array.isArray(props.getNodes(props.node))) {
		children = props.getNodes(props.node).map((node, index) => {
			let child;
			const htmlId = `${props.treeId}-${node.id}`;
			treeIndex = `${index}`;
			if (props.treeIndex) {
				treeIndex = `${props.treeIndex}-${treeIndex}`;
			}
			if (node.type === 'branch') {
				child = (
					<Branch
						getNodes={props.getNodes}
						htmlId={htmlId}
						key={node.id}
						label={node.label}
						level={level + 1}
						node={node}
						flattenedNodes={props.flattenedNodes}
						selectedNodeIndexes={props.selectedNodeIndexes}
						focusedNodeIndex={props.focusedNodeIndex}
						treeHasFocus={props.treeHasFocus}
						onNodeBlur={props.onNodeBlur}
						nodes={node.nodes}
						onSelect={props.onSelect}
						onExpand={onExpand}
						searchTerm={searchTerm}
						treeId={treeId}
						treeIndex={treeIndex}
						parent={props.node}
					/>
				);
			} else {
				child = (
					<Item
						label={node.label}
						htmlId={htmlId}
						key={shortid.generate()}
						level={level + 1}
						node={node}
						flattenedNodes={props.flattenedNodes}
						selectedNodeIndexes={props.selectedNodeIndexes}
						focusedNodeIndex={props.focusedNodeIndex}
						treeHasFocus={props.treeHasFocus}
						onNodeBlur={props.onNodeBlur}
						onSelect={props.onSelect}
						onExpand={onExpand}
						searchTerm={searchTerm}
						treeIndex={treeIndex}
						treeId={treeId}
						parent={props.node}
					/>
				);
			}
			return child;
		});
	}

	const branch =
		props.level === 0
			? RenderInitialBranch(children, props)
			: RenderBranch(children, props);
	return branch;
};

// ### Display Name
// Always use the canonical component name as the React display name.
Branch.displayName = TREE_BRANCH;

// ### Prop Types
Branch.propTypes = {
	/**
	 * A function that will be called by every branch to receive its child nodes. The parent `node` object with the branch data is passed into this function: `getNodes(node)`. If your state engine is Flux or Redux, then your tree data structure will probably be flattened or normalized within the store. This will allow you to build out your tree without transversing an actual tree of data and may be more performant.
	 */
	getNodes: PropTypes.func,
	/**
	 * HTML `id` of the wrapping container element joined with the `id` of the node. This will recursively increase as the tree depth increases.
	 */
	htmlId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	/**
	 * All tree nodes must have a unique HTML `id` for users of assistive technology. If no `id` key is present in the  is provided, one will be generated.
	 */
	index: PropTypes.number,
	/**
	 * Determines if nodes in the top-level of the tree.
	 */
	initial: PropTypes.bool,
	/*
	 * Class names to be added to the top-level `ul` element.
	 */
	initalClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	initialStyle: PropTypes.object,
	/**
	 * The text of the tree item.
	 */
	label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
	/**
	 * The number of nestings. Determines the ARIA level and style alignment.
	 */
	level: PropTypes.number.isRequired,
	/**
	 * The current node that is being rendered.
	 */
	node: PropTypes.object.isRequired,
	/**
	 * Function that will run whenever an item or branch is selected (click or keyboard).
	 */
	onSelect: PropTypes.func,
	/**
	 * This function triggers when the expand or collapse icon is clicked.
	 */
	onExpand: PropTypes.func.isRequired,
	/**
	 * Highlights term if found in node label
	 */
	searchTerm: PropTypes.string,
	/**
	 * Unique id used for a prefix of all tree nodes. This is the prefix for subsequent `htmlId` props.
	 */
	treeId: PropTypes.string,
	/**
	 * Location of node (zero index). First node is `0`. It's first child is `0-0`. This can be used to modify your nodes without searching for the node. This index is only valid if the `nodes` prop is the same as at the time of the event.
	 */
	treeIndex: PropTypes.string,
	/**
	 * Flattened tree structure.
	 */
	flattenedNodes: PropTypes.arrayOf(PropTypes.object),
	/**
	 * Tree indexes of nodes that are currently selected.
	 */
	selectedNodeIndexes: PropTypes.arrayOf(PropTypes.string),
	/**
	 * Tree index of the node that is currently focused.
	 */
	focusedNodeIndex: PropTypes.string,
	/**
	 * Callback for when a node is blurred.
	 */
	onNodeBlur: PropTypes.func,
	/**
	 * Sets focus on render.
	 */
	treeHasFocus: PropTypes.bool,
	/**
	 * This node's parent.
	 */
	parent: PropTypes.object,
};

Branch.defaultProps = {
	level: 0,
	label: '',
	treeIndex: '',
	selectedNodeIndexes: [],
};

export default Branch;
