/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Tree Item Component

// Implements the [Tree design pattern](https://www.lightningdesignsystem.com/components/tree/) in React.

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

// ### isFunction
import isFunction from 'lodash.isfunction';

import Button from '../../button';

import Highlighter from '../../utilities/highlighter';

// ### Event Helpers
import EventUtil from '../../../utilities/event';

import KEYS from '../../../utilities/key-code';
import mapKeyEventCallbacks from '../../../utilities/key-callbacks';

// ## Constants
import { TREE_ITEM } from '../../../utilities/constants';

const handleClick = (event, props) => {
	EventUtil.trap(event);

	if (isFunction(props.onClick)) {
		props.onClick(event, {
			node: props.node,
			select: !props.node.selected,
			treeIndex: props.treeIndex,
		});
	}
};

const findNextNode = (flattenedNodes, node) => {
	const nodes = flattenedNodes.map(((flattenedNode) => flattenedNode.node));
	const index = nodes.indexOf(node);
	return flattenedNodes[(index + 1) % flattenedNodes.length];
};

const findPreviousNode = (flattenedNodes, node) => {
	const nodes = flattenedNodes.map(((flattenedNode) => flattenedNode.node));
	let index = nodes.indexOf(node) - 1;
	if (index < 0) {
		index += flattenedNodes.length;
	}
	return flattenedNodes[index];
};

const handleKeyDownDown = (event, props) => {
	if (props.node.selected) {
		// Go to the next visible node
		handleClick(event, props);
		const flattenedNode = findNextNode(props.flattenedNodes, props.node);
		props.onClick(event, {
			node: flattenedNode.node,
			select: true,
			treeIndex: flattenedNode.treeIndex,
		});
	} else {
		// Focus is on this node but it's not selected, so select it
		handleClick(event, props);
	}
};

const handleKeyDownUp = (event, props) => {
	if (props.node.selected) {
		// Go to the next visible node
		handleClick(event, props);
		const flattenedNode = findPreviousNode(props.flattenedNodes, props.node);
		props.onClick(event, {
			node: flattenedNode.node,
			select: true,
			treeIndex: flattenedNode.treeIndex,
		});
	} else {
		// Focus is on this node but it's not selected, so select it
		handleClick(event, props);
	}
};

const handleKeyDownLeft = (event, props) => {
	handleClick(event, props);
	const nodes = props.flattenedNodes.map(((flattenedNode) => flattenedNode.node));
	const index = nodes.indexOf(props.parent);
	props.onClick(event, {
		node: props.parent,
		select: true,
		treeIndex: props.flattenedNodes[index].treeIndex,
	});
};

const handleKeyDown = (event, props) => {
	mapKeyEventCallbacks(event, {
		callbacks: {
			[KEYS.DOWN]: { callback: (event) => handleKeyDownDown(event, props) },
			[KEYS.UP]: { callback: (event) => handleKeyDownUp(event, props) },
			[KEYS.LEFT]: { callback: (event) => handleKeyDownLeft(event, props) },
		},
	});
};

/**
 * A Tree Item is a non-branching node in a hierarchical list.
 */
const Item = (props) => {
	const isSelected = props.node.selected;

	return (
		<li
			id={`${props.treeId}-${props.node.id}`}
			role="treeitem"
			aria-level={props.level}
			tabIndex="0"
			onKeyDown={(event) => handleKeyDown(event, props)}
			ref={(component) => {
				if (component && isSelected) {
					component.focus();
				}
			}}
		>
			{/* eslint-disable jsx-a11y/no-static-element-interactions */}
			<div
				className={classNames('slds-tree__item', {
					'slds-is-selected': isSelected,
				})}
				aria-selected={isSelected ? 'true' : 'false'}
				onClick={(event) => {
					handleClick(event, props);
				}}
			>
				{/* eslint-enable jsx-a11y/no-static-element-interactions */}
				<Button
					tabIndex="-1"
					assistiveText=""
					role="presentation"
					iconName="chevronright"
					iconSize="small"
					variant="icon"
					className="slds-m-right--small slds-is-disabled"
					disabled
				/>
				{/* eslint-disable no-script-url */}
				<a
					tabIndex="-1"
					href="javascript:void(0)"
					// eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role
					role="presentation"
					className="slds-truncate"
				>
					{/* eslint-enable no-script-url */}
					<Highlighter search={props.searchTerm}>{props.label}</Highlighter>
				</a>
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
	 * Function that will run whenever an item or branch is clicked.
	 */
	onClick: PropTypes.func,
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
	 * This node's parent.
	 */
	parent: PropTypes.object,
};

Item.defaultProps = {
	selected: false,
};

export default Item;
