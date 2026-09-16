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
	/** Callback when an item or branch is selected */
	onClick: (event: React.SyntheticEvent, data: TreeSelectData) => void;
	/** Callback when expand/collapse icon is clicked */
	onExpandClick: (event: React.SyntheticEvent, data: TreeExpandData) => void;
	/** Callback when the tree list scrolls */
	onScroll?: (event: React.UIEvent<HTMLUListElement>, data: TreeScrollData) => void;
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
	onClick,
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
	const [selectedNodeIndexes, setSelectedNodeIndexes] = useState<string[]>(() => {
		const flattened = computeFlattenedNodes();
		const selectedNode = flattened.find((curNode) => curNode.node.selected);
		return selectedNode ? [selectedNode.treeIndex] : [];
	});
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
		(checkProps as any)(TREE, {
			assistiveText: assistiveTextProp,
			className,
			listClassName,
			getNodes,
			heading,
			id,
			nodes,
			onClick,
			onExpandClick,
			onScroll,
			searchTerm,
			listStyle,
		}, {});
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
				onClick(event, data);
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
		[flattenedNodes, onClick, selectedNodeIndexes]
	);

	// Handle node blur
	const handleNodeBlur = useCallback(() => {
		treeHasFocusRef.current = false;
	}, []);

	// Handle expand/collapse
	const handleExpand = useCallback(
		({ event, data }: { event: React.SyntheticEvent; data: TreeExpandData }) => {
			treeHasFocusRef.current = true;
			onExpandClick(event, data);

			if (data.select) {
				setFocusedNodeIndex(data.treeIndex);
			}
		},
		[onExpandClick]
	);

	// Determine heading text
	const headingText = assistiveText || heading;

	return (
		<div
			id={id}
			className={classNames('slds-tree_container', className)}
		>
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

