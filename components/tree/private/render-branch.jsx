/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Tree Branch Component

// Implements the [Tree design pattern](https://www.lightningdesignsystem.com/components/tree/) in React.

// ## Dependencies

import React from 'react';
import PropTypes from 'prop-types';
import findIndex from 'lodash.findindex';
import isFunction from 'lodash.isfunction';
import classNames from 'classnames';

// Child components
import Button from '../../button';
import Highlighter from '../../utilities/highlighter';

import EventUtil from '../../../utilities/event';
import KEYS from '../../../utilities/key-code';
import mapKeyEventCallbacks from '../../../utilities/key-callbacks';

const propTypes = {
	/**
	 * HTML `id` of primary element that has `.slds-tree` on it. This component has a wrapping container element outside of `.slds-tree`.
	 */
	htmlId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
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
	 * This function triggers when the expand or collapse icon is clicked or due to keyboard navigation.
	 */
	onExpand: PropTypes.func.isRequired,
	/**
	 * Function that will run whenever an item or branch is clicked.
	 */
	onSelect: PropTypes.func,
	/**
	 * Highlights term if found in node label
	 */
	searchTerm: PropTypes.string,
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

const handleExpand = (event, props) => {
	EventUtil.trap(event);
	if (isFunction(props.onExpand)) {
		props.onExpand({
			event,
			data: {
				node: props.node,
				expand: !props.node.expanded,
				treeIndex: props.treeIndex,
			},
		});
	}
};

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

const handleKeyDownRight = (event, props) => {
	if (props.node.expanded) {
		if (props.getNodes(props.node) && props.getNodes(props.node).length > 0) {
			handleKeyDownDown(event, props);
		}
	} else {
		handleExpand(event, props);
	}
};

const handleKeyDownLeft = (event, props) => {
	if (props.node.expanded) {
		handleExpand(event, props);
	} else {
		const nodes = props.flattenedNodes.map(
			(flattenedNode) => flattenedNode.node
		);
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
			[KEYS.RIGHT]: { callback: (evt) => handleKeyDownRight(evt, props) },
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
		// did it happen by mouse?
		handleSelect({ event, props, fromFocus: true });
	}
};

const getTabIndex = (props) => {
	const initialFocus =
		props.selectedNodeIndexes.length === 0 &&
		props.treeIndex === props.flattenedNodes[0].treeIndex;
	return props.treeIndex === props.focusedNodeIndex || initialFocus ? 0 : -1;
};

// Most of these props come from the nodes array, not from the Tree props
const RenderBranch = (children, props) => {
	const isExpanded = props.node.expanded;
	const isSelected = props.node.selected;
	const isFocused = props.treeIndex === props.focusedNodeIndex;
	const isLoading = props.node.loading;

	const loader = (
		<div
			style={{
				display: 'block',
				paddingLeft: `${1.5 * props.level + 1.5}rem`,
				marginTop: '.5rem',
			}}
		>
			<div
				style={{
					borderRadius: '15rem',
					display: 'block',
					marginBottom: '.75rem',
					height: '.5rem',
					backgroundColor: 'rgb(224, 229, 238)',
					width: '40%',
				}}
			/>
			<div
				style={{
					borderRadius: '15rem',
					display: 'block',
					marginBottom: '.75rem',
					height: '.5rem',
					backgroundColor: 'rgb(224, 229, 238)',
					width: '80%',
				}}
			/>
			<div
				style={{
					borderRadius: '15rem',
					display: 'block',
					marginBottom: '.75rem',
					height: '.5rem',
					backgroundColor: 'rgb(224, 229, 238)',
					width: '60%',
				}}
			/>
		</div>
	);

	const label =
		props.node.assistiveText ||
		(typeof props.node.label === 'string' ? props.node.label : null);
	return (
		<li
			id={props.htmlId}
			role="treeitem"
			aria-level={props.level}
			aria-expanded={isExpanded ? 'true' : 'false'}
			aria-label={
				props.node.nodes && props.node.nodes.length > 0 ? label : null
			}
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
					aria-hidden
					assistiveText={{ icon: 'Expand Tree Branch' }}
					iconCategory="utility"
					iconName="chevronright"
					iconSize="small"
					variant="icon"
					className="slds-m-right_small"
					role="presentation"
					aria-controls={props.htmlId}
					onClick={(event) => {
						handleExpand(event, props);
					}}
					tabIndex="-1"
				/>
				<span className="slds-size_1-of-1" id={`${props.htmlId}__label`}>
					<Highlighter
						search={props.searchTerm}
						className="slds-tree__item-label slds-truncate"
					>
						{props.label}
					</Highlighter>
				</span>
			</div>
			{isLoading ? loader : null}
			<ul
				className={classNames({
					'slds-is-expanded': isExpanded,
					'slds-is-collapsed': !isExpanded,
				})}
				role="group"
				aria-labelledby={`${props.htmlId}__label`}
			>
				{isExpanded && !isLoading ? children : null}
			</ul>
		</li>
	);
};

RenderBranch.displayName = 'Branch';
RenderBranch.propTypes = propTypes;

export default RenderBranch;
