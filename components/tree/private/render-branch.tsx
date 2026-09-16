/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { ReactNode } from 'react';
import findIndex from 'lodash.findindex';
import isFunction from 'lodash.isfunction';
import classNames from 'classnames';

import Button from '../../button';
import Highlighter from '../../utilities/highlighter';

import EventUtil from '../../../utilities/event';
import KEYS from '../../../utilities/key-code';
import mapKeyEventCallbacks from '../../../utilities/key-callbacks';
import { TreeNode, FlattenedNode } from '../types';

export interface RenderBranchProps {
	htmlId: string | number;
	label?: ReactNode | string;
	level: number;
	node: TreeNode;
	onExpand: (params: {
		event: React.SyntheticEvent;
		data: {
			node: TreeNode;
			expand: boolean;
			treeIndex: string;
			select?: boolean;
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
	treeIndex: string;
	flattenedNodes: FlattenedNode[];
	selectedNodeIndexes: string[];
	focusedNodeIndex?: string;
	onNodeBlur?: () => void;
	treeHasFocus?: boolean;
	parent?: TreeNode | { nodes?: TreeNode[] };
	getNodes?: (node: { nodes?: TreeNode[] }) => TreeNode[] | undefined;
}

const handleExpand = (event: React.SyntheticEvent, props: RenderBranchProps) => {
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

const handleSelect = ({
	event,
	props,
	fromFocus,
}: {
	event: React.SyntheticEvent;
	props: RenderBranchProps;
	fromFocus?: boolean;
}) => {
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

const handleKeyDownDown = (event: React.KeyboardEvent, props: RenderBranchProps) => {
	if (props.focusedNodeIndex === props.treeIndex) {
		const flattenedNode = findNextNode(props.flattenedNodes, props.node);
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

const handleKeyDownUp = (event: React.KeyboardEvent, props: RenderBranchProps) => {
	if (props.focusedNodeIndex === props.treeIndex) {
		const flattenedNode = findPreviousNode(props.flattenedNodes, props.node);
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

const handleKeyDownRight = (event: React.KeyboardEvent, props: RenderBranchProps) => {
	if (props.node.expanded) {
		const childNodes = props.getNodes?.(props.node);
		if (childNodes && childNodes.length > 0) {
			handleKeyDownDown(event, props);
		}
	} else {
		handleExpand(event, props);
	}
};

const handleKeyDownLeft = (event: React.KeyboardEvent, props: RenderBranchProps) => {
	if (props.node.expanded) {
		handleExpand(event, props);
	} else {
		const nodes = props.flattenedNodes.map((flattenedNode) => flattenedNode.node);
		const parent = props.parent as TreeNode;
		const index = findIndex(nodes, { id: parent?.id });
		if (index !== -1) {
			props.onExpand({
				event,
				data: {
					node: parent,
					select: true,
					expand: !parent.expanded,
					treeIndex: props.flattenedNodes[index].treeIndex,
				},
			});
		}
	}
};

const handleKeyDownEnter = (event: React.KeyboardEvent, props: RenderBranchProps) => {
	handleSelect({ event, props });
};

const handleKeyDown = (event: React.KeyboardEvent, props: RenderBranchProps) => {
	mapKeyEventCallbacks(event, {
		callbacks: {
			[KEYS.DOWN]: { callback: (evt: React.KeyboardEvent) => handleKeyDownDown(evt, props) },
			[KEYS.UP]: { callback: (evt: React.KeyboardEvent) => handleKeyDownUp(evt, props) },
			[KEYS.RIGHT]: { callback: (evt: React.KeyboardEvent) => handleKeyDownRight(evt, props) },
			[KEYS.LEFT]: { callback: (evt: React.KeyboardEvent) => handleKeyDownLeft(evt, props) },
			[KEYS.ENTER]: { callback: (evt: React.KeyboardEvent) => handleKeyDownEnter(evt, props) },
		},
	});
};

const handleFocus = (event: React.FocusEvent, props: RenderBranchProps) => {
	if (
		!props.treeHasFocus &&
		!props.focusedNodeIndex &&
		event.target === event.currentTarget
	) {
		handleSelect({ event, props, fromFocus: true });
	}
};

const getTabIndex = (props: RenderBranchProps): number => {
	const initialFocus =
		props.selectedNodeIndexes.length === 0 &&
		props.treeIndex === props.flattenedNodes[0]?.treeIndex;
	return props.treeIndex === props.focusedNodeIndex || initialFocus ? 0 : -1;
};

/**
 * Renders a branch node in the tree.
 */
const RenderBranch = (children: ReactNode, props: RenderBranchProps): React.ReactElement => {
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

	// aria-level and aria-expanded are valid for elements with role="treeitem"
	const ariaProps = {
		'aria-level': props.level,
		'aria-expanded': isExpanded ? 'true' as const : 'false' as const,
		'aria-label': props.node.nodes && props.node.nodes.length > 0 ? label : undefined,
	};

	return (
		// @ts-expect-error - aria-level is valid for treeitem role but not in React types
		<li
			id={String(props.htmlId)}
			role="treeitem"
			{...ariaProps}
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
			<div
				className={classNames('slds-tree__item', {
					'slds-is-selected': isSelected,
				})}
				onClick={(event) => handleSelect({ event, props })}
			>
				<Button
					assistiveText={{ icon: 'Expand Tree Branch' }}
					iconCategory="utility"
					iconName="chevronright"
					iconSize="small"
					variant="icon"
					className="slds-m-right_small"
					onClick={(event) => handleExpand(event, props)}
					tabIndex={-1}
				/>
				<span className="slds-size_1-of-1" id={`${props.htmlId}__label`}>
					<Highlighter
						search={props.searchTerm}
						className="slds-tree__item-label slds-truncate"
					>
						{props.label}
					</Highlighter>
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

RenderBranch.displayName = 'Branch';

export default RenderBranch;

