import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import Search from '../search';
import IconSettings from '../../icon-settings';

const renderSearch = (props) =>
	render(
		<IconSettings iconPath="/assets/icons">
			<Search assistiveText={{ label: 'Search' }} {...props} />
		</IconSettings>
	);

describe('Search', () => {
	it('passes the event and the current value to onSearch on Enter', async () => {
		const onSearch = vi.fn();
		const { container } = renderSearch({ onSearch });

		const input = container.querySelector('input');
		await userEvent.type(input, 'apex');
		// The component reads the deprecated `keyCode`, which user-event leaves at 0 in jsdom
		fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });

		const [event, data] = onSearch.mock.calls[0];
		expect(event).toEqual(expect.objectContaining({ type: 'keydown' }));
		expect(data).toEqual({ value: 'apex' });
	});

	it('passes the event and the current value to onSearch when the search icon is clicked', async () => {
		const onSearch = vi.fn();
		const { getByRole } = renderSearch({
			onSearch,
			value: 'lwc',
			onChange: () => {},
		});

		await userEvent.click(getByRole('button', { name: 'Search' }));

		const [event, data] = onSearch.mock.calls[0];
		expect(event).toEqual(expect.objectContaining({ type: 'click' }));
		expect(data).toEqual({ value: 'lwc' });
	});

	it('passes the event and the value being cleared to onClear', async () => {
		const onClear = vi.fn();
		const inputRef = vi.fn();
		const { getByRole } = renderSearch({
			clearable: true,
			onClear,
			inputRef,
			value: 'flow',
			onChange: () => {},
		});

		await userEvent.click(getByRole('button', { name: 'Clear' }));

		const [event, data] = onClear.mock.calls[0];
		expect(event).toEqual(expect.objectContaining({ type: 'click' }));
		expect(data).toEqual({ value: 'flow' });
		// The consumer's inputRef still receives the element
		expect(inputRef).toHaveBeenCalledWith(expect.any(HTMLInputElement));
	});
});
