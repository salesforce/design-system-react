const chai = require('chai');
const assert = chai.assert;
const PickListCore = require('../../src/core/picklist');
import containsTrait from '../traits/containsTrait';

describe('Fuel UX Facade Picklist Core Tests: ', function () {
	// basic instantiation
	it('Should not be falsy after require', function () {
		assert.notEqual(!!PickListCore, false, 'PickListCore is not null');
	});
	// test for defaults?

	// test for traits?
	it('Should be selectable', function () {
		assert.equal(containsTrait.call(PickListCore, 'selectable'), true, 'PickListCore is Selectable');
	});

	it('Should be disableable', function () {
		assert.equal(containsTrait.call(PickListCore, 'disableable'), true, 'PickListCore is disableable');
	});
});
