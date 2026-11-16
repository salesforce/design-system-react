/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { ReactNode, RefObject, useCallback } from 'react';
import classNames from 'classnames';
import findIndex from 'lodash.findindex';
import isFunction from 'lodash.isfunction';

import Button from '../../button';
import Highlighter from '../../utilities/highlighter';

import EventUtil from '../../../utilities/event';
import KEYS from '../../../utilities/key-code';
import mapKeyEventCallbacks from '../../../utilities/key-callbacks';
import { TREE_ITEM } from '../../../utilities/constants';
import { TreeNode, FlattenedNode } from '../types';

/** Tree-wide values from the tree's latest render, read by the item's event handlers. */
export interface TreeItemState {
	flattenedNodes: FlattenedNode[];
	isNodeExpanded: (node: TreeNode) => boolean;
	focusedNodeIndex?: string;
	treeHasFocus?: boolean;
}

export interface ItemProps {
	htmlId: string;
	label: ReactNode | string;
	level: number;
	node: TreeNode;
	onExpand: (params: {
		event: React.SyntheticEvent;
		data: {
			node: TreeNode;
			select?: boolean;
			expand: boolean;
			treeIndex: string;
		};
	}) => void;
	onSelect?: (params: {
		event: React.SyntheticEvent;
		data: {
			node: TreeNode;
			select: boolean;
			treeIndex: string;
		};
		fromFocus?: boolean;
		clearSelectedNodes?: boolean;
	}) => void;
	searchTerm?: string;
	treeId?: string;
	treeIndex: string;
	isSelected: boolean;
	/** Whether this item is the tree's focused node */
	isFocused: boolean;
	/** Whether this item is the tree's tab stop */
	isTabStop: boolean;
	treeState: RefObject<TreeItemState>;
	/** Registers the item's node so the tree can focus it */
	registerNode: (treeIndex: string, node: HTMLElement | null) => void;
	onNodeBlur?: () => void;
	parent?: TreeNode | { nodes?: TreeNode[] };
}

const handleSelect = ({
	event,
	props,
	fromFocus,
}: {
	event: React.SyntheticEvent;
	props: ItemProps;
	fromFocus?: boolean;
}) => {
	EventUtil.trap(event);
	if (isFunction(props.onSelect)) {
		props.onSelect({
			event,
			data: {
				node: props.node,
				select: !props.isSelected,
				treeIndex: props.treeIndex,
			},
			fromFocus,
		});
	}
};

const findNextNode = (flattenedNodes: FlattenedNode[], node: TreeNode) => {
	const nodes = flattenedNodes.map((flattenedNode) => flattenedNode.node);
	const index = findIndex(nodes, { id: node.id });
	return flattenedNodes[(index + 1) % flattenedNodes.length];
};

const findPreviousNode = (flattenedNodes: FlattenedNode[], node: TreeNode) => {
	const nodes = flattenedNodes.map((flattenedNode) => flattenedNode.node);
	let index = findIndex(nodes, { id: node.id }) - 1;
	if (index < 0) {
		index += flattenedNodes.length;
	}
	return flattenedNodes[index];
};

const handleKeyDownDown = (event: React.KeyboardEvent, props: ItemProps) => {
	if (props.isFocused) {
		const flattenedNode = findNextNode(
			props.treeState.current.flattenedNodes,
			props.node
		);
		props.onSelect?.({
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

const handleKeyDownUp = (event: React.KeyboardEvent, props: ItemProps) => {
	if (props.isFocused) {
		const flattenedNode = findPreviousNode(
			props.treeState.current.flattenedNodes,
			props.node
		);
		props.onSelect?.({
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

const handleKeyDownLeft = (event: React.KeyboardEvent, props: ItemProps) => {
	const { flattenedNodes, isNodeExpanded } = props.treeState.current;
	const nodes = flattenedNodes.map((flattenedNode) => flattenedNode.node);
	const parent = props.parent as TreeNode;
	const index = findIndex(nodes, { id: parent?.id });
	if (index !== -1) {
		// `select: true` marks a move to the parent node, not an expand/collapse request.
		// Tree routes it to `onSelect` (or to the deprecated `onExpandClick`).
		props.onExpand({
			event,
			data: {
				node: parent,
				select: true,
				expand: !isNodeExpanded(parent),
				treeIndex: flattenedNodes[index].treeIndex,
			},
		});
	}
};

const handleKeyDownEnter = (event: React.KeyboardEvent, props: ItemProps) => {
	handleSelect({ event, props });
};

const handleKeyDown = (event: React.KeyboardEvent, props: ItemProps) => {
	mapKeyEventCallbacks(event, {
		callbacks: {
			[KEYS.DOWN]: {
				callback: (evt: React.KeyboardEvent) => handleKeyDownDown(evt, props),
			},
			[KEYS.UP]: {
				callback: (evt: React.KeyboardEvent) => handleKeyDownUp(evt, props),
			},
			[KEYS.LEFT]: {
				callback: (evt: React.KeyboardEvent) => handleKeyDownLeft(evt, props),
			},
			[KEYS.ENTER]: {
				callback: (evt: React.KeyboardEvent) => handleKeyDownEnter(evt, props),
			},
		},
	});
};

const handleFocus = (event: React.FocusEvent, props: ItemProps) => {
	const { treeHasFocus, focusedNodeIndex } = props.treeState.current;
	if (
		!treeHasFocus &&
		!focusedNodeIndex &&
		event.target === event.currentTarget
	) {
		handleSelect({ event, props });
	}
};

/**
 * A Tree Item is a non-branching node in a hierarchical list. The tree memoizes
 * it, so it only reads tree-wide values from `treeState` in event handlers.
 */
const Item: React.FC<ItemProps> = (props) => {
	const { isSelected, registerNode, treeIndex } = props;
	// The tree focuses the focused item after each of its renders.
	const setNodeRef = useCallback(
		(node: HTMLLIElement | null) => registerNode(treeIndex, node),
		[registerNode, treeIndex]
	);

	return (
		<li
			id={`${props.treeId}-${props.node.id}`}
			role="treeitem"
			aria-level={props.level}
			aria-selected={isSelected ? 'true' : 'false'}
			tabIndex={props.isTabStop ? 0 : -1}
			onKeyDown={(event) => handleKeyDown(event, props)}
			onFocus={(event) => handleFocus(event, props)}
			onBlur={props.onNodeBlur}
			ref={setNodeRef}
		>
			<div
				className={classNames('slds-tree__item', {
					'slds-is-selected': isSelected,
				})}
				onClick={(event) => handleSelect({ event, props })}
			>
				<Button
					aria-hidden
					tabIndex={-1}
					assistiveText={{ icon: '' }}
					iconCategory="utility"
					iconName="chevronright"
					iconSize="small"
					variant="icon"
					// `slds-hidden` keeps the chevron's space so leaf labels align with
					// branch labels; SLDS 2 no longer hides `.slds-is-disabled` here.
					className="slds-m-right_small slds-is-disabled slds-hidden"
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

Item.displayName = TREE_ITEM;

export default Item;
