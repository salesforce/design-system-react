import {Lib, ButtonGroup, Button} from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

// SAMPLE CONTROL CODE -->

$(function () {
	const buttonGroup0ChildButton0 = new Button({
		text: 'Neutral',
		theme: 'neutral'
	});
	const buttonGroup0Properties = {
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
		children: [buttonGroup0ChildButton0]
	};
	const buttonGroup0 = new ButtonGroup($('#button-group__button-group--0'), buttonGroup0Properties);

	const buttonGroup1Properties = {
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
	};
	const buttonGroup1 = new ButtonGroup($('#button-group__button-group--1'), buttonGroup1Properties);

	const buttonGroup2Properties = {
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
	};
	const buttonGroup2 = new ButtonGroup($('#button-group__button-group--2'), buttonGroup2Properties);

	void(buttonGroup0);
	void(buttonGroup1);
	void(buttonGroup2);
});

// <-- SAMPLE CONTROL CODE
