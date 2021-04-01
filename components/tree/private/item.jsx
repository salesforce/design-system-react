/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Tree Item Component

// Implements the [Tree design pattern](https://www.lightningdesignsystem.com/components/tree/) in React.

// ### React
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import findIndex from 'lodash.findindex';
import isFunction from 'lodash.isfunction';

import Button from '../../button';
import Highlighter from '../../utilities/highlighter';

import EventUtil from '../../../utilities/event';
import KEYS from '../../../utilities/key-code';
import mapKeyEventCallbacks from '../../../utilities/key-callbacks';
import { TREE_ITEM } from '../../../utilities/constants';

const handleSelect = ({ event, props, fromFocus }) => {
	EventUtil.trap(event);
	if (isFunction(props.onSelect)) {
		props.onSelect({
			event,
			data: {
				node: props.node,
				select: !props.node.selected,
				treeIndex: props.treeIndex,
			},
			fromFocus,
		});
	}
};

const findNextNode = (flattenedNodes, node) => {
	const nodes = flattenedNodes.map((flattenedNode) => flattenedNode.node);
	const index = findIndex(nodes, { id: node.id });
	return flattenedNodes[(index + 1) % flattenedNodes.length];
};

const findPreviousNode = (flattenedNodes, node) => {
	const nodes = flattenedNodes.map((flattenedNode) => flattenedNode.node);
	let index = findIndex(nodes, { id: node.id }) - 1;
	if (index < 0) {
		index += flattenedNodes.length;
	}
	return flattenedNodes[index];
};

const handleKeyDownDown = (event, props) => {
	if (props.focusedNodeIndex === props.treeIndex) {
		// Select the next visible node
		const flattenedNode = findNextNode(props.flattenedNodes, props.node);
		props.onSelect({
			event,
			data: {
				node: flattenedNode.node,
				select: true,
				treeIndex: flattenedNode.treeIndex,
			},
			clearSelectedNodes: true,
		});
	}
};

const handleKeyDownUp = (event, props) => {
	if (props.focusedNodeIndex === props.treeIndex) {
		// Go to the previous visible node
		const flattenedNode = findPreviousNode(props.flattenedNodes, props.node);
		props.onSelect({
			event,
			data: {
				node: flattenedNode.node,
				select: true,
				treeIndex: flattenedNode.treeIndex,
			},
			clearSelectedNodes: true,
		});
	}
};

const handleKeyDownLeft = (event, props) => {
	const nodes = props.flattenedNodes.map((flattenedNode) => flattenedNode.node);
	const index = findIndex(nodes, { id: props.parent.id });
	if (index !== -1) {
		props.onExpand({
			event,
			data: {
				node: props.parent,
				select: true,
				expand: !props.parent.expanded,
				treeIndex: props.flattenedNodes[index].treeIndex,
			},
		});
	}
};

const handleKeyDownEnter = (event, props) => {
	handleSelect({ event, props });
};

const handleKeyDown = (event, props) => {
	mapKeyEventCallbacks(event, {
		callbacks: {
			[KEYS.DOWN]: { callback: (evt) => handleKeyDownDown(evt, props) },
			[KEYS.UP]: { callback: (evt) => handleKeyDownUp(evt, props) },
			[KEYS.LEFT]: { callback: (evt) => handleKeyDownLeft(evt, props) },
			[KEYS.ENTER]: { callback: (evt) => handleKeyDownEnter(evt, props) },
		},
	});
};

const handleFocus = (event, props) => {
	if (
		!props.treeHasFocus &&
		!props.focusedNodeIndex &&
		event.target === event.currentTarget
	) {
		handleSelect({ event, props });
	}
};

const getTabIndex = (props) => {
	const initialFocus =
		props.selectedNodeIndexes.length === 0 &&
		props.treeIndex === props.flattenedNodes[0].treeIndex;
	return props.treeIndex === props.focusedNodeIndex || initialFocus ? 0 : -1;
};

/**
 * A Tree Item is a non-branching node in a hierarchical list.
 */
const Item = (props) => {
	const isSelected = props.node.selected;
	const isFocused = props.treeIndex === props.focusedNodeIndex;

	return (
		<li
			id={`${props.treeId}-${props.node.id}`}
			role="treeitem"
			aria-level={props.level}
			aria-selected={isSelected ? 'true' : 'false'}
			tabIndex={getTabIndex(props)}
			onKeyDown={(event) => handleKeyDown(event, props)}
			onFocus={(event) => handleFocus(event, props)}
			onBlur={props.onNodeBlur}
			ref={(component) => {
				if (props.treeHasFocus && component && isFocused) {
					component.focus();
				}
			}}
		>
			{/* eslint-disable jsx-a11y/no-static-element-interactions */}
			<div
				className={classNames('slds-tree__item', {
					'slds-is-selected': isSelected,
				})}
				onClick={(event) => {
					handleSelect({ event, props });
				}}
			>
				{/* eslint-enable jsx-a11y/no-static-element-interactions */}
				<Button
					tabIndex="-1"
					aria-hidden
					assistiveText={{ icon: '' }}
					role="presentation"
					iconCategory="utility"
					iconName="chevronright"
					iconSize="small"
					variant="icon"
					className="slds-m-right_small slds-is-disabled"
					disabled
				/>
				<span className="slds-size_1-of-1">
					<Highlighter
						search={props.searchTerm}
						className="slds-tree__item-label slds-truncate"
					>
						{props.label}
					</Highlighter>
				</span>
			</div>
		</li>
	);
};

// ### Display Name
// Always use the canonical component name as the React display name.
Item.displayName = TREE_ITEM;

// ### Prop Types
Item.propTypes = {
	/**
	 * HTML `id` of the wrapping container element joined with the `id` of the node. This will recursively increase as the tree depth increases.
	 */
	htmlId: PropTypes.string.isRequired,
	/**
	 * The text of the tree item.
	 */
	label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
	/**
	 * The number of nestings. Determines the ARIA level and style alignment.
	 */
	level: PropTypes.number.isRequired,
	/**
	 * The current node that is being rendered.
	 */
	node: PropTypes.object.isRequired,
	/**
	 * This function triggers when the expand or collapse icon is clicked or due to keyboard navigation.
	 */
	onExpand: PropTypes.func.isRequired,
	/**
	 * Function that will run whenever an item or branch is selected (click or keyboard).
	 */
	onSelect: PropTypes.func,
	/**
	 * Highlights term if found in node label
	 */
	searchTerm: PropTypes.string,
	/**
	 * Unique id used for a prefix of all tree nodes
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

Item.defaultProps = {
	selected: false,
	selectedNodeIndexes: [],
};

export default Item;
