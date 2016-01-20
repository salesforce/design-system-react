import {Lib, Modal} from 'design-system-jquery';
import * as controlTemplate from './template-control';
import * as controlTemplateLauncher from './template-control-launcher';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	$('#modal-jquery-control').append(controlTemplate.template);
	$('#modal-jquery-control').before(controlTemplateLauncher.template);
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
