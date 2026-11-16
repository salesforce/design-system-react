/*
 * Timing benchmarks (plan D4), report-only: large combobox, table and tree
 * workloads. Run with `npm run perf:bench`; CI compares the JSON with
 * master's and warns, never fails.
 */
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { bench, describe } from 'vitest';

import Combobox from '../../components/combobox';
import filter from '../../components/combobox/filter';
import SimpleDataTable from '../../components/simple-data-table';
import SimpleDataTableColumn from '../../components/simple-data-table/column';
import Tree from '../../components/tree';
import type { TreeNode } from '../../components/tree/types';

// Benchmarks render outside act(), as an app does; Testing Library's setup
// turns React's act warnings on.
(
	globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = false;

let host: HTMLDivElement;
let root: Root;
const setup = () => {
	// Benchmarks render outside act(), as an app does. Testing Library (loaded
	// by the browser setup file) turns React's act warnings on.
	(
		globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
	).IS_REACT_ACT_ENVIRONMENT = false;
	host = document.createElement('div');
	document.body.appendChild(host);
	root = createRoot(host);
};
const teardown = () => {
	root.unmount();
	host.remove();
};
const render = (node: React.ReactNode) => flushSync(() => root.render(node));
const noop = () => {};

describe('Combobox (1,000 options)', () => {
	const options = Array.from({ length: 1000 }, (_, i) => ({
		id: `option-${i}`,
		label: `${['abc', 'abd', 'xyz', 'mno'][i % 4]} account ${i}`,
	}));
	const combobox = (inputValue: string) => (
		<Combobox
			id="bench-combobox"
			isOpen
			labels={{ label: 'Account' }}
			events={{ onChange: noop, onSelect: noop }}
			menuPosition="relative"
			options={filter({ inputValue, options, selection: [], limit: 1000 })}
			selection={[]}
			value={inputValue}
		/>
	);
	const terms = ['a', 'ab', 'abc', 'ab', 'a', ''];
	let step = 0;
	bench(
		'filter while typing',
		() => {
			step = (step + 1) % terms.length;
			render(combobox(terms[step]));
		},
		{
			time: 1000,
			iterations: 20,
			setup: () => {
				setup();
				render(combobox(''));
			},
			teardown,
		}
	);
});

describe('SimpleDataTable (1,000 rows)', () => {
	const items = Array.from({ length: 1000 }, (_, i) => ({
		id: `row-${i}`,
		name: `Opportunity ${(i * 7919) % 1000}`,
		amount: `$${i * 100}`,
	}));
	const table = (
		rows: typeof items,
		selection: typeof items,
		direction: 'asc' | 'desc'
	) => (
		<SimpleDataTable
			id="bench-table"
			assistiveText={{ selectRow: 'Select row', selectAllRows: 'Select all' }}
			items={rows}
			selectRows="checkbox"
			selection={selection}
			onRowChange={noop}
			onSort={noop}
		>
			<SimpleDataTableColumn
				label="Name"
				property="name"
				primaryColumn
				sortable
				isSorted
				sortDirection={direction}
			/>
			<SimpleDataTableColumn label="Amount" property="amount" />
		</SimpleDataTable>
	);
	const sorted = {
		asc: [...items].sort((a, b) => a.name.localeCompare(b.name)),
		desc: [...items].sort((a, b) => b.name.localeCompare(a.name)),
	};

	bench(
		'mount',
		() => {
			setup();
			render(table(items, [], 'asc'));
			teardown();
		},
		{ time: 1000, iterations: 20 }
	);

	let desc = false;
	bench(
		'sort',
		() => {
			desc = !desc;
			const direction = desc ? 'desc' : 'asc';
			render(table(sorted[direction], [], direction));
		},
		{
			time: 1000,
			iterations: 20,
			setup: () => {
				setup();
				render(table(sorted.asc, [], 'asc'));
			},
			teardown,
		}
	);

	let row = 0;
	bench(
		'select a row',
		() => {
			row = (row + 1) % items.length;
			render(table(items, [items[row]], 'asc'));
		},
		{
			time: 1000,
			iterations: 20,
			setup: () => {
				setup();
				render(table(items, [], 'asc'));
			},
			teardown,
		}
	);
});

describe('Tree (2,000 nodes)', () => {
	// 40 branches of 49 items: 2,000 nodes.
	const nodes: TreeNode[] = Array.from({ length: 40 }, (_, b) => ({
		id: `b${b}`,
		label: `Branch ${b}`,
		type: 'branch' as const,
		nodes: Array.from({ length: 49 }, (_, i) => ({
			id: `b${b}-${i}`,
			label: `Item ${b}-${i}`,
			type: 'item' as const,
		})),
	}));
	const all = nodes.map((node) => node.id);
	const getNodes = (node: { nodes?: TreeNode[] }) => node.nodes;
	const tree = (expandedIds: (string | number)[]) => (
		<Tree
			id="bench-tree"
			labels={{ heading: 'Tree' }}
			nodes={nodes}
			getNodes={getNodes}
			expandedIds={expandedIds}
			selectedIds={[]}
			onSelect={noop}
			onRequestToggle={noop}
		/>
	);

	bench(
		'expand all',
		() => {
			render(tree(all));
			render(tree([]));
		},
		{
			time: 1000,
			iterations: 20,
			setup: () => {
				setup();
				render(tree([]));
			},
			teardown,
		}
	);
});
