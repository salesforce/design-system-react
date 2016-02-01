import {Lib, ButtonGroup, Button} from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

// SAMPLE CONTROL CODE -->

$(function () {
	const button1 = new Button({
		text: 'Neutral',
		theme: 'neutral'
	});

	const buttonGroup1 = new ButtonGroup($('#button-group-jquery-control'), {
		theme: 'neutral',
		buttons: [
			{
				text: 'Refresh'
			},
			{
				text: 'Edit'
			},
			{
				text: 'Save'
			},
			{
				assistiveText: 'More Actions',
				disabled: false,
				icon: 'utility.down',
				iconStyle: 'icon-border',
				theme: 'icon-border'
			}
		],
		children: [button1]
	});
	const buttonGroup2 = new ButtonGroup($('#button-group-jquery-control'), {
		theme: 'neutral',
		buttons: [
			{
				text: 'New Lead'
			},
			{
				theme: 'icon-border',
				assistiveText: 'button-icon-border',
				disabled: false,
				icon: 'utility.down',
				iconStyle: 'icon-border'
			}
		]
	});

	const buttonGroup3 = new ButtonGroup($('#button-group-jquery-control'), {
		iconStyle: 'icon-border',
		buttons: [
			{
				assistiveText: 'Chart',
				icon: 'utility.chart',
				selectable: true
			},
			{
				assistiveText: 'Filter',
				icon: 'utility.filterList',
				selectable: true
			},
			{
				assistiveText: 'More',
				icon: 'utility.sort',
				iconStyle: 'icon-more'
			}
		]
	});

	void(buttonGroup1);
	void(buttonGroup2);
	void(buttonGroup3);

	$('#button-group-jquery-button-select').on('click', function () {
		buttonGroup3.getProperty('children')[0].toggle(true);
	});

	$('#button-group-jquery-button-deselect').on('click', function () {
		buttonGroup3.getProperty('children')[1].toggle(true);
	});
});

// <-- SAMPLE CONTROL CODE