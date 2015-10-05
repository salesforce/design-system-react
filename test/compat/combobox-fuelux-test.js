/*
 * COMBOBOX - JQUERY DECLARATIVE - API TESTS
 * Facade (or framework specific) implementation of tests defined in behaviors folder
 */

import { CONTROL as controlName } from '../../src/core/combobox';   // <-- change this one line and then copy past below.
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
		ok($().combobox, 'combobox method is defined');
	});

	test("should return element", function () {
		var $combobox = $(html).find("#MyCombobox");
		ok($combobox.combobox() === $combobox , 'combobox should be initialized');
	});

	// BEHAVIOR CHANGING FROM LEGACY CODEBASE ------------------------------------

	test("should disable dropdown menu if no items exists", function () {
		var $combobox = $(html).find('#MyComboboxSingleItem').combobox();
		equal($combobox.find('.btn').hasClass('disabled'), true, 'dropdown disabled');
	});

	test("should set disabled state", function () {
		var $combobox = $(html).find("#MyCombobox").combobox();
		$combobox.combobox('disable');
		equal($combobox.find('.btn').hasClass('disabled'), true, 'element disabled');
	});

	test("should set enabled state", function () {
		var $combobox = $(html).find("#MyCombobox").combobox();
		$combobox.combobox('disable');
		$combobox.combobox('enable');
		equal($combobox.find('.btn').hasClass('disabled'), false, 'element enabled');
	});

	test("should set default selection", function () {
		// should be "Three" based on the data-selected attribute
		var $combobox = $(html).find("#MyComboboxWithSelected").combobox();
		var item = $combobox.combobox('selectedItem');

		// MODIFIED FROM ORIGINAL TESTING
		// needs selected: true added
		var expectedItem = { selected: true, value: 3, text: 'Three' };
		deepEqual(item, expectedItem, 'default item selected');
	});

	test("should not autoselect when no default selection", function () {
		var $combobox = $(html).find("#MyCombobox").combobox();
		var item = $combobox.combobox('selectedItem');

		// MODIFIED FROM ORIGINAL TESTING
		// removed , text: '', added selected: true (feel free to remove selected: true)
		var expectedItem = { selected: true };
		deepEqual(item, expectedItem, 'no item selected');
	});

	test("should return selectedItem", function () {
		var $combobox = $(html).find("#MyCombobox").combobox();
		$combobox.combobox('selectByIndex', 0);

		var item = $combobox.combobox('selectedItem');
		var expectedItem = { text: 'One', value: 1, selected: true };
		deepEqual(item, expectedItem, 'selectedItem returns expected value');
	});

	test("should return selectedItem", function () {
		var $combobox = $(html).find("#MyCombobox").combobox();
		$combobox.combobox('selectByIndex', 0);

		var item1 = $combobox.combobox('selectedItem');
		var item2 = $combobox.combobox('getValue');
		deepEqual(item1, item2, 'getValue alias matches selectedItem');
	});

	test("should select by index", function () {
		var $combobox = $(html).find("#MyCombobox").combobox();
		$combobox.combobox('selectByIndex', 0);

		var item = $combobox.combobox('selectedItem');
		var expectedItem = { text: 'One', value: 1, selected: true };
		deepEqual(item, expectedItem, 'item selected');
	});

	test("should select by value", function () {
		var $combobox = $(html).find("#MyCombobox").combobox();
		$combobox.combobox('selectByValue', 2);

		var item = $combobox.combobox('selectedItem');
		var expectedItem = { text: 'Two', value: 2, selected: true };
		deepEqual(item, expectedItem, 'item selected');
	});

	test("should select by value with whitespace", function () {
		var $combobox = $(html).find("#MyCombobox").combobox();
		$combobox.combobox('selectByValue', 'Item Five');

		var item = $combobox.combobox('selectedItem');
		var expectedItem = { text: 'Item Five', value: 'Item Five', selected: true };
		deepEqual(item, expectedItem, 'item selected');
	});

	test("should select by text", function() {
		var $combobox = $(html).find("#MyCombobox").combobox();
		$combobox.combobox('selectByText', 'THREE');

		var item = $combobox.combobox('selectedItem');
		var expectedItem = { text:'Three', value: 3, selected: true };
		deepEqual(item, expectedItem, 'item selected');
	});

	test("should select by text with whitespace", function() {
		var $combobox = $(html).find("#MyCombobox").combobox();
		$combobox.combobox('selectByText', 'Item Five');

		var item = $combobox.combobox('selectedItem');
		var expectedItem = { text:'Item Five', value: 'Item Five', selected: true };
		deepEqual(item, expectedItem, 'item selected');
	});

	// HIGHLY MODIFIED FROM ORIGINAL TESTS BELOW THIS LINE --------------------------------------------
	// 
	test("should fire changed event - item selected", function (done) {
		var eventFireCount = 0;
		var selectedText = '';
		var selectedValue = '';

		console.log($(html).find("#MyCombobox"));

		var $combobox = $(html).find("#MyCombobox").combobox().on('changed.fu.combobox', function (evt, data) {
			eventFireCount++;
			selectedText = data.text;
			selectedValue = data.value;

			equal(eventFireCount, 1, 'changed event fired once');
			equal(selectedText, 'One', 'text passed in from changed event');
			equal(selectedValue, 1, 'value passed in from changed event');
			$(html).append($combobox.combobox('destroy'));
			done();
		});

		window.setTimeout(function () {
			$combobox.find('a:eq(0)').click(); 
		}, 0);

	});

	test("should fire input change event - item selected", function (done) {
		var eventFireCount = 0;

		var $combobox = $(html).find("#MyCombobox").combobox();

		$combobox.find('input').on('change', function (evt) {
			eventFireCount++;
			equal(eventFireCount, 1, 'change event fired once');
			equal($combobox.find('input')[0].value, 'Two');
			$(html).append($combobox.combobox('destroy'));
			done();
		});

		window.setTimeout(function () {
			$combobox.find('a:eq(1)').click();
			$combobox.find('input').trigger('change');
		}, 0);
	});

	test("should fire bubblable input change event - item selected", function (done) {
		var eventFireCount = 0;

		var $combobox = $(html).find("#MyCombobox").combobox().on('change', 'input', function () {
			eventFireCount++;
			equal(eventFireCount, 1, 'change event bubbled once');
			$(html).append($combobox.combobox('destroy'));
			done();
		});

		window.setTimeout(function () {
			$combobox.find('a:eq(2)').click(); 
			$combobox.find('input').trigger('change');
		}, 0);
	});

	test("should fire changed event - input changed", function (done) {
		var eventFireCount = 0;
		var selectedText = '';

		var $combobox = $(html).find("#MyCombobox").combobox().on('changed.fu.combobox', function (evt, data) {
			eventFireCount++;
			selectedText = data.text;
			equal(eventFireCount, 1, 'changed event fired once');
			equal(selectedText, 'Seven', 'text passed in from changed event');
			$(html).append($combobox.combobox('destroy'));
			done();
		});

		window.setTimeout(function () {
			$combobox.find('input').val('Seven').change();
		}, 0);
	});

	test("should select by selector", function () {
		var $combobox = $(html).find("#MyCombobox").combobox();
		$combobox.combobox('selectBySelector', 'li[data-fizz=buzz]');

		var item = $combobox.combobox('selectedItem');
		var expectedItem = { text: 'Six', value: 6, foo: 'bar', fizz: 'buzz', selected: true };
		deepEqual(item, expectedItem, 'item selected');
	});

	test("should destroy control", function () {
		var id = '#MyCombobox';
		var $el = $(html).find(id).combobox();

		equal(typeof( $el.combobox('destroy')) , 'string', 'returns string (markup)');
		equal( $(html).find(id).length, false, 'control has been removed from DOM');
	});

	test("should remove whitespace", function () {
		var $combobox = $(html).find("#MyComboboxWithWhiteSpace").combobox();
		$combobox.combobox('selectByIndex', 0);

		var item = $combobox.combobox('selectedItem');
		equal(item.text, 'no whitespace', 'whitespace was removed');
	});

});