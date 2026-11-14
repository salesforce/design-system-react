/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { createWarnedMap, resetWarnings } from '../warned-registry';
import deprecatedProperty from '../deprecated-property';
import requiredProperty from '../required-property';

describe('warned-registry', () => {
	let consoleError;

	beforeEach(() => {
		consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('clears every map it created', () => {
		const first = createWarnedMap();
		const second = createWarnedMap();
		first.a = true;
		second.b = true;

		resetWarnings();

		expect(first).toEqual({});
		expect(second).toEqual({});
	});

	it('lets a helper warn again after a reset, and only then', () => {
		requiredProperty('RegistryA', false, 'value');
		requiredProperty('RegistryA', false, 'value');
		expect(consoleError).toHaveBeenCalledTimes(1);

		resetWarnings();
		requiredProperty('RegistryA', false, 'value');
		expect(consoleError).toHaveBeenCalledTimes(2);
	});

	it('resets helpers independently of each other', () => {
		deprecatedProperty('RegistryB', 'x', 'oldProp', 'newProp');
		requiredProperty('RegistryB', false, 'value');
		resetWarnings();
		deprecatedProperty('RegistryB', 'x', 'oldProp', 'newProp');
		requiredProperty('RegistryB', false, 'value');

		expect(consoleError).toHaveBeenCalledTimes(4);
	});
});
