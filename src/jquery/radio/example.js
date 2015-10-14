import * as Lib from '../../lib/lib';
import Radio from './radio';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
// "declarative" controls (the others use data-initialize)
	$('#myRadio1').radio();
	$('#myRadio2').radio();

// "imperative" controls
	$('#myRadio3').radio({
		name: 'radioGroup3',
		text: 'Custom radio unchecked on initialization',
		toggleSelector: '.radioToggleSelector2',
		value: 'value7'
	});
	$('#myRadio4').radio({
		name: 'radioGroup3',
		text: 'Custom radio unchecked on initialization',
		value: 'value8'
	});
	$('#myRadio5').radio({
		checked: true,
		disabled: true,
		name: 'radioGroup3',
		text: 'Custom radio checked disabled on initialization',
		value: 'value9'
	});
	$('#myRadio6').radio({
		highlight: true,
		inline: true,
		name: 'radioGroup4',
		text: 'Custom inline radio unchecked on initialization',
		value: 'value10'
	});
	$('#myRadio7').radio({
		inline: true,
		name: 'radioGroup4',
		text: 'Custom inline radio unchecked on initialization',
		value: 'value11'
	});
	$('#myRadio8').radio({
		checked: true,
		disabled: true,
		inline: true,
		name: 'radioGroup4',
		text: 'Custom inline radio checked disabled on initialization',
		value: 'value12'
	});

// new api controls
	const radioNA1 = new Radio($('#myRadio9'), {
		name: 'radioGroup5',
		text: 'Custom radio unchecked on initialization',
		toggleSelector: '.radioToggleSelector3',
		value: 'value7'
	});
	const radioNA2 = new Radio($('#myRadio10'), {
		name: 'radioGroup5',
		text: 'Custom radio unchecked on initialization',
		value: 'value8'
	});
	const radioNA3 = new Radio($('#myRadio11'), {
		checked: true,
		disabled: true,
		name: 'radioGroup5',
		text: 'Custom radio checked disabled on initialization',
		value: 'value9'
	});
	const radioNA4 = new Radio($('#myRadio12'), {
		highlight: true,
		inline: true,
		name: 'radioGroup6',
		text: 'Custom inline radio unchecked on initialization',
		value: 'value10'
	});
	const radioNA5 = new Radio($('#myRadio13'), {
		inline: true,
		name: 'radioGroup6',
		text: 'Custom inline radio unchecked on initialization',
		value: 'value11'
	});
	const radioNA6 = new Radio($('#myRadio14'), {
		checked: true,
		disabled: true,
		inline: true,
		name: 'radioGroup6',
		text: 'Custom inline radio checked disabled on initialization',
		value: 'value12'
	});

// events
	const $radioExamples = $('.radio-examples .radio, .radio-examples .radio-custom');

	$radioExamples.on('changed.fu.radio', function (event, data) {
		Lib.log('changed.fu.radio: ', event, data);
	});
	$radioExamples.on('checked.fu.radio', function (event) {
		Lib.log('checked.fu.radio: ', event);
	});
	$radioExamples.on('unchecked.fu.radio', function (event) {
		Lib.log('unchecked.fu.radio: ', event);
	});

	void radioNA1;
	void radioNA2;
	void radioNA3;
	void radioNA4;
	void radioNA5;
	void radioNA6;
});
