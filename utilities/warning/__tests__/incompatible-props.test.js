/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import incompatibleProps from '../incompatible-props';

describe('incompatibleProps', () => {
	let consoleError;

	beforeEach(() => {
		consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	const check = (props, propOneValues, propTwoValues) =>
		incompatibleProps(
			'Component',
			props,
			'type',
			propOneValues,
			'variant',
			propTwoValues
		);

	it.each(['first', 'middle', 'last'])(
		'warns when the value is the %s item in a list of values',
		(variant) => {
			check({ type: 'path', variant }, ['path'], ['first', 'middle', 'last']);

			expect(consoleError).toHaveBeenCalledTimes(1);
			expect(consoleError.mock.calls[0][0]).toContain(
				'`type` of value `path` along with prop `variant` of value `' +
					variant +
					'`'
			);
		}
	);

	it.each(['first', 'middle', 'last'])(
		'checks every item in the first prop’s list of values (%s)',
		(type) => {
			check({ type, variant: 'shade' }, ['first', 'middle', 'last'], null);

			expect(consoleError).toHaveBeenCalledTimes(1);
		}
	);

	it('does not warn when a value is not in the list', () => {
		check({ type: 'path', variant: 'base' }, ['path'], ['modal', 'shade']);

		expect(consoleError).not.toHaveBeenCalled();
	});

	it('warns for any truthy value when no values are given', () => {
		check({ type: 'path', variant: 'anything' }, ['path'], null);

		expect(consoleError).toHaveBeenCalledTimes(1);
	});

	it('does not warn when either prop is missing', () => {
		check({ type: 'path' }, ['path'], null);
		check({ variant: 'shade' }, null, ['shade']);

		expect(consoleError).not.toHaveBeenCalled();
	});
});
