
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

describe('FuelUX Facade Base Module tests', function () {
    var Base = require('../../src/core/base');

    it('can be required', function () {
        assert.ok(!!Base);
    });

    it('is able to save and retrieve its state', function () {
        var state = {
            isReady: false,
            name: 'base-test'
        }
        Base.__constructor();
        // need to monkey patch the state here, since the base doesn't have a getinitialstate
        Base._state = {};
        Base.__setState(state);
        assert.ok(Object.keys(state).every(function (member) {
            return Base.__getState(member) === state[member];
        }));
    });

});
