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

/**
 * Data passed to `onSelect` when a node is selected or deselected.
 */
export interface TreeNodeSelectData {
	/** The node whose selection is being requested */
	node: TreeNode;
	/** The requested selection state of `node` (`true` to select, `false` to deselect) */
	isSelected: boolean;
}

/**
 * Data passed to `onRequestToggle` when a branch is asked to expand or collapse.
 */
export interface TreeRequestToggleData {
	/** The branch node whose expansion is being requested */
	node: TreeNode;
	/** The requested expansion state of `node` (`true` to expand, `false` to collapse) */
	isExpanded: boolean;
}

/**
 * Data passed to the deprecated `onClick` callback.
 * @deprecated Use `onSelect` and `TreeNodeSelectData` instead.
 */
export interface TreeSelectData {
	node: TreeNode;
	select: boolean;
	treeIndex: string;
}

/**
 * Data passed to the deprecated `onExpandClick` callback.
 * @deprecated Use `onRequestToggle` and `TreeRequestToggleData` instead.
 */
export interface TreeExpandData {
	node: TreeNode;
	expand: boolean;
	treeIndex: string;
	select?: boolean;
}

export interface TreeScrollData {
	/** How far the list is scrolled, from `0` (top) to `1` (bottom). `0` when the list is not scrollable. */
	ratio: number;
	/**
	 * How far the list is scrolled, from `0` to `100`. Equal to `ratio * 100`.
	 * @deprecated Use `ratio` instead.
	 */
	percentage: number;
}

export type TreeNodeSelectHandler = (
	event: React.SyntheticEvent,
	data: TreeNodeSelectData
) => void;

export type TreeRequestToggleHandler = (
	event: React.SyntheticEvent,
	data: TreeRequestToggleData
) => void;

/** @deprecated Use `TreeNodeSelectHandler` with `onSelect` instead. */
export type TreeSelectHandler = (
	event: React.SyntheticEvent,
	data: TreeSelectData
) => void;

/** @deprecated Use `TreeRequestToggleHandler` with `onRequestToggle` instead. */
export type TreeExpandHandler = (
	event: React.SyntheticEvent,
	data: TreeExpandData
) => void;

export type TreeScrollHandler = (
	event: React.UIEvent<HTMLUListElement>,
	data: TreeScrollData
) => void;
