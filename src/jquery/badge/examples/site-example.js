import {Lib, Badge} from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

// SAMPLE CONTROL CODE -->

const badgesProperties = [
	{text: 'Base', theme: 'base'},
	{text: 'Default', theme: 'default'},
	{text: 'Shade', theme: 'shade'},
	{text: 'Inverse', theme: 'inverse'},
	{text: 'Alt Inverse', theme: 'alt-inverse'},
	{text: 'Info', theme: 'info'},
	{text: 'Success', theme: 'success'},
	{text: 'Warning', theme: 'warning'},
	{text: 'Error', theme: 'error'},
	{text: 'Offline', theme: 'offline'},
	{text: 'Shade - Alert Texture', theme: 'shade-alert-texture'}
];

$(function () {
	const badges = [];
	$.each(badgesProperties, function ( index, value ) {
		badges['badge' + index] = new Badge($('#badge__badge-' + value.theme), {
			'text': value.text,
			'theme': value.theme
		});
		void(badges['badge' + index]);
	});
});

// Example of instantiating without an element and subsequently appending
const badge15 = new Badge({
	text: 'Appended',
	theme: 'inverse'
});
badge15.appendTo($('#badge__badge-for-appending'));
void(badge15);

// <-- SAMPLE CONTROL CODE
