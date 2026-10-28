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
	/** Heading for users of assistive technology. Use instead of `labels.heading` to hide the heading visually. */
	heading?: string;
	/** @deprecated Use `assistiveText.heading` instead. */
	label?: string;
}

export interface TreeLabels {
	/** Visible tree heading that describes its contents */
	heading?: ReactNode;
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
