/*
 * MenuDropdown render cost (plan D2, check 3), with 50 options. List
 * items are internal, so they're counted through a module mock.
 */
import userEvent from '@testing-library/user-event';
import { describe, it, vi, beforeEach } from 'vitest';

import MenuDropdown from '../index';
import {
	checkBudget,
	getRenderCount,
	renderCounted,
	resetRenderCounts,
	settle,
} from '~/tests/perf/helpers';

vi.mock('../../utilities/menu-list/item', async (importOriginal) => {
	const { countRendersModule } = await import('~/tests/perf/helpers');
	return countRendersModule(await importOriginal(), 'ListItem');
});

const options = Array.from({ length: 50 }, (_, i) => ({
	label: `Item ${i}`,
	value: `item-${i}`,
}));

// The usual parent: a new inline onSelect on every render. It's re-rendered
// with `rerender`, since clicking elsewhere would close the menu.
const Example = () => (
	<MenuDropdown
		id="perf-menu"
		label="Menu"
		menuPosition="relative"
		options={options}
		onSelect={() => {}}
	/>
);

beforeEach(() => resetRenderCounts());

describe('MenuDropdown (50 options)', () => {
	it('a parent re-render while open re-renders no item (check 3)', async () => {
		const user = userEvent.setup({ delay: null });
		const result = renderCounted(<Example />);
		await user.click(result.getByRole('button'));
		await settle();
		resetRenderCounts();
		result.rerender(<Example />);
		await settle();
		checkBudget(
			'MenuDropdown/parent-rerender',
			{ itemRenders: getRenderCount('ListItem') },
			{ itemRenders: 0 }
		);
		result.unmount();
	});
});
