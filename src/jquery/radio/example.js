import * as Lib from '../../lib/lib';
import Radios from './radios';


const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	// new api controls
	const radios = new Radios($('#radios'), {
		radios: [
			{
				text: 'Checked',
				value: 'value9',
				checked: true,
				name: 'rads'
			},
			{
				text: 'Unchecked',
				value: 'value10',
				checked: false,
				name: 'rads'
			}
		]
	});

	$('#check-radio').on('click', function () {
		console.log('toggle 1 to true');
		radios.toggle(0, true);
	});

	$('#check-radio2').on('click', function () {
		console.log('toggle 2 to true');
		radios.toggle(1, true);
	});

	$('#disable-radio').on('click', function () {
		console.log('disable all');
		radios.disable();
	});

	$('#enable-radio').on('click', function () {
		console.log('enable all');
		radios.enable();
	});
});
