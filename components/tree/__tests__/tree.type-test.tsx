/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import Tree from '../index';
import type { TreeNode } from '../index';

const nodes: TreeNode[] = [
	{ id: 'a', label: 'A', type: 'branch', nodes: [] },
	{ id: 'b', label: 'B', type: 'item' },
];

export const visibleHeading = (
	<Tree
		id="t"
		nodes={nodes}
		selectedIds={[]}
		onSelect={() => {}}
		labels={{ heading: 'Tree' }}
	/>
);

export const hiddenHeading = (
	<Tree
		id="t"
		nodes={nodes}
		selectedIds={[]}
		onSelect={() => {}}
		assistiveText={{ heading: 'Tree' }}
	/>
);

export const bothHeadings = (
	// @ts-expect-error a heading is visible or hidden, not both
	<Tree
		id="t"
		nodes={nodes}
		selectedIds={[]}
		onSelect={() => {}}
		labels={{ heading: 'Tree' }}
		assistiveText={{ heading: 'Tree' }}
	/>
);

// @ts-expect-error an item cannot contain nodes
export const itemWithNodes: TreeNode = {
	id: 'c',
	label: 'C',
	type: 'item',
	nodes: [],
};

export const unknownType: TreeNode = {
	id: 'd',
	label: 'D',
	// @ts-expect-error `type` is `branch` or `item`
	type: 'leaf',
};
