const $ = require('jquery');
window.$ = window.jQuery = $;

let html = require('text!../compat/markup/spinbox-markup.html');
const chai = require('chai');
const assert = chai.assert;
require('bootstrap');

import Spinbox from '../../src/jquery/spinbox/spinbox';

/* FOR DEV TESTING */
// var html = require('text!dev.html!strip');
html = $("<div><div id='mainSpinbox'></div></div>");
const $testFixture = $('body #test-fixture');
$testFixture.append(html);

const correctDefaultOptions = {
	value: 0,
	min: 0,
	max: 999,
	step: 1,
	hold: true,
	speed: 'medium',
	disabled: false,
	cycle: false,
	units: [],
	decimalMark: '.',
	defaultUnit: '',
	limitToStep: false
};

const defaultOptions = {};

describe('Fuel UX Spinbox - jQuery facade', function () {
	after(function () {
		$testFixture.empty();
	});

	it('should disable and enable', function () {
		const spinbox = new Spinbox( $( html ).find( '#mainSpinbox' ), defaultOptions );
		spinbox.disable();
		assert.equal(spinbox.elements.wrapper.hasClass('disabled'), true, 'element disabled');
		assert.equal(spinbox.elements.wrapper.attr('disabled'), true, 'element disabled');

		spinbox.enable();
		assert.equal(spinbox.elements.wrapper.hasClass('disabled'), false, 'element re-enabled');
		assert.equal(spinbox.elements.wrapper.attr('disabled'), false, 'element re-enabled');

		spinbox.elements.wrapper.empty();
	});

	it('should set the default selection', function () {
		const spinbox = new Spinbox( $( html ).find( '#mainSpinbox' ), defaultOptions );

		assert.deepEqual(spinbox.prototype.options, correctDefaultOptions.value, 'defaults are correct');
	});

	it('should have value as an alias for getValue and setValue', function () {

	});

	it('should allow setting selection by number', function () {

	});

	it('should allow setting selection by numeric string value', function () {

	});

	it('should increment and decrement', function () {

	});

	it('should upadate value on focusout', function () {

	});

	it('should update value before initiating increment', function () {
		// $spinbox.find('.spinbox-input').val(5);
		// $spinbox.find('.spinbox-input').focusin();
		// $spinbox.spinbox('step',true);
		// equal($spinbox.spinbox('value'), 6, 'spinbox updates value before initiating increment');
	});


	it('should allow setting value to zero', function () {

	});

	it('should use html value as default (if provided) on ititialization', function () {

	});

	it('should not allow maximum/minimum values to be surpassed by manual input', function () {
		// var $spinbox = $(html).find('#MySpinbox').spinbox({
		// 	min: -10,
		// 	max: 10
		// });

		// //Spinbox does not allow max value to be surpassed
		// $spinbox.find('.spinbox-input').val(15);
		// $spinbox.find('.spinbox-input').focusout();
		// equal($spinbox.spinbox('value'), 10, 'spinbox resets to max value when max value is surpassed');

		// //Spinbox does not allow min value to be surpassed
		// $spinbox.find('.spinbox-input').val(-15);
		// $spinbox.find('.spinbox-input').focusout();
		// equal($spinbox.spinbox('value'), -10, 'spinbox resets to min value when min value is surpassed');
	});

	it('should not allow maximum/minimum values to be surpassed by default values', function () {
		// var $spinbox = $(html).find('#MySpinbox').spinbox({
		// 	min: 1,
		// 	value: 0
		// });

		// equal($spinbox.spinbox('value'), 1, 'spinbox inits to min when default value is less than min');

		// $spinbox = $(html).find('#MySpinbox').spinbox({
		// 	max: 1,
		// 	value: 2
		// });

		// equal($spinbox.spinbox('value'), 1, 'spinbox inits to max when default value is more than min');
	});

	it('should not allow non-step values to be surpassed by manual input when increments are limited to step', function () {
		// var $spinbox = $(html).find('#MySpinbox').spinbox({
		// 	step: 3,
		// 	limitToStep: true,
		// 	min: 1,
		// 	max: 7
		// });

		// $spinbox.find('.spinbox-input').val(1);
		// $spinbox.find('.spinbox-input').focusout();
		// equal($spinbox.spinbox('value'), 3, 'spinbox sets to step value when min value is less than step value and value is set by hand');

		// $spinbox.find('.spinbox-input').val(4);
		// $spinbox.find('.spinbox-input').focusout();
		// equal($spinbox.spinbox('value'), 3, 'spinbox rounds down to step when appropriate');

		// $spinbox.find('.spinbox-input').val(5);
		// $spinbox.find('.spinbox-input').focusout();
		// equal($spinbox.spinbox('value'), 6, 'spinbox rounds up to step when appropriate');

		// $spinbox.find('.spinbox-input').val(7);
		// $spinbox.find('.spinbox-input').focusout();
		// equal($spinbox.spinbox('value'), 6, 'spinbox sets to step value when value is max value and is not multiple of step value and value is set by hand');

		// $spinbox.find('.spinbox-input').val(-10000000000);
		// $spinbox.find('.spinbox-input').focusout();
		// equal($spinbox.spinbox('value'), 3, 'spinbox sets to step value when min value is less than step value and value is set by hand');

		// $spinbox.find('.spinbox-input').val(9999999999999);
		// $spinbox.find('.spinbox-input').focusout();
		// equal($spinbox.spinbox('value'), 6, 'spinbox sets to step value when value is max value and is not multiple of step value and value is set by hand');


	});

	it('should cycle when min or max values are reached', function () {
		// var $spinbox = $(html).find('#MySpinbox').spinbox({
		// 	min: 1,
		// 	max: 3,
		// 	cycle: true
		// });

		// $spinbox.spinbox('step',true); // 2
		// $spinbox.spinbox('step',true); // 3
		// $spinbox.spinbox('step',true); // 1
		// $spinbox.spinbox('step',true); // 2
		// equal($spinbox.spinbox('value'), 2, 'spinbox value cycled at max');
		// $spinbox.spinbox('step',false); // 1
		// $spinbox.spinbox('step',false); // 3
		// $spinbox.spinbox('step',false); // 2
		// equal($spinbox.spinbox('value'), 2, 'spinbox value cycled at min');
	});

	it('should behave correctly when units are included', function testForUnits () {
		// var $spinbox = $(html).find('#MySpinbox').spinbox({
		// 	min: -10,
		// 	units: ['px']
		// });

		// $spinbox.spinbox('value', 1);
		// ok($spinbox.spinbox('value') === '1', 'spinbox does not add units when units are enabled but not present in input; 1 === ' + $spinbox.spinbox('value'));

		// $spinbox.spinbox('value', '1px');
		// ok($spinbox.spinbox('value') === '1px', 'spinbox handles string with allowed unit; 1px === ' + $spinbox.spinbox('value'));

		// $spinbox.spinbox('step', true);
		// equal($spinbox.spinbox('value'), '2px', 'spinbox increments; ' + $spinbox.spinbox('value') + ' === 2px');

		// $spinbox.spinbox('step', false);
		// equal($spinbox.spinbox('value'), '1px', 'spinbox decrements; ' + $spinbox.spinbox('value') + ' === 1px');

		// $spinbox.spinbox('value', '2pp');
		// equal($spinbox.spinbox('value'), 2, 'spinbox does not allow unsupported units; 2 === ' + $spinbox.spinbox('value'));

		// $spinbox.find('.spinbox-input').val('4px');
		// $spinbox.find('.spinbox-input').focusout();
		// equal($spinbox.spinbox('value'), '4px', 'spinbox updates string value on focus out with units present; 4px === ' + $spinbox.spinbox('value'));

	});

	it('should add default unit if none is specified', function () {
		// var $spinbox = $(html).find('#MySpinbox').spinbox({
		// 	units: ['px'],
		// 	defaultUnit: 'px'
		// });

		// $spinbox.spinbox('value', 1);
		// ok($spinbox.spinbox('value') === '1px', 'spinbox returned value with default unit');

	});

	it('should NOT add default unit if it is not an allowed unit', function () {
		// var $spinbox = $(html).find('#MySpinbox').spinbox({
		// 	units: ['px'],
		// 	defaultUnit: 'ouch'
		// });

		// $spinbox.spinbox('value', 1);
		// ok($spinbox.spinbox('value') === '1', 'spinbox returned value WITHOUT default unit; ' + $spinbox.spinbox('value') + ' === 1');

	});

	it('should keep 3 character default unit when incremented', function () {
		// var $spinbox = $(html).find('#MySpinbox').spinbox({
		// 	units: ['rem', 'px', '%'],
		// 	step: 1, // default, but explicit
		// 	defaultUnit: 'rem'
		// });

		// $spinbox.spinbox('value', 1);
		// $spinbox.spinbox('step', true);
		// ok($spinbox.spinbox('value') === '2rem', 'spinbox returned value with default unit');
	});

	it('should behave correctly when custom decimalMark is used', function () {
		// var $spinbox = $(html).find('#MySpinboxDecimal').spinbox({
		// 	value: '1,1',
		// 	min: 0,
		// 	max: 10,
		// 	step: 0.1,
		// 	decimalMark: ','
		// });

		// $spinbox.spinbox('value', '1');
		// equal($spinbox.spinbox('value'), '1', 'spinbox returned expected number when there is was custom decimal mark; ' + $spinbox.spinbox('value') + ' === 1');

		// $spinbox.spinbox('step',true);
		// equal($spinbox.spinbox('value'), '1,1', 'spinbox increments; ' + $spinbox.spinbox('value') + ' === 1,1');

		// $spinbox.spinbox('step',false);
		// equal($spinbox.spinbox('value'), '1', 'spinbox decrements; ' + $spinbox.spinbox('value') + ' === 1');
	});

	it('should allow retrieval of unadulterated number', function () {
		// var $spinbox = $(html).find('#MySpinboxDecimal').spinbox({
		// 	value: '1,1',
		// 	min: 0,
		// 	max: 10,
		// 	step: 0.1,
		// 	decimalMark: ','
		// });

		// $spinbox.spinbox('value', '1');
		// equal($spinbox.spinbox('getIntValue'), 1, 'spinbox returns expected integer; ' + $spinbox.spinbox('getIntValue') + ' === 1');

		// $spinbox.spinbox('value', '1,1');
		// equal($spinbox.spinbox('getIntValue'), 1.1, 'spinbox returns expected float; ' + $spinbox.spinbox('value') + ' === 1.1');

		// var $spinbox2 = $(html).find('#MySpinboxDecimal').spinbox({
		// 	value: '1.1',
		// 	min: 0,
		// 	max: 10,
		// 	step: 0.1,
		// 	decimalMark: '.'
		// });

		// $spinbox.spinbox('value', '1');
		// equal($spinbox.spinbox('getIntValue'), 1, 'spinbox returns expected integer; ' + $spinbox.spinbox('getIntValue') + ' === 1');

		// $spinbox.spinbox('value', '1.1');
		// equal($spinbox.spinbox('getIntValue'), 1.1, 'spinbox returns expected float; ' + $spinbox.spinbox('value') + ' === 1.1');
	});

	it('should destroy control', function () {
		// var $el = $(html).find('#MySpinbox');

		// equal(typeof( $el.spinbox('destroy')) , 'string', 'returns string (markup)');
		// equal( $el.parent().length, false, 'control has been removed from DOM');
	});
});
