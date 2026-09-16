/**
 * Type definitions for Tree component
 */

import { ReactNode } from 'react';

export interface TreeNode {
	/** Unique identifier for the node */
	id: string | number;
	/** Display text or content for the node */
	label: ReactNode | string;
	/** Node type - use 'branch' for expandable folders */
	type: 'branch' | 'item' | string;
	/** Whether the branch is expanded (for branch type only) */
	expanded?: boolean;
	/** Whether the node is currently selected */
	selected?: boolean;
	/** Child nodes (for branch type only) */
	nodes?: TreeNode[];
	/** Assistive text for screen readers (useful when label is not a string) */
	assistiveText?: string;
	/** Whether the node is in a loading state */
	loading?: boolean;
}

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



