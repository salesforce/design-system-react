/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { ReactNode } from 'react';
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
	flattenedNodes: FlattenedNode[];
	selectedNodeIndexes: string[];
	focusedNodeIndex?: string;
	onNodeBlur?: () => void;
	treeHasFocus?: boolean;
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

const handleKeyDownDown = (event: React.KeyboardEvent, props: ItemProps) => {
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

const handleKeyDownUp = (event: React.KeyboardEvent, props: ItemProps) => {
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

const handleKeyDownLeft = (event: React.KeyboardEvent, props: ItemProps) => {
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
};

const handleKeyDownEnter = (event: React.KeyboardEvent, props: ItemProps) => {
	handleSelect({ event, props });
};

const handleKeyDown = (event: React.KeyboardEvent, props: ItemProps) => {
	mapKeyEventCallbacks(event, {
		callbacks: {
			[KEYS.DOWN]: { callback: (evt: React.KeyboardEvent) => handleKeyDownDown(evt, props) },
			[KEYS.UP]: { callback: (evt: React.KeyboardEvent) => handleKeyDownUp(evt, props) },
			[KEYS.LEFT]: { callback: (evt: React.KeyboardEvent) => handleKeyDownLeft(evt, props) },
			[KEYS.ENTER]: { callback: (evt: React.KeyboardEvent) => handleKeyDownEnter(evt, props) },
		},
	});
};

const handleFocus = (event: React.FocusEvent, props: ItemProps) => {
	if (
		!props.treeHasFocus &&
		!props.focusedNodeIndex &&
		event.target === event.currentTarget
	) {
		handleSelect({ event, props });
	}
};

const getTabIndex = (props: ItemProps): number => {
	const initialFocus =
		props.selectedNodeIndexes.length === 0 &&
		props.treeIndex === props.flattenedNodes[0]?.treeIndex;
	return props.treeIndex === props.focusedNodeIndex || initialFocus ? 0 : -1;
};

/**
 * A Tree Item is a non-branching node in a hierarchical list.
 */
const Item: React.FC<ItemProps> = (props) => {
	const isSelected = props.node.selected;
	const isFocused = props.treeIndex === props.focusedNodeIndex;

	return (
		<li
			id={`${props.treeId}-${props.node.id}`}
			role="treeitem"
			aria-level={props.level}
			aria-selected={isSelected ? 'true' : 'false'}
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
					tabIndex={-1}
					assistiveText={{ icon: '' }}
					iconCategory="utility"
					iconName="chevronright"
					iconSize="small"
					variant="icon"
					className="slds-m-right_small slds-is-disabled"
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

