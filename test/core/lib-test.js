import * as Lib from '../../src/core/lib';
const chai = require('chai');
const assert = chai.assert;
const $ = require('jquery');
const Backbone = require('backbone');

describe('FuelUX Facade Lib Tests: ', function () {
	it('can be required', function () {
		const lib = require('../../src/core/lib');
		assert.equal(!!lib, true, 'Lib is requireable');
	});

	it('detects when an element has a class like jquery', function () {
		const $element = $('<div class="facadeClass">');
		assert.equal($element.hasClass('facadeClass'), Lib.hasClass($element[0], 'facadeClass'));
	});

	it('detects when an element does not have a class', function () {
		const $element = $('<div>');
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
		const target = 'FuelUX Facade';
		assert.equal($.type(target) === 'string', Lib.isString(target));
	});

	it('functions like jquery when testing for a string on a number', function () {
		const target = 1;
		assert.equal($.type(target) === 'string', Lib.isString(target));
	});

	it('functions like jquery when testing for a string on an object', function () {
		const target = {};
		assert.equal($.type(target) === 'string', Lib.isString(target));
	});

	it('functions like jquery when testing for a string on undefined', function () {
		const target = undefined;
		assert.equal($.type(target) === 'string', Lib.isString(target));
	});

	it('functions like jquery when testing for a regex against a regex', function () {
		const target = /asdf/g;
		assert.equal($.type(target) === 'regexp', Lib.isRegExp(target));
	});

	it('functions like jquery when testing for a regex against a number', function () {
		const target = 2;
		assert.equal($.type(target) === 'regexp', Lib.isRegExp(target));
	});

	it('functions like jquery when testing for a regex against undefined', function () {
		const target = undefined;
		assert.equal($.type(target) === 'regexp', Lib.isRegExp(target));
	});

	it('functions like jquery when testing for an Object against an Object', function () {
		const target = {};
		assert.equal($.isPlainObject(target), Lib.isObject(target));
	});

	it('functions like jquery when testing for an Object against undefined', function () {
		const target = undefined;
		assert.equal($.isPlainObject(target), Lib.isObject(target));
	});

	it('will return a value for a given member key on a regular object', function () {
		const project = {
			name: 'FuelUX Facade'
		};
		assert.equal(Lib.getProp(project, 'name'), project.name);
	});

	it('will return a value for a given member on a backbone model', function () {
		const project = new Backbone.Model({
			name: 'FuelUX Facade'
		});
		assert.equal(Lib.getProp(project, 'name'), project.get('name'));
	});

	it('will locate the appropriate property using findWhere on an array', function () {
		const collectionArray = [{
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
			const foundPerson = Lib.findWhere(collectionArray, {
				name: person.name
			});
			return foundPerson.name === collectionArray[index].name && foundPerson.age === collectionArray[index].age;
		}));
	});

	it('will locate the appropriate property using findWhere on a Collection', function () {
		const collection = new Backbone.Collection([{
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
			const foundPerson = Lib.findWhere(collection, {
				name: person.get('name')
			});
			return foundPerson.get('name') === collection.at(index).get('name') && foundPerson.get('age') === collection.at(index).get('age');
		}));
	});

	it('will extend by combining', function () {
		const person = {
			name: 'Joe'
		};
		const colorPreference = {
			favoriteColor: 'Red'
		};
		const extended = Lib.extend(person, colorPreference);
		assert.ok(
			extended.hasOwnProperty('name') &&
			extended.name === 'Joe' &&
			extended.hasOwnProperty('favoriteColor') &&
			extended.favoriteColor === 'Red'
		);
	});
});
