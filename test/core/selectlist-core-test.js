var chai = require('chai');
var assert = chai.assert;
var SelectListCore = require('../../src/core/selectlist');
import containsTrait from '../traits/containsTrait';

describe("Fuel UX Facade Selectlist Core Tests: ", function () {
    // basic instantiation
    it('Should not be falsy after require', function () {
        assert.notEqual(!!SelectListCore, false, 'SelectListCore is not null');
    });
    // test for defaults?

    // test for traits?
    it('Should be selectable', function () {
        assert.equal(containsTrait.call(SelectListCore, 'selectable'), true, 'SelectListCore is Selectable');
    });

    it('Should be disableable', function () {
        assert.equal(containsTrait.call(SelectListCore, 'disableable'), true, 'SelectListCore is disableable');
    });
});

