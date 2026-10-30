/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import childrenAsTrigger from '../children-as-trigger';

describe('childrenAsTrigger', () => {
	let consoleError;

	beforeEach(() => {
		consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('does not warn when children are not the trigger', () => {
		childrenAsTrigger('NoWarning', false);
		expect(consoleError).not.toHaveBeenCalled();
	});

	it('warns once per component', () => {
		childrenAsTrigger('OnceOnly', true);
		childrenAsTrigger('OnceOnly', true);
		expect(consoleError).toHaveBeenCalledTimes(1);
		expect(consoleError.mock.calls[0][0]).toContain(
			'Passing the trigger of OnceOnly as `children` is deprecated'
		);
	});
});
