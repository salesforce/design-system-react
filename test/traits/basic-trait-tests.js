const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

import * as Lib from '../../src/lib/lib';

describe('FuelUX Facade basic selectable trait tests', function () {
	const selectable = Lib.extend({}, require('../../src/core/base'), require('../../src/traits/selectable'), require('../../src/jquery/state'));
	const _collection = [{
		title: 'Slaughterhouse Five',
		author: 'Kurt Vonnegut'
	}, {
		title: 'The Stand',
		author: 'Steven King'
	}, {
		title: 'On The Road',
		author: 'Jack Kerouac'
	}];

	selectable.__initializeState();
	selectable.trigger = $.noop;
	selectable._collection = Lib.getDataAdapter(_collection);

	it('can require selectable, and it is defined', function () {
		assert.equal(!!selectable, true);
	});

	it('returns the proper item at a given index', function () {
		assert.ok(_collection.every(function (item, index) {
			selectable.setSelectionByIndex(index);
			return JSON.stringify(selectable.getSelection()) === JSON.stringify(item);
		}));
	});
});

describe('FuelUX Facade basic trait tests', function () {
	const disableable = Lib.extend({}, require('../../src/core/base'), require('../../src/traits/disableable'), require('../../src/jquery/state'));

	// We have to monkey patch some members here to be able to test
	disableable.__initializeState();
	disableable.trigger = $.noop;
	disableable.elements = {};
	disableable.elements.wrapper = $('<div>');

	it('can require disableable, and it is defined', function () {
		assert.equal(!!disableable, true);
	});

	it('will have a state of disabled when a disableable object is initialized as disabled', function () {
		disableable.__initializeDisableable({
			disabled: true
		});
		expect(disableable.getState('disabled')).to.equal(true);
	});

	it('will have a state of enabled when a disableable object is initialized as enabled', function () {
		disableable.__initializeDisableable({
			disabled: false
		});
		expect(disableable.getState('disabled')).to.equal(false);
	});
});
