/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { expect } from 'chai';

import {
	canUseDOM,
	canUseEventListeners,
	canUseViewport,
} from '../execution-environment';

describe('Execution Environment: ', function () {
	it('Window and Document/DOM exists, elements can be created', function () {
		expect(canUseDOM).to.be.true;
	});

	it('Event Listeners can be created', function () {
		expect(canUseEventListeners).to.be.true;
	});

	it('Viewport exists', function () {
		expect(canUseViewport).to.be.true;
	});
});
