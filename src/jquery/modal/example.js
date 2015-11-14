import * as Lib from '../../lib/lib';
import Modal from './modal';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const modal = new Modal($('#modal-jquery-control'), {
		headerText: 'Modal Header',
		headerTagline: 'This is a tagline',
		headerTextSize: 'medium',
		secondaryButtonText: 'Cancel',
		primaryButtonText: 'Save'
	});

	modal.on('primary', function () {
		console.log('Save primary modal');
	});

	modal.on('secondary', function () {
		modal.close();
	});

	$('#modal-jquery-control-launch').on('click', function () {
		modal.open();
	});
});
