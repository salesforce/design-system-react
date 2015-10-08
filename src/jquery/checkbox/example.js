import * as Lib from '../../lib/lib';
import Checkbox from './checkbox';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	// "declarative" control (the others use data-initialize)
	$('#myCheckbox1').checkbox();

	// "imperative" controls
	$('#myCheckbox2').checkbox({
		text: 'Custom checkbox unchecked on initialization',
		toggleSelector: '.checkboxToggleSelector2',
		value: 'value5'
	});
	$('#myCheckbox3').checkbox({
		checked: true,
		disabled: true,
		text: 'Custom checkbox checked disabled on initialization',
		value: 'value6'
	});
	$('#myCheckbox4').checkbox({
		checked: true,
		highlight: true,
		inline: true,
		text: 'Custom inline checkbox checked on initialization',
		value: 'value7'
	});
	$('#myCheckbox5').checkbox({
		disabled: true,
		inline: true,
		text: 'Custom inline checkbox disabled on initialization',
		value: 'value8'
	});

	// new api controls
	const checkboxNA1 = new Checkbox($('#myCheckbox6'), {
		text: 'Custom checkbox unchecked on initialization',
		toggleSelector: '.checkboxToggleSelector3',
		value: 'value9'
	});
	const checkboxNA2 = new Checkbox($('#myCheckbox7'), {
		checked: true,
		disabled: true,
		text: 'Custom checkbox checked disabled on initialization',
		value: 'value10'
	});
	const checkboxNA3 = new Checkbox($('#myCheckbox8'), {
		checked: true,
		highlight: true,
		inline: true,
		text: 'Custom inline checkbox checked on initialization',
		value: 'value11'
	});
	const checkboxNA4 = new Checkbox($('#myCheckbox9'), {
		disabled: true,
		inline: true,
		text: 'Custom inline checkbox disabled on initialization',
		value: 'value12'
	});

	// events
	const $checkboxExamples = $('.checkbox-examples .checkbox, .checkbox-examples .checkbox-custom');

	$checkboxExamples.on('changed.fu.checkbox', function (event, data) {
		Lib.log('changed.fu.checkbox: ', event, data);
	});
	$checkboxExamples.on('checked.fu.checkbox', function (event) {
		Lib.log('checked.fu.checkbox: ', event);
	});
	$checkboxExamples.on('unchecked.fu.checkbox', function (event) {
		Lib.log('unchecked.fu.checkbox: ', event);
	});

	void checkboxNA1;
	void checkboxNA2;
	void checkboxNA3;
	void checkboxNA4;
});
