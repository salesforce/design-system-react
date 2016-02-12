const chai = require('chai');
const assert = chai.assert;

describe('FuelUX Facade Base Module tests', function () {
	const Base = require('../../src/core/base');

	it('can be required', function () {
		assert.ok(!!Base);
	});
});
