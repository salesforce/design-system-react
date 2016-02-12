/*
 * PICKLIST - JQUERY DECLARATIVE - API TESTS
 * Facade (or framework specific) implementation of tests defined in behaviors folder
 */

import { CONTROL as controlName } from '../../src/core/picklist';   // <-- change this one line and then copy past below.
import * as Lib from '../../src/lib/lib';
import '../../src/jquery/fuelux-jquery-declarative';
const $ = Lib.global.jQuery || Lib.global.$;

// set up markup and test framework
import chai from 'chai';
const assert = chai.assert;
const { ok, equal, deepEqual } = assert;
const test = it;
const $testFixture = $('body #test-fixture');

let html = require('text!../jquery/markup/' + controlName + '-markup.html');
html = $('<div>' + html + '</div>');
$testFixture.append(html);

describe('Fuel UX ' + controlName, function () {
	after(function () {
		$testFixture.empty();
	});

	/*
	 * THE FOLLOWING IS FROM https://github.com/ExactTarget/fuelux/tree/master/test
	 */

	test("should be defined on jquery object", function () {
		ok($().picklist, 'picklist method is defined');
	});

	test("should return element", function () {
		var $picklist = $(html).find('#MyPicklist').picklist();
		ok($picklist.picklist() === $picklist, 'picklist should be initialized');
	});

	test("should autosize correctly", function () {
		var $picklist8 = $('body').find('#MyPicklist8').picklist();
		var $picklist9 = $('body').find('#MyPicklist9').picklist();
		var $btn, minWidth;

		//measure all children of picklist to be tested (add them all to a span and see how wide the span is) and make sure the picklist is actually big enough to fit that
		$btn = $picklist8.find('button.dropdown-toggle');
		var $textLengthTester = $('<span id="textLengthTester" style="display:inline-block;"></span>').appendTo('body');
		$picklist8.find('li').each(function(index, element){
			//set the p tag right/left padding to that of the picklist button right/left padding
			$('<p style="padding: 0 ' + $btn.css('padding-right') + ' 0 ' + $btn.css('padding-left') + ';">' + $(element).text() + '</p>').appendTo($textLengthTester);
		});
		minWidth = $textLengthTester.width();
		ok(($picklist8.width() >= minWidth), 'picklist autoresized to ' + $picklist8.width() + ' should be greater than ' + minWidth);


		//hidden picklists have no size
		ok($picklist9.width() === 0, 'picklist hidden, sized 0');

		//remove hidden to prepare to measure its new size
		$picklist9.removeClass('hidden');

		//measure all children of picklist to be tested (add them all to a span and see how wide the span is) and make sure the picklist is actually big enough to fit that
		$btn = $picklist9.find('button.dropdown-toggle');
		$textLengthTester = $('<span id="textLengthTester" style="display:inline-block;"></span>').appendTo('body');
		$picklist9.find('li').each(function(index, element){
			//set the p tag right/left padding to that of the picklist button right/left padding
			$('<p style="padding: 0 ' + $btn.css('padding-right') + ' 0 ' + $btn.css('padding-left') + ';">' + $(element).text() + '</p>').appendTo($textLengthTester);
		});
		minWidth = $textLengthTester.width();
		ok(($picklist9.width() >= minWidth), 'picklist was hidden, now shown, sized ' + $picklist9.width() + ' should be greater than ' + minWidth);
	});

	test("should disable itself if empty", function () {
		var $picklist = $(html).find('#picklistEmpty').picklist({
			emptyLabelHTML: '<li data-value=""><a href="#">I am feeling so empty</a></li>'
		});
		equal($picklist.find('.btn').hasClass('disabled'), true, 'element disabled');
		equal($picklist.find('.selected-label').html(), 'I am feeling so empty', 'custom emptyLabelHTML set as label');
		equal($picklist.picklist('selectedItem').text, 'I am feeling so empty', 'selectedItem returns correct text');
		equal($picklist.picklist('selectedItem').value, '', 'selectedItem returns correct value');
	});

	test("should set disabled state", function () {
		var $picklist = $(html).find('#MyPicklist').picklist();
		$picklist.picklist('disable');
		equal($picklist.find('.btn').hasClass('disabled'), true, 'element disabled');
	});

	test("should set enabled state", function () {
		var $picklist = $(html).find('#MyPicklist').picklist();
		$picklist.picklist('disable');
		$picklist.picklist('enable');
		equal($picklist.find('.btn').hasClass('disabled'), false, 'element enabled');
	});

	test("should set default selection", function () {
		var $picklist = $(html).find('#MyPicklist2').picklist();
		var item = $picklist.picklist('selectedItem');
		var expectedItem = { selected: true, text: 'Two', value: 2 };
		deepEqual(item, expectedItem, 'default item selected');
	});

	test("should select by index", function () {
		var $picklist = $(html).find('#MyPicklist3').picklist();
		$picklist.picklist('selectByIndex', 0);

		console.log($picklist.html());

		var item = $picklist.picklist('selectedItem');
		console.log(item);
		var expectedItem = {selected: true, text: 'One', value: 1 };
		deepEqual(item, expectedItem, 'item selected');
	});

	test("should select by value", function () {
		var $picklist = $(html.find('#MyPicklist4').picklist());
		$picklist.picklist('selectByValue', 2);

		var item = $picklist.picklist('selectedItem');
		var expectedItem = {selected: true, text: 'Two', value: 2 }; //weird
		deepEqual(item, expectedItem, 'item selected');
	});

	test("should alias getValue", function () {
		var $picklist = $(html.find('#MyPicklist4').picklist());
		$picklist.picklist('selectByValue', 2);

		var item1 = $picklist.picklist('selectedItem');
		var item2 = $picklist.picklist('getValue');
		deepEqual(item1, item2, 'getValue aliases selectedItem');
	});

	test("should select by value with whitespace", function () {
		var $picklist = $(html).find('#MyPicklist5').picklist();
		$picklist.picklist('selectByValue', 'Item Five');

		var item = $picklist.picklist('selectedItem');
		var expectedItem = {selected: true, text: 'Item Five', value: 'Item Five' }; //weird
		deepEqual(item, expectedItem, 'item selected');
	});

	test("should select by text", function () {
		var $picklist = $(html).find('#MyPicklist6').picklist();
		$picklist.picklist('selectByText', 'THREE');

		var item = $picklist.picklist('selectedItem');
		var expectedItem = {selected: true, text: 'Three', value: 3 };
		deepEqual(item, expectedItem, 'item selected');
	});

	test("should select by text with whitespace", function () {
		var $picklist = $(html).find('#MyPicklist').picklist();
		$picklist.picklist('selectByText', 'Item Five');

		var item = $picklist.picklist('selectedItem');
		var expectedItem = {selected: true, text: 'Item Five', value: 'Item Five' };
		deepEqual(item, expectedItem, 'item selected');
	});

	test("should select by selector", function () {
		var $picklist = $(html).find('#MyPicklist').picklist();
		$picklist.picklist('selectBySelector', 'li[data-fizz=buzz]');

		var item = $picklist.picklist('selectedItem');
		var expectedItem = {selected: true, text: 'Buzz', value: 4, foo: 'bar', fizz: 'buzz' };
		deepEqual(item, expectedItem, 'item selected');
	});

	test("should fire change event", function () {
		var eventFired = false;
		var selectedText = '';
		var selectedValue = '';

		var $picklist = $(html).find('#MyPicklist').picklist().on('changed', function (evt, data) {
			eventFired = true;
			selectedText = data.text;
			selectedValue = data.value;

			equal(eventFired, true, 'change event fired');
			equal(selectedText, 'One', 'text passed in from change event');
			equal(selectedValue, 1, 'value passed in from change event');
		});

		// simulate changed event
		$picklist.find('.dropdown-menu a:first').click();
	});

	test("should not fire changed event on disabled items", function () {
		var eventFired = false;
		var selectedText = '';
		var selectedValue = '';

		var $picklist = $(html).find('#MyPicklist').pickedlist().on('changed', function (evt, data) {
			eventFired = true;
			selectedText = data.text;
			selectedValue = data.value;
		});

		// Disable menu item then simulate changed event
		$picklist.find('li:first').addClass('disabled')
			.find('a').click();

		equal(eventFired, false, 'changed event not fired');
		equal(selectedText, '', 'text not changed');
		equal(selectedValue, '', 'value not changed');
	});

	test("should destroy control", function () {
		var $el = $(html).find('#MyPicklist').picklist();

		equal(typeof( $el.picklist('destroy')) , 'string', 'returns string (markup)');
		equal( $el.parent().length, false, 'control has been removed from DOM');
	});

});
