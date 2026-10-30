/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import requiredProperty from '../required-property';

describe('requiredProperty', () => {
	let consoleError;

	beforeEach(() => {
		consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('does not warn when the property is set, even after earlier valid calls', () => {
		requiredProperty('ComponentA', true, 'value');
		requiredProperty('ComponentA', true, 'value');

		expect(consoleError).not.toHaveBeenCalled();

		requiredProperty('ComponentA', false, 'value', 'Pass `value`.');

		expect(consoleError).toHaveBeenCalledTimes(1);
		expect(consoleError.mock.calls[0][0]).toContain(
			'`value` is required by ComponentA. Pass `value`.'
		);
	});

	it('warns once per component and property', () => {
		requiredProperty('ComponentB', false, 'value');
		requiredProperty('ComponentB', false, 'value');
		requiredProperty('ComponentB', false, 'selectedId');

		expect(consoleError).toHaveBeenCalledTimes(2);
	});
});
