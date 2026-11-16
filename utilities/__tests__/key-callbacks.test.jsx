/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import mapKeyEventCallbacks from '../key-callbacks';

const renderInput = (callback) => {
	const { getByRole } = render(
		<input
			onKeyDown={(event) =>
				mapKeyEventCallbacks(event, { callbacks: { Enter: { callback } } })
			}
		/>
	);
	return getByRole('textbox');
};

describe('mapKeyEventCallbacks', () => {
	it('calls the callback for the pressed key', () => {
		const callback = vi.fn();
		fireEvent.keyDown(renderInput(callback), { key: 'Enter' });
		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('ignores keys pressed while an IME is composing', () => {
		const callback = vi.fn();
		fireEvent.keyDown(renderInput(callback), {
			key: 'Enter',
			isComposing: true,
		});
		expect(callback).not.toHaveBeenCalled();
	});

	it('ignores the Enter that commits a composition in Safari', () => {
		const callback = vi.fn();
		fireEvent.keyDown(renderInput(callback), { key: 'Enter', keyCode: 229 });
		expect(callback).not.toHaveBeenCalled();
	});
});
