/*
 * Combobox typing cost (plan D2, check 5), with 200 options. The menu
 * is internal, so it's counted through a module mock; options are elements,
 * not components, so the menu's renders bound theirs.
 */
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, beforeEach } from 'vitest';

import Combobox from '../index';
import filter from '../filter';
import {
	checkBudget,
	getRenderCount,
	renderCounted,
	resetRenderCounts,
	settle,
} from '~/tests/perf/helpers';

vi.mock('../private/menu', async (importOriginal) => {
	const { countRendersModule } = await import('~/tests/perf/helpers');
	return countRendersModule(await importOriginal(), 'Menu');
});

const options = Array.from({ length: 200 }, (_, i) => ({
	id: `option-${i}`,
	label: `${['abc', 'abd', 'xyz', 'mno'][i % 4]} account ${i}`,
}));

// The usual parent: inline events, filtering on every render.
const Example = () => {
	const [inputValue, setInputValue] = useState('');
	const [selection, setSelection] = useState<typeof options>([]);
	return (
		<Combobox
			id="perf-combobox"
			labels={{ label: 'Account' }}
			events={{
				onChange: (_event, { value }) => setInputValue(value),
				onSelect: (_event, data) =>
					setSelection(data.selection as typeof options),
			}}
			options={filter({ inputValue, options, selection, limit: 200 })}
			selection={selection}
			value={inputValue}
		/>
	);
};

beforeEach(() => resetRenderCounts());

describe('Combobox (200 options)', () => {
	it('typing three characters costs one commit and one menu render each (check 5)', async () => {
		const user = userEvent.setup({ delay: null });
		const result = renderCounted(<Example />);
		await user.click(result.getByRole('combobox'));
		await settle();
		result.resetCommits();
		resetRenderCounts();
		await user.keyboard('abc');
		await settle();
		checkBudget(
			'Combobox/type-3-chars',
			{ commits: result.commitCount, menuRenders: getRenderCount('Menu') },
			{ commits: 3, menuRenders: 3 }
		);
		result.unmount();
	});
});
