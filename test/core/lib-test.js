import Lib from '../../src/core/lib';
var chai = require('chai');
var assert = chai.assert;
var $ = require('jquery');
var Backbone = require('backbone');

describe('FuelUX Facade Lib Tests: ', function () {
    it('can be required', function () {
        var lib = require('../../src/core/lib');
        assert.equal(!!lib, true, 'Lib is requireable');
    });

    it('detects when an element has a class like jquery', function () {
        var $element = $('<div class="facadeClass">');
        assert.equal($element.hasClass('facadeClass'), Lib.hasClass($element[0], 'facadeClass'));
    });

    it('detects when an element does not have a class', function () {
        var $element = $('<div>');
        assert.equal($element.hasClass('facadeClass'), Lib.hasClass($element[0], 'facadeClass'));
    });

    it('functions like jquery when testing for a function on a function', function () {
        assert.equal($.isFunction($.noop), Lib.isFunction($.noop));
    });

    it('functions like jquery when testing for a function on an object', function () {
        assert.equal($.isFunction({}), Lib.isFunction({}));
    });

    it('functions like jquery when testing for a function on undefined', function () {
        assert.equal($.isFunction(undefined), Lib.isFunction(undefined));
    });

    it('functions like jquery when testing for a number on a function', function () {
        assert.equal($.isNumeric($.noop), Lib.isNumber($.noop));
    });

    it('functions like jquery when testing for a number on an object', function () {
        assert.equal($.isNumeric({}), Lib.isNumber({}));
    });

    it('functions like jquery when testing for a number on undefined', function () {
        assert.equal($.isNumeric(undefined), Lib.isNumber(undefined));
    });

    it('functions like jquery when testing for a number on number', function () {
        assert.equal($.isNumeric(1), Lib.isNumber(1));
    });

    it('functions like jquery when testing for a string on a string', function () {
        var target = 'FuelUX Facade';
        assert.equal($.type(target) === 'string', Lib.isString(target));
    });

    it('functions like jquery when testing for a string on a number', function () {
        var target = 1;
        assert.equal($.type(target) === 'string', Lib.isString(target));
    });

    it('functions like jquery when testing for a string on an object', function () {
        var target = {};
        assert.equal($.type(target) === 'string', Lib.isString(target));
    });

    it('functions like jquery when testing for a string on undefined', function () {
        var target = undefined;
        assert.equal($.type(target) === 'string', Lib.isString(target));
    });

    it('functions like jquery when testing for a regex against a regex', function () {
        var target = /asdf/g;
        assert.equal($.type(target) === 'regexp', Lib.isRegExp(target));
    });

    it('functions like jquery when testing for a regex against a number', function () {
        var target = 2;
        assert.equal($.type(target) === 'regexp', Lib.isRegExp(target));
    });

    it('functions like jquery when testing for a regex against undefined', function () {
        var target = undefined;
        assert.equal($.type(target) === 'regexp', Lib.isRegExp(target));
    });

    it('functions like jquery when testing for an Object against an Object', function () {
        var target = {};
        assert.equal($.isPlainObject(target), Lib.isObject(target));
    });

    it('functions like jquery when testing for an Object against undefined', function () {
        var target = undefined;
        assert.equal($.isPlainObject(target), Lib.isObject(target));
    });

    it('will return a value for a given member key on a regular object', function () {
        var project = {
            name: 'FuelUX Facade'
        }
        assert.equal(Lib.getProp(project, 'name'), project.name);
    });

    it('will return a value for a given member on a backbone model', function () {
        var project = new Backbone.Model({
            name: 'FuelUX Facade'
        });
        assert.equal(Lib.getProp(project, 'name'), project.get('name'));
    });

    it('will locate the appropriate property using findWhere on an array', function () {
        var collectionArray = [{
            name: 'Joe',
            age: 39
        }, {
            name: 'Jennifer',
            age: 38
        }, {
            name: 'Isaac',
            age: 8
        }, {
            name: 'William',
            age: 5
        }, {
            name: 'Henry',
            age: 5
        }];
        assert.ok(collectionArray.every(function (person, index) {
            var foundPerson = Lib.findWhere(collectionArray, {
                name: person.name
            });
            return foundPerson.name === collectionArray[index].name && foundPerson.age === collectionArray[index].age;
        }));
    });

    it('will locate the appropriate property using findWhere on a Collection', function () {
        var collection = new Backbone.Collection([{
            name: 'Joe',
            age: 39
        }, {
            name: 'Jennifer',
            age: 38
        }, {
            name: 'Isaac',
            age: 8
        }, {
            name: 'William',
            age: 5
        }, {
            name: 'Henry',
            age: 5
        }]);
        assert.ok(collection.every(function (person, index) {
            var foundPerson = Lib.findWhere(collection, {
                name: person.get('name')
            });
            return foundPerson.get('name') === collection.at(index).get('name') && foundPerson.get('age') === collection.at(index).get('age');
        }));
    });

    it('will extend by combining', function () {
        var person = {
            name: 'Joe'
        }
        var colorPreference = {
            favoriteColor: 'Red'
        }
        var extended = Lib.extend(person, colorPreference);
        assert.ok(
            extended.hasOwnProperty('name') &&
            extended.name === 'Joe' &&
            extended.hasOwnProperty('favoriteColor') &&
            extended.favoriteColor === 'Red'
        );
    });
});
