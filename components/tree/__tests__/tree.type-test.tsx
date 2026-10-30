/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import Tree, { type TreeNode } from '../index';

export const item: TreeNode = { id: 1, label: 'Grains', type: 'item' };

export const branch: TreeNode = {
	id: 2,
	label: 'Fruits',
	type: 'branch',
	expanded: true,
	nodes: [item],
};

// @ts-expect-error items have no children
export const itemNodes: TreeNode = {
	id: 3,
	label: 'Nuts',
	type: 'item',
	nodes: [],
};

// @ts-expect-error items cannot expand
export const itemExpanded: TreeNode = {
	id: 4,
	label: 'Nuts',
	type: 'item',
	expanded: true,
};

// @ts-expect-error `type` is required
export const untyped: TreeNode = { id: 5, label: 'Nuts' };

// @ts-expect-error `type` is `branch` or `item`
export const folder: TreeNode = { id: 6, label: 'Nuts', type: 'folder' };

// The deprecated node fields still type-check, so existing node data compiles
export const legacyFields: TreeNode = {
	id: 7,
	label: 'Nuts',
	type: 'branch',
	selected: true,
	expanded: false,
};

export const controlled = (
	<Tree
		id="tree"
		labels={{ heading: 'Foods' }}
		nodes={[item, branch]}
		selectedIds={[1]}
		onSelect={(_event, { selectedIds }) => selectedIds.length}
		expandedIds={['a', 2]}
		onRequestToggle={(_event, { expandedIds }) => expandedIds.length}
	/>
);

export const uncontrolledExpansion = (
	<Tree
		id="tree"
		labels={{ heading: 'Foods' }}
		nodes={[item, branch]}
		selectedIds={[]}
		defaultExpandedIds={[2]}
	/>
);

// @ts-expect-error selection is controlled data: `selectedIds` is required
export const noSelection = <Tree id="tree" nodes={[item]} />;
