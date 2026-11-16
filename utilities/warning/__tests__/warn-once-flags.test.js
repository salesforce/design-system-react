/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import ifOneThenBothRequiredProperty from '../if-one-then-both-required-property';
import isTriggerTabbable from '../is-trigger-tabbable';
import oneOfRequired from '../one-of-required-property';
import onlyOneOf from '../only-one-of-properties';

// Each helper warns once per component, but only after it has actually
// warned: a valid call first must not use up the warning.
describe('warn-once helpers', () => {
	let consoleError;

	beforeEach(() => {
		consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('ifOneThenBothRequiredProperty warns after a valid call, then once', () => {
		ifOneThenBothRequiredProperty('ComponentA', {}, { a: 1, b: 2 });
		expect(consoleError).not.toHaveBeenCalled();

		ifOneThenBothRequiredProperty('ComponentA', {}, { a: 1, b: undefined });
		ifOneThenBothRequiredProperty('ComponentA', {}, { a: 1, b: undefined });
		expect(consoleError).toHaveBeenCalledTimes(1);
		expect(consoleError.mock.calls[0][0]).toContain(
			'both of the following properties are required by ComponentA: [a,b]'
		);
	});

	it('onlyOneOf warns after a valid call, then once', () => {
		onlyOneOf('ComponentB', { a: 1, b: undefined });
		expect(consoleError).not.toHaveBeenCalled();

		onlyOneOf('ComponentB', { a: 1, b: 2 });
		onlyOneOf('ComponentB', { a: 1, b: 2 });
		expect(consoleError).toHaveBeenCalledTimes(1);
		expect(consoleError.mock.calls[0][0]).toContain(
			'Only one of the following props is needed by ComponentB: [a,b]'
		);
	});

	it('oneOfRequired warns after a valid call, then once', () => {
		oneOfRequired('ComponentC', { a: 1, b: undefined });
		expect(consoleError).not.toHaveBeenCalled();

		oneOfRequired('ComponentC', { a: undefined, b: undefined });
		oneOfRequired('ComponentC', { a: undefined, b: undefined });
		expect(consoleError).toHaveBeenCalledTimes(1);
		expect(consoleError.mock.calls[0][0]).toContain(
			'One of the following props are required by ComponentC: [a,b]'
		);
	});

	it('isTriggerTabbable warns once for an untabbable trigger', () => {
		const trigger = { type: 'div', props: {} };
		isTriggerTabbable('ComponentD', trigger);
		isTriggerTabbable('ComponentD', trigger);
		expect(consoleError).toHaveBeenCalledTimes(1);
		expect(consoleError.mock.calls[0][0]).toContain(
			'The element that triggers ComponentD must be tabbable'
		);
	});
});
