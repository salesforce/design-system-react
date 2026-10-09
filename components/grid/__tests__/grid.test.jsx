/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Grid from '../index';

describe('Grid (deprecated)', () => {
	// The deprecation warning is guarded to fire once per module lifetime, so
	// this assertion must run before any other Grid render consumes the guard.
	it('emits the deprecation warning only once across multiple renders', () => {
		const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		const { rerender } = render(<Grid>x</Grid>);
		rerender(<Grid>y</Grid>);
		render(<Grid>z</Grid>);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy.mock.calls[0][0]).toMatch(/deprecated/i);
		spy.mockRestore();
	});

	it('still renders slds-grid with a column', () => {
		const { container } = render(
			<Grid>
				<Grid.Column>col</Grid.Column>
			</Grid>
		);
		expect(container.querySelector('.slds-grid')).toBeInTheDocument();
		expect(container.querySelector('.slds-col')).toHaveTextContent('col');
	});
});
