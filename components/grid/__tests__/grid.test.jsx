/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Grid from '../index';

describe('Grid (deprecated)', () => {
	it('still renders slds-grid with a column', () => {
		const { container } = render(
			<Grid>
				<Grid.Column>col</Grid.Column>
			</Grid>
		);
		expect(container.querySelector('.slds-grid')).toBeInTheDocument();
		expect(container.querySelector('.slds-col')).toHaveTextContent('col');
	});

	it('emits a deprecation warning in development', () => {
		const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		render(<Grid>x</Grid>);
		expect(spy).toHaveBeenCalled();
		expect(spy.mock.calls[0][0]).toMatch(/deprecated/i);
		spy.mockRestore();
	});
});
