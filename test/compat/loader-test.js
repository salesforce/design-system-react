const $ = require('jquery');
window.$ = window.jQuery = $;

const html = require('text!./markup/loader-markup.html');
const chai = require('chai');
const assert = chai.assert;
require('bootstrap');
require('../../src/jquery/loader/loader');

describe('FuelUX Loader', function () {
	it('should be defined on jquery object', function () {
		assert.ok($().loader, 'loader method is defined');
	});

	it('should return an element', function () {
		const $loader = $(html);
		assert.ok($loader.loader() === $loader, 'loader is initialized');
	});

	it('should play on init', function (done) {
		const $loader = $(html);

		$loader.loader();
		setTimeout(function () {
			$loader.loader('pause');
			assert.ok($loader.attr('data-frame') > 1, 'loader playing on init');
			done();
		}, 160);
	});

	it('pause should function as expected', function (done) {
		const $loader = $(html);
		$loader.loader();
		$loader.loader('pause');
		setTimeout(function () {
			assert.equal($loader.attr('data-frame'), 1, 'pause halts frame progression');
			done();
		}, 160);
	});

	it('play should function as expected', function (done) {
		const $loader = $(html);

		$loader.loader();
		$loader.loader('pause');
		$loader.loader('play');
		setTimeout(function () {
			assert.ok($loader.attr('data-frame') !== 1, 'play continues frame progression');
			done();
		}, 160);
	});

	it('reset should function as expected', function (done) {
		const $loader = $(html);

		$loader.loader();
		setTimeout(function () {
			$loader.loader('reset');
			assert.equal($loader.attr('data-frame'), 1, 'reset reverts frame to beginning');
			done();
		}, 160);
	});

	it('next should function as expected', function () {
		const $loader = $(html);

		$loader.loader();
		$loader.loader('pause');
		$loader.loader('next');

		assert.equal($loader.attr('data-frame'), 2, 'next increments frame by 1');
	});

	it('prev should function as expected', function () {
		const $loader = $(html);

		$loader.loader();
		$loader.loader('pause');
		$loader.loader('next');

		const v = $loader.attr('data-frame');

		$loader.loader('previous');

		assert.equal($loader.attr('data-frame'), parseInt(v - 1, 10), 'prev decrements frame by 1');
	});

	it('should destroy control', function () {
		const $el = $(html);

		assert.equal(typeof( $el.loader('destroy')), 'string', 'returns string (markup)');
		assert.equal( $el.parent().length, false, 'control has been removed from DOM');
	});
});
