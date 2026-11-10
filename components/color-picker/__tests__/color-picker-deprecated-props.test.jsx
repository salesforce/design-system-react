import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import ColorPicker from '../index';

// Own file: deprecation warnings fire once per module, so an earlier render
// in another test would hide them.
describe('ColorPicker', () => {
	it('opens without passing deprecated props to Popover', () => {
		const error = vi.spyOn(console, 'error').mockImplementation(() => {});
		const { container } = render(<ColorPicker isOpen value="#000000" />);
		expect(container.querySelector('[role="dialog"]')).toHaveAttribute(
			'aria-labelledby',
			container.querySelector('.slds-color-picker__summary-label').id
		);
		expect(
			error.mock.calls.filter(([message]) =>
				String(message).includes('will be removed')
			)
		).toEqual([]);
		error.mockRestore();
	});
});
