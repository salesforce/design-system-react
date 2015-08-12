
var chai = require('chai');
var assert = chai.assert;

describe('FuelUX Facade basic trait tests', function () {
    var disableable = require('../../src/traits/disableable');
    var selectable = require('../../src/traits/selectable');
    // create a new selectable object, and then add a _collection member to it
    // so we can test the selection options.
    selectable._collection = [{
        title: 'Slaughterhouse Five',
        author: 'Kurt Vonnegut'
    }, {
        title: 'The Stand',
        author: 'Steven King'
    }, {
        title: 'On The Road',
        author: 'Jack Kerouac'
    }];

    it('can require disableable, and it is defined', function () {
        assert.equal(!!disableable, true);
    });

    it('can require selectable, and it is defined', function () {
        assert.equal(!!selectable, true);
    });

    it('returns the proper item at a given index', function () {
        assert.ok(selectable._collection.every(function (item, index) {
            selectable.setSelectionByIndex(index);
            return selectable.getSelection() === item;
        }));
    });
});
