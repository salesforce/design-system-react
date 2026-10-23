/**
 * Type definitions for Tree component
 */

import { ReactNode } from 'react';

interface TreeNodeBase {
	/** Unique identifier for the node */
	id: string | number;
	/** Display text or content for the node */
	label: ReactNode | string;
	/** Whether the node is currently selected */
	selected?: boolean;
	/** Assistive text for screen readers (useful when label is not a string) */
	assistiveText?: string;
}

/** An expandable folder node that can contain child nodes */
export interface TreeBranchNode extends TreeNodeBase {
	type: 'branch';
	/** Whether the branch is expanded */
	expanded?: boolean;
	/** Whether the branch is loading its child nodes */
	loading?: boolean;
	/** Child nodes */
	nodes?: TreeNode[];
}

/** A leaf node. Items cannot be expanded or contain child nodes. */
export interface TreeItemNode extends TreeNodeBase {
	type: 'item';
	expanded?: never;
	loading?: never;
	nodes?: never;
}

export type TreeNode = TreeBranchNode | TreeItemNode;

export interface FlattenedNode {
	node: TreeNode;
	treeIndex: string;
}

export interface TreeAssistiveText {
	/** For users of assistive technology, if set the heading will be hidden */
	label?: string;
}

export interface TreeSelectData {
	node: TreeNode;
	select: boolean;
	treeIndex: string;
}

export interface TreeExpandData {
	node: TreeNode;
	expand: boolean;
	treeIndex: string;
	select?: boolean;
}

export interface TreeScrollData {
	percentage: number;
}

export type TreeSelectHandler = (
	event: React.SyntheticEvent,
	data: TreeSelectData
) => void;

export type TreeExpandHandler = (
	event: React.SyntheticEvent,
	data: TreeExpandData
) => void;

export type TreeScrollHandler = (
	event: React.UIEvent<HTMLUListElement>,
	data: TreeScrollData
) => void;
