/*
 * Tabs render cost (plan D2, checks 2 and 3). Tab is internal, so it's
 * counted through a module mock.
 */
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, beforeEach } from 'vitest';

import Tabs from '../index';
import TabsPanel from '../panel';
import {
	checkBudget,
	getRenderCount,
	renderCounted,
	resetRenderCounts,
} from '~/tests/perf/helpers';

vi.mock('../private/tab', async (importOriginal) => {
	const { countRendersModule } = await import('~/tests/perf/helpers');
	return countRendersModule(await importOriginal(), 'Tab');
});

const PANELS = 10;
const values = Array.from({ length: PANELS }, (_, i) => `tab-${i}`);

// The usual parent: a new inline `onSelect` on every render.
const Example = () => {
	const [value, setValue] = useState(values[0]);
	const [, setTick] = useState(0);
	return (
		<>
			<button type="button" onClick={() => setTick((t) => t + 1)}>
				parent
			</button>
			<Tabs
				id="perf-tabs"
				value={value}
				onSelect={(_event, data) => setValue(data.value)}
			>
				{values.map((v) => (
					<TabsPanel key={v} label={v} value={v}>
						{v}
					</TabsPanel>
				))}
			</Tabs>
		</>
	);
};

beforeEach(() => resetRenderCounts());

describe('Tabs', () => {
	it('re-rendering with identical props re-renders no tab (check 2)', () => {
		const props = { id: 'perf-tabs', value: values[0], onSelect: () => {} };
		const children = values.map((v) => (
			<TabsPanel key={v} label={v} value={v}>
				{v}
			</TabsPanel>
		));
		const result = renderCounted(<Tabs {...props}>{children}</Tabs>);
		resetRenderCounts();
		result.rerender(<Tabs {...props}>{children}</Tabs>);
		checkBudget(
			'Tabs/identical-props',
			{ tabRenders: getRenderCount('Tab') },
			{ tabRenders: 0 }
		);
		result.unmount();
	});

	it('a parent re-render with a new onSelect re-renders no tab, selecting re-renders two (checks 3, 6)', async () => {
		const user = userEvent.setup({ delay: null });
		const result = renderCounted(<Example />);
		resetRenderCounts();
		await user.click(result.getByText('parent'));
		checkBudget(
			'Tabs/parent-rerender',
			{ tabRenders: getRenderCount('Tab') },
			{ tabRenders: 0 }
		);
		resetRenderCounts();
		await user.click(result.getByRole('tab', { name: values[5] }));
		// Selecting a tab changes two tabs (old and new).
		checkBudget(
			'Tabs/select',
			{ tabRenders: getRenderCount('Tab') },
			{ tabRenders: 2 }
		);
		result.unmount();
	});
});
