import * as Lib from '../../src/core/lib';
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const $ = require('jquery');

describe('FuelUX Facade Lib Tests', function () {
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

	it('will extend by combining', function () {
		const person = {
			name: 'Joe',
			size: {
				height: 5.8,
				weight: 160.1
			}
		};
		const colorPreference = {
			favoriteColor: 'Red'
		};
		const extended = Lib.extend(person, colorPreference);
		expect(extended).to.include(person);
		expect(extended).to.include(colorPreference);
	});
});
