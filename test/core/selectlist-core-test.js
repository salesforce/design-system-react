var fs = require('fs');
var chai = require('chai');
var assert = chai.assert;
var SelectListCore = require('../../src/core/selectlist');
var containsTrait = require('containsTrait');

describe("Fuel UX Selectlist Core Tests", function () {
    // We can test initial state, and instantiation

    // basic instantiation
    it('should not be falsy after require', function () {
        assert.notEqual(!!SelectListCore, false, 'SelectListCore is not null');
    });
    // test for defaults?

    // test for traits?
    it('should be selectable', function () {
        assert.equals(containsTrait.call(SelectListCore, 'selectable'), 'SelectListCore is Selectable');
    });
});

