/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Tree Branch Component

// Implements the [Tree design pattern](https://www.lightningdesignsystem.com/components/tree/) in React.

// ## Dependencies

import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash.isfunction';
import classNames from 'classnames';
import shortid from 'shortid';

// Child components
import Button from '../../button';
import Item from './item';
import Highlighter from '../../utilities/highlighter';

import EventUtil from '../../../utilities/event';
import KEYS from '../../../utilities/key-code';
import mapKeyEventCallbacks from '../../../utilities/key-callbacks';
import { TREE_BRANCH } from '../../../utilities/constants';

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

const handleScroll = (event, props) => {
	const percentage =
		event.target.scrollTop /
		(event.target.scrollHeight - event.target.clientHeight) *
		100;

	if (isFunction(props.onScroll)) {
		props.onScroll(event, {
			percentage,
		});
	}
};

const findNextNode = (flattenedNodes, node) => {
	const nodes = flattenedNodes.map((flattenedNode) => flattenedNode.node);
	const index = nodes.indexOf(node);
	return flattenedNodes[(index + 1) % flattenedNodes.length];
};

const findPreviousNode = (flattenedNodes, node) => {
	const nodes = flattenedNodes.map((flattenedNode) => flattenedNode.node);
	let index = nodes.indexOf(node) - 1;
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
		const index = nodes.indexOf(props.parent);
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

const renderInitialNode = (children, props) => (
	// id intentionally not rendered here, and is present on
	// container that includes the header
	<ul
		aria-labelledby={`${props.htmlId}__heading`}
		className={classNames('slds-tree', props.initalClassName)}
		onScroll={(event) => {
			handleScroll(event, props);
		}}
		role="tree"
		style={props.initialStyle}
	>
		{children}
	</ul>
);

renderInitialNode.displayName = 'InitialNode';

renderInitialNode.propTypes = {
	/**
	 * HTML `id` of the wrapping container element.
	 */
	htmlId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	/*
	 * Class names to be added to the top-level `ul` element.
	 */
	initalClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/*
	 * Styles to be added to the top-level `ul` element. Useful for `overflow:hidden`.
	 */
	initialStyle: PropTypes.object,
};

// Most of these props come from the nodes array, not from the Tree props
const renderBranch = (children, props) => {
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
					assistiveText={{ icon: 'Toggle' }}
					iconCategory="utility"
					iconName="chevronright"
					iconSize="small"
					variant="icon"
					className="slds-m-right--small"
					role="presentation"
					aria-controls={props.htmlId}
					onClick={(event) => {
						handleExpand(event, props);
					}}
					tabIndex="-1"
				/>
				{/* eslint-disable no-script-url */}
				<span className="slds-size_1-of-1" id={`${props.htmlId}__label`}>
					{/* eslint-enable no-script-url */}
					{
						<Highlighter
							search={props.searchTerm}
							className="slds-tree__item-label slds-truncate"
						>
							{props.label}
						</Highlighter>
					}
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

renderBranch.displayName = 'Branch';

renderBranch.propTypes = {
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
			? renderInitialNode(children, props)
			: renderBranch(children, props);
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
