import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import DynamicIcon from '../';

describe('DynamicIcon', () => {
	describe('waffle variant', () => {
		it('renders a button with type="button"', () => {
			render(<DynamicIcon variant="waffle" title="Open App Launcher" />);

			expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
		});

		it('does not submit an enclosing form when clicked', () => {
			const onSubmit = vi.fn((event) => event.preventDefault());
			render(
				<form onSubmit={onSubmit}>
					<DynamicIcon variant="waffle" title="Open App Launcher" />
				</form>
			);

			screen.getByRole('button').click();

			expect(onSubmit).not.toHaveBeenCalled();
		});
	});
});
