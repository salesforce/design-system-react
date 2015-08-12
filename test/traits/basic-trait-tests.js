
var chai = require('chai');
var assert = chai.assert;

import disableable from '../../src/traits/disableable';
import selectable from '../../src/traits/selectable';

describe('FuelUX Facade basic trait tests', function () {
    it('can require disableable, and it is defined', function () {
        assert.equal(!!disableable, true);
    });

    it('can require selectable, and it is defined', function () {
        assert.equal(!!selectable, true);
    });
});
