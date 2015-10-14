import * as Lib from '../../lib/lib';
import Checkbox from './checkbox';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	// new api controls
	const checkbox = new Checkbox($('#myCheckbox'), {
		text: 'Checked',
		value: 'value9',
		checked: true
	});

	const checkbox2 = new Checkbox($('#myCheckbox2'), {
		text: 'Unchecked',
		value: 'value10',
		checked: false
	});

	$('#check-checkbox').on('click', function () {
		checkbox.toggle(true);
	});

	$('#uncheck-checkbox').on('click', function () {
		checkbox.toggle(false);
	});

	$('#disable-checkbox').on('click', function () {
		checkbox.disable();
	});

	$('#enable-checkbox').on('click', function () {
		checkbox.enable();
	});

	void checkbox2;
});
