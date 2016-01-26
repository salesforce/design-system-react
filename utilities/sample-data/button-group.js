import { Button } from 'design-system-jquery';
const childButton = new Button({
	text: 'Neutral',
	theme: 'neutral'
});

const collection = [
	{
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
		children: [childButton]
	},
	{
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
	},
	{
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
	}];

module.exports = {
	default: {
		collection: collection
	}
};
