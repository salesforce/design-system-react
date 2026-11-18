import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Tree from '../';
import IconSettings from '../../icon-settings';
import { expectNoAxeViolations } from '../../__tests__/axe';

const nodes = [
	{ id: 'grains', label: 'Grains', type: 'item' },
	{
		id: 'fruits',
		label: 'Fruits',
		type: 'branch',
		nodes: [
			{ id: 'apple', label: 'Apple', type: 'item' },
			{
				id: 'citrus',
				label: 'Citrus',
				type: 'branch',
				nodes: [{ id: 'lemon', label: 'Lemon', type: 'item' }],
			},
		],
	},
	{
		id: 'nuts',
		label: 'Nuts',
		type: 'branch',
		nodes: [{ id: 'almond', label: 'Almond', type: 'item' }],
	},
];

// axe on an expanded branch, with real SLDS CSS. A collapsed branch hides its
// child group.
describe('Tree accessibility (browser)', () => {
	it('has no axe violations with an expanded branch', async () => {
		const { container } = render(
			<IconSettings iconPath="/assets/icons">
				<Tree
					expandedIds={['fruits', 'citrus']}
					id="tree"
					labels={{ heading: 'Foods' }}
					nodes={nodes}
					onRequestToggle={() => {}}
					onSelect={() => {}}
					selectedIds={['apple']}
				/>
			</IconSettings>
		);
		expect(
			container.querySelectorAll('[role="treeitem"][aria-expanded="true"]')
		).toHaveLength(2);
		// `label-content-name-mismatch` counts an expanded branch's child group
		// as its visible text ("Fruits Apple Citrus Lemon"), so it flags the
		// branch's `aria-label` ("Fruits"), which is what keeps the children out
		// of its name. Assert the names that rule protects instead.
		['Fruits', 'Citrus', 'Nuts'].forEach((name) => {
			expect(screen.getByRole('treeitem', { name })).toHaveAttribute(
				'aria-label',
				name
			);
		});
		await expectNoAxeViolations(document.body, {
			rules: { 'label-content-name-mismatch': { enabled: false } },
		});
	});
});
