import {Lib, Modal} from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

// SAMPLE CONTROL CODE -->

$(function () {
	const modal = new Modal($('#modal-jquery-control'), {
		headerText: 'Modal Header',
		headerTagline: 'This is a tagline',
		headerTextSize: 'medium',
		secondaryButtonText: 'Cancel',
		primaryButtonText: 'Save'
	});

	modal.on('close', function () {
		$('#modal-jquery-control-launch').focus();
	});

	modal.on('primary', function () {
		console.log('Save primary modal');
		$('#modal-jquery-control-launch').focus();
	});

	modal.on('secondary', function () {
		modal.close();
		$('#modal-jquery-control-launch').focus();
	});

	$('#modal-jquery-control-launch').on('click', function () {
		modal.open();
	});
});

// <-- SAMPLE CONTROL CODE
