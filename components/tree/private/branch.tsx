/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { ReactNode } from 'react';

import Item from './item';
import RenderInitialBranch from './render-initial-branch';
import RenderBranch from './render-branch';

import { TREE_BRANCH } from '../../../utilities/constants';
import generateId from '../../../utilities/generate-id';
import { TreeNode, FlattenedNode, TreeScrollData } from '../types';

export interface BranchProps {
	getNodes?: (node: { nodes?: TreeNode[] }) => TreeNode[] | undefined;
	htmlId: string | number;
	index?: number;
	initial?: boolean;
	initalClassName?: string | string[] | Record<string, boolean>;
	initialStyle?: React.CSSProperties;
	label?: ReactNode | string;
	level: number;
	node: TreeNode | { nodes?: TreeNode[] };
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
	onExpand: (params: {
		event: React.SyntheticEvent;
		data: {
			node: TreeNode;
			expand: boolean;
			treeIndex: string;
			select?: boolean;
		};
	}) => void;
	onScroll?: (
		event: React.UIEvent<HTMLUListElement>,
		data: TreeScrollData
	) => void;
	searchTerm?: string;
	treeId: string;
	treeIndex?: string;
	flattenedNodes: FlattenedNode[];
	/** Whether a node is selected (from `selectedIds`, or the deprecated `node.selected`) */
	isNodeSelected: (node: TreeNode) => boolean;
	/** Whether a branch is expanded (from expansion state, or the deprecated `node.expanded`) */
	isNodeExpanded: (node: TreeNode) => boolean;
	/** Tree index of the node that is the tree's tab stop */
	tabStopIndex?: string;
	focusedNodeIndex?: string;
	onNodeBlur?: () => void;
	treeHasFocus?: boolean;
	parent?: TreeNode | { nodes?: TreeNode[] };
	nodes?: TreeNode[];
}

const defaultGetNodes = (node: { nodes?: TreeNode[] }) => node.nodes;

/**
 * A Tree Branch is an expandable node in a hierarchical list.
 */
const Branch: React.FC<BranchProps> = ({
	level = 0,
	label = '',
	treeIndex = '',
	getNodes = defaultGetNodes,
	...rest
}) => {
	const props = {
		level,
		label,
		treeIndex,
		getNodes,
		...rest,
	};

	const { treeId, onExpand, searchTerm, node } = props;
	let resolvedTreeIndex = '';
	let children: ReactNode = null;

	const nodeChildren = getNodes(node);
	if (Array.isArray(nodeChildren)) {
		children = nodeChildren.map((childNode, index) => {
			let child: ReactNode;
			const htmlId = `${treeId}-${childNode.id}`;
			resolvedTreeIndex = `${index}`;
			if (treeIndex) {
				resolvedTreeIndex = `${treeIndex}-${resolvedTreeIndex}`;
			}

			if (childNode.type === 'branch') {
				child = (
					<Branch
						getNodes={getNodes}
						htmlId={htmlId}
						key={childNode.id}
						label={childNode.label}
						level={level + 1}
						node={childNode}
						flattenedNodes={props.flattenedNodes}
						isNodeSelected={props.isNodeSelected}
						isNodeExpanded={props.isNodeExpanded}
						tabStopIndex={props.tabStopIndex}
						focusedNodeIndex={props.focusedNodeIndex}
						treeHasFocus={props.treeHasFocus}
						onNodeBlur={props.onNodeBlur}
						nodes={childNode.nodes}
						onSelect={props.onSelect}
						onExpand={onExpand}
						searchTerm={searchTerm}
						treeId={treeId}
						treeIndex={resolvedTreeIndex}
						parent={node}
					/>
				);
			} else {
				child = (
					<Item
						label={childNode.label}
						htmlId={htmlId}
						key={generateId()}
						level={level + 1}
						node={childNode}
						flattenedNodes={props.flattenedNodes}
						isNodeSelected={props.isNodeSelected}
						isNodeExpanded={props.isNodeExpanded}
						tabStopIndex={props.tabStopIndex}
						focusedNodeIndex={props.focusedNodeIndex}
						treeHasFocus={props.treeHasFocus}
						onNodeBlur={props.onNodeBlur}
						onSelect={props.onSelect}
						onExpand={onExpand}
						searchTerm={searchTerm}
						treeIndex={resolvedTreeIndex}
						treeId={treeId}
						parent={node}
					/>
				);
			}
			return child;
		});
	}

	const branch =
		level === 0
			? RenderInitialBranch(children, props)
			: RenderBranch(children, {
					...props,
					node: node as TreeNode,
					treeIndex,
				});

	return branch;
};

Branch.displayName = TREE_BRANCH;

export default Branch;
