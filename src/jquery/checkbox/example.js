import * as Lib from '../../lib/lib';
import Checkbox from './checkbox';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	// new api controls
	const checkbox1 = new Checkbox($('#checkbox1'), {
		text: 'Checked',
		value: 'value9',
		checked: true
	});

	const checkbox2 = new Checkbox($('#checkbox2'), {
		text: 'Unchecked',
		value: 'value10',
		checked: false
	});

	$('#checkbox-jquery-check').on('click', function () {
		checkbox1.toggle(true);
	});

	$('#checkbox-jquery-uncheck').on('click', function () {
		checkbox1.toggle(false);
	});

	$('#checkbox-jquery-disable').on('click', function () {
		checkbox1.disable();
	});

	$('#checkbox-jquery-enable').on('click', function () {
		checkbox1.enable();
	});

	void checkbox2;
});
