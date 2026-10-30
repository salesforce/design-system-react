/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useState,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from 'react';
import classNames from 'classnames';
// Using native Array.find instead of lodash for better TypeScript support

// Child components
import Branch from './private/branch';

// Similar to React's PropTypes check
import checkProps, { checkLegacyNodeFields } from './check-props';
import { useControllableState } from '../../utilities/hooks';

// Constants
import { TREE } from '../../utilities/constants';
import componentDoc from './component.json';

import {
	TreeNode,
	TreeNodeId,
	FlattenedNode,
	TreeAssistiveText,
	TreeLabels,
	TreeNodeSelectData,
	TreeRequestToggleData,
	TreeSelectData,
	TreeExpandData,
	TreeScrollData,
} from './types';

export interface TreeProps {
	/**
	 * **Assistive text for accessibility**
	 * * `heading`: Visually hidden tree heading. Set this or `labels.heading`.
	 */
	assistiveText?: TreeAssistiveText;
	/** Class names for the container element */
	className?: string | string[] | Record<string, boolean>;
	/** Class names for the top-level ul element */
	listClassName?: string | string[] | Record<string, boolean>;
	/** Function to get child nodes from a parent node */
	getNodes?: (node: { nodes?: TreeNode[] }) => TreeNode[] | undefined;
	/** @deprecated Use `labels.heading` instead. */
	heading?: ReactNode;
	/** HTML id of the tree container (required) */
	id: string;
	/**
	 * **Text labels for internationalization**
	 * * `heading`: Visible tree heading that describes its contents. Set this or `assistiveText.heading`.
	 */
	labels?: TreeLabels;
	/**
	 * Array of tree nodes. The tree never modifies them: selection comes from `selectedIds` and
	 * expansion from `expandedIds` / `defaultExpandedIds`.
	 */
	nodes: TreeNode[];
	/**
	 * Ids of the selected nodes (`[]` for none). The tree is controlled: it renders this selection and
	 * reports changes through `onSelect`, where `data.selectedIds` is the requested selection.
	 *
	 * When omitted, the tree falls back to the deprecated `node.selected` fields (read-only) and warns.
	 */
	selectedIds: TreeNodeId[];
	/**
	 * Ids of the expanded branches. Pass it to control expansion and update it from
	 * `onRequestToggle` (`data.expandedIds` is the requested set). Leave it `undefined` to let the
	 * tree manage expansion itself, starting from `defaultExpandedIds`.
	 */
	expandedIds?: TreeNodeId[];
	/**
	 * Ids of the branches expanded on first render when `expandedIds` is not passed. Defaults to `[]`.
	 *
	 * When neither `expandedIds` nor `defaultExpandedIds` is passed, a branch's deprecated
	 * `node.expanded` field (read-only) still decides whether it is expanded, and the tree warns.
	 */
	defaultExpandedIds?: TreeNodeId[];
	/**
	 * Called when an item or branch is selected or deselected: by click, by focus, or by keyboard
	 * (Enter, Up/Down arrows, Right arrow into an expanded branch, Left arrow to the parent node).
	 * `data.isSelected` is the requested selection state of `data.node` and `data.selectedIds` the
	 * requested selection. Update `selectedIds` to apply it.
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
	 * requested expansion state of `data.node` and `data.expandedIds` the requested set. Called
	 * whether or not expansion is controlled; when `expandedIds` is passed, update it to apply the change.
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

type GetNodes = (node: { nodes?: TreeNode[] }) => TreeNode[] | undefined;

const EMPTY_IDS: TreeNodeId[] = [];

/**
 * Flattens the visible part of the tree (expanded branches only) into a flat array.
 * The first item is the root and should be removed with slice(1).
 */
const flattenTree = (
	root: { nodes?: TreeNode[] },
	getNodes: GetNodes,
	isExpanded: (node: TreeNode) => boolean,
	treeIndex = '',
	firstLevel = true
): FlattenedNode[] => {
	if (!root.nodes) {
		return [{ node: root as TreeNode, treeIndex }];
	}
	let nodes: FlattenedNode[] = [{ node: root as TreeNode, treeIndex }];
	if (firstLevel || isExpanded(root as TreeNode)) {
		for (let index = 0; index < root.nodes.length; index += 1) {
			const curNode = firstLevel ? root.nodes[index] : getNodes(root)?.[index];
			if (curNode) {
				nodes = nodes.concat(
					flattenTree(
						curNode,
						getNodes,
						isExpanded,
						treeIndex ? `${treeIndex}-${index}` : `${index}`,
						false
					)
				);
			}
		}
	}
	return nodes;
};

/**
 * Ids of every node in the tree (visible or not) that matches `predicate`.
 * Used only for the deprecated `node.selected` / `node.expanded` fallback.
 */
const collectNodeIds = (
	nodes: TreeNode[],
	getNodes: GetNodes,
	predicate: (node: TreeNode) => boolean
): TreeNodeId[] => {
	const ids: TreeNodeId[] = [];
	const visited = new Set<TreeNode>();
	const visit = (list: TreeNode[] | undefined) => {
		list?.forEach((node) => {
			if (node && !visited.has(node)) {
				visited.add(node);
				if (predicate(node)) {
					ids.push(node.id);
				}
				visit(getNodes(node));
			}
		});
	};
	visit(getNodes({ nodes }));
	return ids;
};

const defaultGetNodes = (node: { nodes?: TreeNode[] }) => node.nodes;

/**
 * A tree is visualization of a structure hierarchy.
 * A branch can be expanded or collapsed.
 * Selection is controlled through `selectedIds`. Expansion is controlled through `expandedIds`, or
 * managed by the tree (starting from `defaultExpandedIds`) when `expandedIds` is not passed.
 */
const Tree: React.FC<TreeProps> = ({
	assistiveText: assistiveTextProp,
	className,
	listClassName,
	getNodes = defaultGetNodes,
	heading: headingProp,
	id,
	labels,
	nodes,
	selectedIds,
	expandedIds,
	defaultExpandedIds,
	onSelect,
	onClick,
	onRequestToggle,
	onExpandClick,
	onScroll,
	searchTerm,
	listStyle,
}) => {
	// `assistiveText.label` is deprecated
	const assistiveHeading =
		assistiveTextProp?.heading ?? assistiveTextProp?.label;
	// `heading` is deprecated
	const visibleHeading = labels?.heading ?? headingProp;

	// Without `selectedIds`, selection is read from the deprecated `node.selected` fields
	const isLegacySelection = selectedIds === undefined;
	// Without `expandedIds` and `defaultExpandedIds`, the deprecated `node.expanded` fields win
	const isLegacyExpansion =
		expandedIds === undefined && defaultExpandedIds === undefined;

	// Expansion is ephemeral UI state: controlled when `expandedIds` is passed
	const [currentExpandedIds, setExpandedIds] = useControllableState(
		expandedIds,
		defaultExpandedIds ?? EMPTY_IDS
	);

	const selectedIdSet = useMemo(
		() => new Set<TreeNodeId>(selectedIds ?? EMPTY_IDS),
		[selectedIds]
	);
	const expandedIdSet = useMemo(
		() => new Set<TreeNodeId>(currentExpandedIds),
		[currentExpandedIds]
	);

	const isNodeSelected = useCallback(
		(node: TreeNode) =>
			isLegacySelection ? !!node.selected : selectedIdSet.has(node.id),
		[isLegacySelection, selectedIdSet]
	);

	const isNodeExpanded = useCallback(
		(node: TreeNode) =>
			isLegacyExpansion && node.expanded !== undefined
				? !!node.expanded
				: expandedIdSet.has(node.id),
		[isLegacyExpansion, expandedIdSet]
	);

	// Track if tree has focus
	const treeHasFocusRef = useRef(false);

	// Visible nodes in display order
	const flattenedNodes = useMemo(
		() =>
			flattenTree(
				{ nodes: getNodes({ nodes }) },
				getNodes,
				isNodeExpanded
			).slice(1),
		[getNodes, nodes, isNodeExpanded]
	);

	// Roving focus is ephemeral and internal. Until a node has been focused, the first visible
	// selected node is the tab stop.
	const [focusedNodeIndex, setFocusedNodeIndex] = useState<string | undefined>(
		undefined
	);
	const effectiveFocusedNodeIndex =
		focusedNodeIndex ??
		flattenedNodes.find((flattenedNode) => isNodeSelected(flattenedNode.node))
			?.treeIndex;
	const tabStopIndex =
		effectiveFocusedNodeIndex ?? flattenedNodes[0]?.treeIndex;

	// Check props on mount
	useEffect(() => {
		checkProps(
			TREE,
			{
				assistiveText: assistiveTextProp,
				className,
				listClassName,
				getNodes,
				heading: headingProp,
				id,
				labels,
				nodes,
				selectedIds,
				expandedIds,
				defaultExpandedIds,
				onSelect,
				onClick,
				onRequestToggle,
				onExpandClick,
				onScroll,
				searchTerm,
				listStyle,
			},
			componentDoc
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Warn about the deprecated `node.expanded` fallback whenever visible nodes use it
	useEffect(() => {
		if (process.env.NODE_ENV !== 'production' && isLegacyExpansion) {
			checkLegacyNodeFields(TREE, {
				hasExpandedField: flattenedNodes.some(
					(flattenedNode) => flattenedNode.node.expanded !== undefined
				),
			});
		}
	}, [isLegacyExpansion, flattenedNodes]);

	const getSelectedIds = useCallback(
		() =>
			isLegacySelection
				? collectNodeIds(nodes, getNodes, (node) => !!node.selected)
				: (selectedIds as TreeNodeId[]),
		[isLegacySelection, nodes, getNodes, selectedIds]
	);

	const getExpandedIds = useCallback(
		() =>
			isLegacyExpansion
				? collectNodeIds(
						nodes,
						getNodes,
						(node) => node.type === 'branch' && isNodeExpanded(node)
					)
				: currentExpandedIds,
		[isLegacyExpansion, nodes, getNodes, isNodeExpanded, currentExpandedIds]
	);

	// Handle node selection. Never writes to `nodes`: it reports the requested selection.
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
			// Prevent firing twice on first click due to focus event
			if (!fromFocus) {
				if (onSelect) {
					// Keyboard navigation moves the selection to the node; click and Enter toggle it
					const others = clearSelectedNodes
						? []
						: getSelectedIds().filter((nodeId) => nodeId !== data.node.id);
					onSelect(event, {
						node: data.node,
						isSelected: data.select,
						selectedIds: data.select ? [...others, data.node.id] : others,
					});
				} else if (onClick) {
					onClick(event, data);
				}
			}

			treeHasFocusRef.current = true;
			setFocusedNodeIndex(data.treeIndex);
		},
		[getSelectedIds, onSelect, onClick]
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
			const others = getExpandedIds().filter(
				(nodeId) => nodeId !== data.node.id
			);
			const nextExpandedIds = data.expand ? [...others, data.node.id] : others;
			// No-op when `expandedIds` is controlled
			setExpandedIds(nextExpandedIds);
			if (onRequestToggle) {
				onRequestToggle(event, {
					node: data.node,
					isExpanded: data.expand,
					expandedIds: nextExpandedIds,
				});
			} else if (onExpandClick) {
				onExpandClick(event, data);
			}
		},
		[
			handleSelect,
			getExpandedIds,
			setExpandedIds,
			onRequestToggle,
			onExpandClick,
		]
	);

	// Determine heading text
	const headingText = assistiveHeading || visibleHeading;

	return (
		<div id={id} className={classNames('slds-tree_container', className)}>
			<h4
				className={classNames('slds-tree__group-header', {
					'slds-assistive-text': !!assistiveHeading,
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
				isNodeSelected={isNodeSelected}
				isNodeExpanded={isNodeExpanded}
				tabStopIndex={tabStopIndex}
				focusedNodeIndex={effectiveFocusedNodeIndex}
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
