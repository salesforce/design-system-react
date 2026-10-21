import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Search from '../search';
import IconSettings from '../../icon-settings';

const renderSearch = (props) =>
	render(
		<IconSettings iconPath="/assets/icons">
			<Search assistiveText={{ label: 'Search' }} id="search" {...props} />
		</IconSettings>
	);

const getClearButton = (container) =>
	[...container.querySelectorAll('button')].find(
		(button) => button.textContent === 'Clear'
	);

const getRightIcon = (container) =>
	container.querySelector('.slds-input__icon_right');

describe('SLDSSearch', () => {
	it('does not render a clear button by default', () => {
		const { container } = renderSearch();
		expect(getRightIcon(container)).toBeNull();
	});

	it('renders a clear button with `isClearable` and calls `onClear`', () => {
		const onClear = vi.fn();
		const { container } = renderSearch({ isClearable: true, onClear });
		const clearButton = getClearButton(container);

		expect(clearButton).toBeInTheDocument();
		fireEvent.click(clearButton);
		expect(onClear).toHaveBeenCalledTimes(1);
	});

	describe('Deprecated prop aliases', () => {
		it('still supports `clearable` and warns', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			const { container } = renderSearch({ clearable: true });

			expect(getRightIcon(container)).toBeInTheDocument();
			expect(consoleError).toHaveBeenCalledWith(
				expect.stringContaining('`clearable` will be removed')
			);
			consoleError.mockRestore();
		});
	});
});
