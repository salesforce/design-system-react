import {Lib, Radios} from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const radios = new Radios($('#radio-jquery-control'), {
		labelText: 'Radio Group Label',
		name: 'rads',
		radios: [
			{
				text: 'Checked',
				value: 'value9',
				checked: true
			},
			{
				text: 'Unchecked',
				value: 'value10',
				checked: false
			},
			{
				text: 'Unchecked Disabled',
				value: 'value11',
				checked: false,
				disabled: true
			}
		]
	});

	$('#radio-jquery-checkFirst').on('click', function () {
		console.log('check first');
		radios.check(0);
	});

	$('#radio-jquery-checkSecond').on('click', function () {
		console.log('check second');
		radios.check(1);
	});

	$('#radio-jquery-disableFirst').on('click', function () {
		console.log('disable first');
		radios.radio(0).disable();
	});

	$('#radio-jquery-enableFirst').on('click', function () {
		console.log('enable first');
		radios.radio(0).enable();
	});

	$('#radio-jquery-disableAll').on('click', function () {
		console.log('disable all');
		radios.disable();
	});

	$('#radio-jquery-enableAll').on('click', function () {
		console.log('enable all');
		radios.enable();
	});

	$('#radio-jquery-logChecked').on('click', function () {
		const checked = radios.getChecked();
		console.log('get checked', checked);
	});

	$('#radio-jquery-logValue').on('click', function () {
		const checkedValue = radios.getValue();
		console.log('get value', checkedValue);
	});

	$('#radio-jquery-destroy').on('click', function () {
		console.log(radios.destroy());
	});
});
