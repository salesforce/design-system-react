import { render, act } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, it, expect } from 'vitest';

import DefaultExample from '../__examples__/default';

// Browser-mode keyboard test: jsdom doesn't move focus on Tab, and the
// arrow keys need real key events with `keyCode`.
describe('Tree (browser)', () => {
	it('moves focus with the selection between items and branches', async () => {
		const { container, unmount } = render(<DefaultExample log={() => {}} />);
		const grains = container.querySelector('#example-tree-1');
		const fruits = container.querySelector('#example-tree-2');

		await act(async () => {
			await userEvent.keyboard('{Tab}');
		});
		expect(grains).toHaveFocus();

		await act(async () => {
			await userEvent.keyboard('{ArrowDown}');
		});
		expect(fruits).toHaveFocus();

		await act(async () => {
			await userEvent.keyboard('{ArrowUp}');
		});
		expect(grains).toHaveFocus();
		unmount();
	});
});
