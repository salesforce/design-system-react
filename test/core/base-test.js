const chai = require('chai');
const assert = chai.assert;

describe('FuelUX Facade Base Module tests', function () {
	const Base = require('../../src/core/base');

	it('can be required', function () {
		assert.ok(!!Base);
	});

	it('is able to save and retrieve its state', function () {
		const state = {
			isReady: false,
			name: 'base-test'
		};
		Base.__constructor();
		// need to monkey patch the state here, since the base doesn't have a getinitialstate
		Base._state = {};
		Base.__setState(state);
		assert.ok(Object.keys(state).every(function (member) {
			return Base.__getState(member) === state[member];
		}));
	});
});
