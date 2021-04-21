/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { expect } from 'chai';

import deprecatedPropertyValue from '../warning/deprecated-property-value';

describe('Console Warnings: ', function () {
	describe('Deprecated Property Value: ', function () {
		it('Warns if value has been moved to another property', function () {
			const log = sinon.spy();
			const deprecatedValue = 'info';

			deprecatedPropertyValue('Dummy Component Name', {
				propAsString: 'variant',
				propValue: deprecatedValue,
				deprecatedPropValue: deprecatedValue,
				replacementPropAsString: 'theme',
				replacementPropAsValue: 'info',
				log,
			});
			expect(log.calledOnce).to.be.true;
		});

		it('Should NOT warn, since propValue does not equal deprecatedPropValue', function () {
			const log = sinon.spy();
			const deprecatedValue = 'info';
			const notDeprecatedValue = 'test';

			deprecatedPropertyValue('Dummy Component Name', {
				propAsString: 'variant',
				propValue: notDeprecatedValue,
				deprecatedPropValue: deprecatedValue,
				replacementPropAsString: 'theme',
				replacementPropAsValue: 'info',
				log,
			});
			expect(log.calledOnce).to.be.false;
		});
	});
});
