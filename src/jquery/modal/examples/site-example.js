import {Lib, Modal} from 'design-system-jquery';

import $ from 'jquery';

// SAMPLE CONTROL CODE -->

$(function () {
	const modalProperties = {
		headerText: 'Modal Header',
		headerTagline: 'This is a tagline',
		headerTextSize: 'medium',
		secondaryButtonText: 'Cancel',
		primaryButtonText: 'Save'
	};
	const modal = new Modal($('#modal__modal-content'), modalProperties);

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
