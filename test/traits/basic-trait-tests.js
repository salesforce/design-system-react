const chai = require('chai');
const assert = chai.assert;

describe('FuelUX Facade basic trait tests', function () {
	it('can require disableable, and it is defined', function () {
		const disableable = require('../../src/traits/disableable');
		assert.equal(!!disableable, true);
	});

	it('can require selectable, and it is defined', function () {
		const selectable = require('../../src/traits/selectable');
		assert.equal(!!selectable, true);
	});
});
