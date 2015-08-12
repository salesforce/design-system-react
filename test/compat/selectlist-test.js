const fs = require('fs');
const $ = require('jquery');
window.$ = window.jQuery = $;

let html = fs.readFileSync('test/compat/markup/selectlist-markup.html', 'utf8');
const chai = require('chai');
const assert = chai.assert;
require('bootstrap');
require('../../src/jquery/selectlist/selectlist');

/* FOR DEV TESTING */
// const html = require('text!dev.html!strip');
html = $('<div>' + html + '</div>');
const $testFixture = $('body #test-fixture');
$testFixture.append(html);


describe('Fuel UX Selectlist', function () {
	after(function () {
		$testFixture.empty();
	});

	it('should be defined on jquery object', function () {
		assert.ok($().selectlist, 'selectlist method is defined');
	});

	it('should return element', function () {
		const $selectlist = $(html).find('#MySelectlist').selectlist();
		assert.ok($selectlist.selectlist() === $selectlist, 'selectlist should be initialized');
	});

	it('should autosize correctly', function () {
		const $selectlist8 = $testFixture.find('#MySelectlist8').selectlist();
		const $selectlist9 = $testFixture.find('#MySelectlist9').selectlist();
		let $btn;
		let minWidth;

		// measure all children of selectlist to be tested (add them all to a span and see how wide the span is) and make sure the selectlist is actually big enough to fit that
		$btn = $selectlist8.find('button.dropdown-toggle');
		let $textLengthTester = $('<span id="textLengthTester" style="display:inline-block;"></span>').appendTo($testFixture);
		$selectlist8.find('li').each(function (index, element) {
			// set the p tag right/left padding to that of the selectlist button right/left padding
			$('<p style="padding: 0 ' + $btn.css('padding-right') + ' 0 ' + $btn.css('padding-left') + ';">' + $(element).text() + '</p>').appendTo($textLengthTester);
		});
		minWidth = $textLengthTester.width();
		assert.ok(($selectlist8.width() >= minWidth), 'selectlist autoresized to ' + $selectlist8.width() + ' should be greater than ' + minWidth);


		// hidden selectlists have no size
		assert.equal($selectlist9.width(), 0, 'selectlist hidden, sized 0');

		// remove hidden to prepare to measure its new size
		$selectlist9.removeClass('hidden');

		// measure all children of selectlist to be tested (add them all to a span and see how wide the span is) and make sure the selectlist is actually big enough to fit that
		$btn = $selectlist9.find('button.dropdown-toggle');
		$textLengthTester = $('<span id="textLengthTester" style="display:inline-block;"></span>').appendTo($testFixture);
		$selectlist9.find('li').each(function (index, element) {
			// set the p tag right/left padding to that of the selectlist button right/left padding
			$('<p style="padding: 0 ' + $btn.css('padding-right') + ' 0 ' + $btn.css('padding-left') + ';">' + $(element).text() + '</p>').appendTo($textLengthTester);
		});
		minWidth = $textLengthTester.width();
		assert.ok(($selectlist9.width() >= minWidth), 'selectlist was hidden, now shown, sized ' + $selectlist9.width() + ' should be greater than ' + minWidth);
	});

	it('should set disabled state', function () {
		const $selectlist = $(html).find('#MySelectlist').selectlist();
		$selectlist.selectlist('disable');
		assert.equal($selectlist.find('.btn').hasClass('disabled'), true, 'element disabled');
	});

	it('should set enabled state', function () {
		const $selectlist = $(html).find('#MySelectlist').selectlist();
		$selectlist.selectlist('disable');
		$selectlist.selectlist('enable');
		assert.equal($selectlist.find('.btn').hasClass('disabled'), false, 'element enabled');
	});

	it('should set default selection', function () {
		const $selectlist = $(html).find('#MySelectlist2').selectlist(); // .selectlist();
		const item = $selectlist.selectlist('selectedItem');
		const expectedItem = { selected: true, text: 'Two', value: 2 };
		assert.deepEqual(item, expectedItem, 'default item selected');
	});

	it('should select by index', function () {
		const $selectlist = $(html).find('#MySelectlist3').selectlist();
		$selectlist.selectlist('selectByIndex', 0);

		const item = $selectlist.selectlist('selectedItem');
		const expectedItem = {selected: true, text: 'One', value: 1 };
		assert.deepEqual(item, expectedItem, 'item selected');
	});

	it('should select by value', function () {
		const $selectlist = $(html.find('#MySelectlist4').selectlist()); // .selectlist();
		$selectlist.selectlist('selectByValue', 2);

		const item = $selectlist.selectlist('selectedItem');
		const expectedItem = {selected: true, text: 'Two', value: 2 }; // weird
		assert.deepEqual(item, expectedItem, 'item selected');
	});

	it('should select by value with whitespace', function () {
		const $selectlist = $(html).find('#MySelectlist5').selectlist();
		$selectlist.selectlist('selectByValue', 'Item Five');

		const item = $selectlist.selectlist('selectedItem');
		const expectedItem = {selected: true, text: 'Item Five', value: 'Item Five' }; // weird
		assert.deepEqual(item, expectedItem, 'item selected');
	});

	it('should select by text', function () {
		const $selectlist = $(html).find('#MySelectlist6').selectlist();
		$selectlist.selectlist('selectByText', 'THREE');

		const item = $selectlist.selectlist('selectedItem');
		const expectedItem = {selected: true, text: 'Three', value: 3 };
		assert.deepEqual(item, expectedItem, 'item selected');
	});

	it('should select by text with whitespace', function () {
		const $selectlist = $(html).find('#MySelectlist').selectlist();
		$selectlist.selectlist('selectByText', 'Item Five');

		const item = $selectlist.selectlist('selectedItem');
		const expectedItem = {selected: true, text: 'Item Five', value: 'Item Five' };
		assert.deepEqual(item, expectedItem, 'item selected');
	});

	it('should select by selector', function () {
		const $selectlist = $(html).find('#MySelectlist').selectlist();
		$selectlist.selectlist('selectBySelector', 'li[data-fizz=buzz]');

		const item = $selectlist.selectlist('selectedItem');
		const expectedItem = {selected: true, text: 'Buzz', value: 4, foo: 'bar', fizz: 'buzz' };
		assert.deepEqual(item, expectedItem, 'item selected');
	});

	it('should fire change event', function () {
		let eventFired = false;
		let selectedText = '';
		let selectedValue = '';

		const $selectlist = $(html).find('#MySelectlist').selectlist().on('changed.fu.selectlist', function (evt, data) {
			eventFired = true;
			selectedText = data.text;
			selectedValue = data.value;
		});

		// simulate changed event
		$selectlist.find('.dropdown-menu a:first').click();

		assert.equal(eventFired, true, 'change event fired');
		assert.equal(selectedText, 'One', 'text passed in from change event');
		assert.equal(selectedValue, 1, 'value passed in from change event');
	});

	it('should not fire changed event on disabled items', function () {
		let eventFired = false;
		let selectedText = '';
		let selectedValue = '';

		const $selectlist = $(html).find('#MySelectlist').selectlist().on('changed.fu.selectlist', function (evt, data) {
			eventFired = true;
			selectedText = data.text;
			selectedValue = data.value;
		});

		// Disable menu item then simulate changed event
		$selectlist.find('li:first').addClass('disabled')
			.find('a').click();

		assert.equal(eventFired, false, 'changed event not fired');
		assert.equal(selectedText, '', 'text not changed');
		assert.equal(selectedValue, '', 'value not changed');
	});

	it('should destroy control', function () {
		const $el = $(html).find('#MySelectlist').selectlist();

		assert.equal(typeof($el.selectlist('destroy')), 'string', 'returns string (markup)');
		assert.equal( $el.parent().length, false, 'control has been removed from DOM');
	});
});
