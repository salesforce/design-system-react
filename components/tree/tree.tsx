/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
// Using native Array.find instead of lodash for better TypeScript support

// Child components
import Branch from './private/branch';

// Similar to React's PropTypes check
import checkProps from './check-props';

// Constants
import { TREE } from '../../utilities/constants';

import {
	TreeNode,
	FlattenedNode,
	TreeAssistiveText,
	TreeNodeSelectData,
	TreeRequestToggleData,
	TreeSelectData,
	TreeExpandData,
	TreeScrollData,
} from './types';

export interface TreeProps {
	/** Assistive text for accessibility */
	assistiveText?: TreeAssistiveText;
	/** Class names for the container element */
	className?: string | string[] | Record<string, boolean>;
	/** Class names for the top-level ul element */
	listClassName?: string | string[] | Record<string, boolean>;
	/** Function to get child nodes from a parent node */
	getNodes?: (node: { nodes?: TreeNode[] }) => TreeNode[] | undefined;
	/** Tree heading that describes its contents */
	heading?: ReactNode | string;
	/** HTML id of the tree container (required) */
	id: string;
	/** Array of tree nodes */
	nodes: TreeNode[];
	/**
	 * Called when an item or branch is selected or deselected: by click, by focus, or by keyboard
	 * (Enter, Up/Down arrows, Right arrow into an expanded branch, Left arrow to the parent node).
	 * `data.isSelected` is the requested selection state. Update `node.selected` in `nodes` to apply it.
	 */
	onSelect?: (event: React.SyntheticEvent, data: TreeNodeSelectData) => void;
	/**
	 * Called when an item or branch is selected.
	 * @deprecated Use `onSelect`, which receives `{ node, isSelected }`. Ignored when `onSelect` is passed.
	 */
	onClick?: (event: React.SyntheticEvent, data: TreeSelectData) => void;
	/**
	 * Called when a branch is asked to expand or collapse: by clicking its toggle button, by Right
	 * arrow on a collapsed branch, or by Left arrow on an expanded branch. `data.isExpanded` is the
	 * requested expansion state. Update `node.expanded` in `nodes` to apply it.
	 */
	onRequestToggle?: (
		event: React.SyntheticEvent,
		data: TreeRequestToggleData
	) => void;
	/**
	 * Called when a branch's expand/collapse button is clicked, or when the Left arrow is pressed
	 * on a collapsed branch or item (with `data.select: true` and `data.node` set to the parent).
	 * @deprecated Use `onRequestToggle`, which receives `{ node, isExpanded }`. With
	 * `onRequestToggle`, Left arrow on a collapsed branch or item selects the parent via
	 * `onSelect` instead. Ignored when `onRequestToggle` is passed.
	 */
	onExpandClick?: (event: React.SyntheticEvent, data: TreeExpandData) => void;
	/** Callback when the tree list scrolls. `data.ratio` is the scroll position from `0` to `1`. */
	onScroll?: (
		event: React.UIEvent<HTMLUListElement>,
		data: TreeScrollData
	) => void;
	/** Search term to highlight in node labels */
	searchTerm?: string;
	/** Styles for the top-level ul element */
	listStyle?: React.CSSProperties;
}

type ReactNode = React.ReactNode;

/**
 * Flattens hierarchical tree structure into a flat array.
 * The first item is the whole tree and should be removed with slice(1).
 */
const flattenTree = (
	root: { nodes?: TreeNode[]; expanded?: boolean },
	getNodes: (node: { nodes?: TreeNode[] }) => TreeNode[] | undefined,
	treeIndex = '',
	firstLevel = true
): FlattenedNode[] => {
	if (!root.nodes) {
		return [{ node: root as TreeNode, treeIndex }];
	}
	let nodes: FlattenedNode[] = [{ node: root as TreeNode, treeIndex }];
	if (root.expanded) {
		for (let index = 0; index < root.nodes.length; index += 1) {
			const curNode = firstLevel ? root.nodes[index] : getNodes(root)?.[index];
			if (curNode) {
				nodes = nodes.concat(
					flattenTree(
						curNode,
						getNodes,
						treeIndex ? `${treeIndex}-${index}` : `${index}`,
						false
					)
				);
			}
		}
	}
	return nodes;
};

const defaultGetNodes = (node: { nodes?: TreeNode[] }) => node.nodes;

/**
 * A tree is visualization of a structure hierarchy.
 * A branch can be expanded or collapsed.
 * This is a controlled component, since visual state is present in the nodes data.
 */
