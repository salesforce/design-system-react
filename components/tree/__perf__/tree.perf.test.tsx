/*
 * Tree render cost (plan D2, checks 2, 3 and 6), with 500 nodes. Items are
 * internal, so they're counted through a module mock.
 */
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, beforeEach } from 'vitest';

import Tree from '../index';
import type { TreeNode, TreeNodeId } from '../types';
import {
	checkBudget,
	getRenderCount,
	renderCounted,
	resetRenderCounts,
} from '~/tests/perf/helpers';

vi.mock('../private/item', async (importOriginal) => {
	const { countRendersModule } = await import('~/tests/perf/helpers');
	return countRendersModule(await importOriginal(), 'Item');
});

// 10 expanded branches of 49 items: 500 nodes, 490 rendered items.
const nodes: TreeNode[] = Array.from({ length: 10 }, (_, b) => ({
	id: `b${b}`,
	label: `Branch ${b}`,
	type: 'branch' as const,
	nodes: Array.from({ length: 49 }, (_, i) => ({
		id: `b${b}-${i}`,
		label: `Item ${b}-${i}`,
		type: 'item' as const,
	})),
}));
const expandedIds = nodes.map((node) => node.id);
const getNodes = (node: { nodes?: TreeNode[] }) => node.nodes;

// The usual parent: inline callbacks, selection in state.
const Example = () => {
	const [selectedIds, setSelectedIds] = useState<TreeNodeId[]>([]);
	const [, setTick] = useState(0);
	return (
		<>
			<button type="button" onClick={() => setTick((t) => t + 1)}>
				parent
			</button>
			<Tree
				id="perf-tree"
				labels={{ heading: 'Tree' }}
				nodes={nodes}
				getNodes={getNodes}
				expandedIds={expandedIds}
				selectedIds={selectedIds}
				onSelect={(_event, data) =>
					setSelectedIds(data.isSelected ? [data.node.id] : [])
				}
				onRequestToggle={() => {}}
			/>
		</>
	);
};

beforeEach(() => resetRenderCounts());

describe('Tree (500 nodes)', () => {
	it('re-rendering with identical props re-renders no item (check 2)', () => {
		const props = {
			id: 'perf-tree',
			labels: { heading: 'Tree' },
			nodes,
			getNodes,
			expandedIds,
			selectedIds: [] as TreeNodeId[],
			onSelect: () => {},
			onRequestToggle: () => {},
		};
		const result = renderCounted(<Tree {...props} />);
		resetRenderCounts();
		result.rerender(<Tree {...props} />);
		checkBudget(
			'Tree/identical-props',
			{ itemRenders: getRenderCount('Item') },
			{ itemRenders: 0 }
		);
		result.unmount();
	});

	it('a parent re-render with new callbacks re-renders no item (check 3)', async () => {
		const user = userEvent.setup({ delay: null });
		const result = renderCounted(<Example />);
		resetRenderCounts();
		await user.click(result.getByText('parent'));
		checkBudget(
			'Tree/parent-rerender',
			{ itemRenders: getRenderCount('Item') },
			{ itemRenders: 0 }
		);
		result.unmount();
	});

	it('selecting one item re-renders at most two (check 6)', async () => {
		const user = userEvent.setup({ delay: null });
		const result = renderCounted(<Example />);
		await user.click(result.getByText('Item 3-10'));
		resetRenderCounts();
		await user.click(result.getByText('Item 7-20'));
		checkBudget(
			'Tree/select-item',
			{ itemRenders: getRenderCount('Item') },
			{ itemRenders: 2 }
		);
		result.unmount();
	});
});
