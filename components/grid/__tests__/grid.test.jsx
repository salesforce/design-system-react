import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Grid from '../';

describe('Grid', () => {
	it('applies the flavor modifier class', () => {
		const { container } = render(<Grid flavor="vertical">content</Grid>);

		const grid = container.querySelector('.slds-grid');
		expect(grid).toBeInTheDocument();
		expect(grid).toHaveClass('slds-grid_vertical');
	});

	describe('Grid.Column', () => {
		it('renders slds-col without a className prop', () => {
			const { container } = render(<Grid.Column>content</Grid.Column>);

			const column = container.querySelector('div');
			expect(column).toHaveClass('slds-col');
			expect(column.className).not.toMatch(/undefined/);
		});

		it('merges a provided className with slds-col', () => {
			const { container } = render(
				<Grid.Column className="my-custom-class">content</Grid.Column>
			);

			const column = container.querySelector('div');
			expect(column).toHaveClass('slds-col', 'my-custom-class');
			expect(column.className).not.toMatch(/undefined/);
		});
	});
});