const Tree: React.FC<TreeProps> = ({
	assistiveText: assistiveTextProp,
	className,
	listClassName,
	getNodes = defaultGetNodes,
	heading,
	id,
	nodes,
	onSelect,
	onClick,
	onRequestToggle,
	onExpandClick,
	onScroll,
	searchTerm,
	listStyle,
}) => {
	// Merge assistive text with defaults
	const assistiveText =
		typeof assistiveTextProp === 'string'
			? assistiveTextProp
			: assistiveTextProp?.label;

	// Track if tree has focus
	const treeHasFocusRef = useRef(false);

	// Compute flattened nodes
	const computeFlattenedNodes = useCallback(() => {
		return flattenTree(
			{
				nodes: getNodes({ nodes }),
				expanded: true,
			},
			getNodes
		).slice(1);
	}, [getNodes, nodes]);

	// Initialize state
	const [flattenedNodes, setFlattenedNodes] = useState<FlattenedNode[]>(
		computeFlattenedNodes
	);
	const [selectedNodeIndexes, setSelectedNodeIndexes] = useState<string[]>(
		() => {
			const flattened = computeFlattenedNodes();
			const selectedNode = flattened.find((curNode) => curNode.node.selected);
			return selectedNode ? [selectedNode.treeIndex] : [];
		}
	);
	const [focusedNodeIndex, setFocusedNodeIndex] = useState<string | undefined>(
		() => {
			const flattened = computeFlattenedNodes();
			const selectedNode = flattened.find((curNode) => curNode.node.selected);
			return selectedNode?.treeIndex;
		}
	);

	// Check props on mount
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(checkProps as any)(
			TREE,
			{
				assistiveText: assistiveTextProp,
				className,
				listClassName,
				getNodes,
				heading,
				id,
				nodes,
				onSelect,
				onClick,
				onRequestToggle,
				onExpandClick,
				onScroll,
				searchTerm,
				listStyle,
			},
			{}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Update flattened nodes when nodes prop changes
	useEffect(() => {
		setFlattenedNodes(computeFlattenedNodes());
	}, [computeFlattenedNodes, nodes]);

	// Handle node selection
	const handleSelect = useCallback(
		({
			event,
			data,
			clearSelectedNodes,
			fromFocus,
		}: {
			event: React.SyntheticEvent;
			data: TreeSelectData;
			clearSelectedNodes?: boolean;
			fromFocus?: boolean;
		}) => {
			// When triggered by a key event, other nodes should be deselected
			if (clearSelectedNodes) {
				flattenedNodes.forEach((flattenedNode) => {
					if (flattenedNode.node.selected) {
						flattenedNode.node.selected = false;
					}
				});
			}

			// Prevent firing twice on first click due to focus event
			if (!fromFocus) {
				if (onSelect) {
					onSelect(event, { node: data.node, isSelected: data.select });
				} else if (onClick) {
					onClick(event, data);
				}
			}

			// Update selected and focused nodes
			let newSelectedNodeIndexes: string[];
			if (data.select) {
				newSelectedNodeIndexes = [...selectedNodeIndexes, data.treeIndex];
			} else {
				newSelectedNodeIndexes = selectedNodeIndexes.filter(
					(treeIndex) => treeIndex !== data.treeIndex
				);
			}

			treeHasFocusRef.current = true;
			setFocusedNodeIndex(data.treeIndex);
			setSelectedNodeIndexes(newSelectedNodeIndexes);
		},
		[flattenedNodes, onSelect, onClick, selectedNodeIndexes]
	);

	// Handle node blur
	const handleNodeBlur = useCallback(() => {
		treeHasFocusRef.current = false;
	}, []);

	// Handle expand/collapse
	const handleExpand = useCallback(
		({
			event,
			data,
		}: {
			event: React.SyntheticEvent;
			data: TreeExpandData;
		}) => {
			// `data.select` marks Left arrow on a collapsed branch or item: move to the parent node.
			if (data.select) {
				if (!onRequestToggle && onExpandClick) {
					// Deprecated behavior: report it to `onExpandClick` with the parent node
					treeHasFocusRef.current = true;
					onExpandClick(event, data);
					setFocusedNodeIndex(data.treeIndex);
				} else {
					// Not an expand/collapse request: select the parent, like Up/Down arrows do
					handleSelect({
						event,
						data: { node: data.node, select: true, treeIndex: data.treeIndex },
						clearSelectedNodes: true,
					});
				}
				return;
			}

			treeHasFocusRef.current = true;
			if (onRequestToggle) {
				onRequestToggle(event, { node: data.node, isExpanded: data.expand });
			} else if (onExpandClick) {
				onExpandClick(event, data);
			}
		},
		[handleSelect, onRequestToggle, onExpandClick]
	);

	// Determine heading text
	const headingText = assistiveText || heading;

	return (
		<div id={id} className={classNames('slds-tree_container', className)}>
			<h4
				className={classNames('slds-tree__group-header', {
					'slds-assistive-text': !!assistiveText,
				})}
				id={`${id}__heading`}
			>
				{headingText}
			</h4>
			<Branch
				getNodes={getNodes}
				initalClassName={listClassName}
				htmlId={id}
				initialStyle={listStyle}
				level={0}
				node={{ nodes }}
				flattenedNodes={flattenedNodes}
				selectedNodeIndexes={selectedNodeIndexes}
				focusedNodeIndex={focusedNodeIndex}
				treeHasFocus={treeHasFocusRef.current}
				onNodeBlur={handleNodeBlur}
				onSelect={handleSelect}
				onExpand={handleExpand}
				onScroll={onScroll}
				searchTerm={searchTerm}
				treeId={id}
			/>
		</div>
	);
};

Tree.displayName = TREE;

export default Tree;
