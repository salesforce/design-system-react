import * as Lib from '../../lib/lib';
import Checkbox from './checkbox';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	// new api controls
	const checkbox = new Checkbox($('#myCheckbox'), {
		text: 'Init via JS',
		value: 'value9',
		checked: true
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
});
