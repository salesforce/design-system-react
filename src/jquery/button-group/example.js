import * as Lib from '../../lib/lib';
import ButtonGroup from './button-group';
import Button from '../button/button';

const $ = Lib.global.jQuery || Lib.global.$;

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
			}
		],
		children: [button1]
	});

	const buttonGroup2 = new ButtonGroup($('#button-group-jquery-control'), {
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

	$('#button-group-jquery-button-select').on('click', function () {
		buttonGroup2.getProperty('children')[0].toggle(true);
	});

	$('#button-group-jquery-button-deselect').on('click', function () {
		buttonGroup2.getProperty('children')[0].toggle(false);
	});
});
