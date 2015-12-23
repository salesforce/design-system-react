import {Lib, Button} from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const button1 = new Button($('#button-jquery-control .button-neutral'), {
		text: 'Neutral',
		theme: 'neutral'
	});

	const button2 = new Button($('#button-jquery-control .button-brand'), {
		text: 'Brand',
		theme: 'brand'
	});

	const button3 = new Button($('#button-jquery-control .button-inverse'), {
		text: 'Inverse',
		theme: 'inverse'
	});

	const button4 = new Button($('#button-jquery-control .button-bare'), {
		'text': 'Bare Button'
	});

	const button5 = new Button($('#button-jquery-control .button-neutral-small'), {
		text: 'Small',
		theme: 'neutral',
		size: 'small'
	});

	const button6 = new Button($('#button-jquery-control .button-brand-small'), {
		text: 'Small',
		theme: 'brand',
		size: 'small'
	});

	const button7 = new Button($('#button-jquery-control .button-inverse-small'), {
		text: 'Small',
		theme: 'inverse',
		size: 'small'
	});


	const button8 = new Button($('#button-jquery-control .button-icon-left-small'), {
		text: 'Small',
		theme: 'neutral',
		icon: 'utility.table',
		iconPosition: 'left',
		size: 'small'
	});

	const button9 = new Button($('#button-jquery-control .button-icon-right-small'), {
		text: 'Small',
		theme: 'neutral',
		icon: 'utility.table',
		iconPosition: 'right',
		size: 'small'
	});

	const button10 = new Button($('#button-jquery-control .button-bare-icon-right-small'), {
		text: 'Small & disabled',
		icon: 'utility.table',
		iconPosition: 'right',
		iconStyle: 'icon-bare',
		size: 'small',
		disabled: true
	});

	const button23 = new Button($('#button-jquery-control .button-icon-more'), {
		icon: 'utility.table',
		assistiveText: 'Icon More',
		iconStyle: 'icon-more'
	});

	const button24 = new Button($('#button-jquery-control .button-icon-more-disabled'), {
		icon: 'utility.table',
		assistiveText: 'Icon More',
		iconStyle: 'icon-more',
		disabled: true
	});

	const button11 = new Button($('#button-jquery-control .button-icon-container'), {
		icon: 'utility.table',
		assistiveText: 'Icon-container',
		iconStyle: 'icon-container'
	});

	const button12 = new Button($('#button-jquery-control .button-icon-container-disabled'), {
		icon: 'utility.table',
		assistiveText: 'Icon-container',
		iconStyle: 'icon-container',
		disabled: true
	});

	const button13 = new Button($('#button-jquery-control .button-icon-border'), {
		icon: 'utility.table',
		assistiveText: 'Icon-border',
		iconStyle: 'icon-border'
	});

	const button14 = new Button($('#button-jquery-control .button-icon-border-disabled'), {
		icon: 'utility.table',
		assistiveText: 'Icon-border',
		iconStyle: 'icon-border',
		disabled: true
	});

	const button15 = new Button($('#button-jquery-control .button-icon-border-filled'), {
		icon: 'utility.table',
		assistiveText: 'Border-filled',
		iconStyle: 'icon-border-filled'
	});

	const button16 = new Button($('#button-jquery-control .button-icon-border-filled-disabled'), {
		icon: 'utility.table',
		assistiveText: 'Border-filled',
		iconStyle: 'icon-border-filled',
		disabled: true
	});

	const button17 = new Button($('#button-jquery-control .button-icon-small'), {
		icon: 'utility.table',
		assistiveText: 'Icon-small',
		iconStyle: 'icon-small'
	});

	const button18 = new Button($('#button-jquery-control .button-icon-small-disabled'), {
		icon: 'utility.table',
		assistiveText: 'Icon-small',
		iconStyle: 'icon-small',
		disabled: true
	});


	const button19 = new Button($('#button-jquery-control .button-icon-left'), {
		text: 'Neutral',
		theme: 'neutral',
		icon: 'utility.table',
		iconPosition: 'left'
	});

	const button20 = new Button($('#button-jquery-control .button-icon-right'), {
		text: 'Neutral',
		theme: 'neutral',
		icon: 'utility.table',
		iconPosition: 'right'
	});

	const button21 = new Button($('#button-jquery-control .button-bare-icon-right'), {
		text: 'Bare & disabled',
		icon: 'utility.table',
		iconPosition: 'right',
		iconStyle: 'icon-bare',
		disabled: true
	});

	$('#button-jquery-control .slds-button-group')
		.append(new Button($('#button-jquery-control .slds-button-group .refresh'), {
			text: 'Refresh',
			theme: 'neutral'
		}))
		.append(new Button($('#button-jquery-control .slds-button-group .refresh'), {
			text: 'Edit',
			theme: 'neutral'
		}))
		.append(new Button($('#button-jquery-control .slds-button-group .refresh'), {
			text: 'Save',
			theme: 'neutral'
		}));

	const button22 = new Button($('#button-jquery-control .button-stateful'), {
		text: 'Follow',
		icon: 'utility.add',
		theme: 'neutral',
		views: [
			{
				text: 'Following',
				view: 'selected',
				icon: 'utility.check'
			},
			{
				text: 'Unfollow',
				view: 'selectedHover',
				icon: 'utility.close'
			}
		]
	});

	void(button1);
	void(button2);
	void(button3);
	void(button4);
	void(button5);
	void(button6);
	void(button7);
	void(button8);
	void(button9);
	void(button10);
	void(button10);
	void(button11);
	void(button12);
	void(button13);
	void(button14);
	void(button15);
	void(button16);
	void(button17);
	void(button18);
	void(button19);
	void(button20);
	void(button21);
	void(button22);
	void(button23);
	void(button24);

	$('#button-jquery-set-icon').on('click', function () {
		button19.renderView({
			icon: 'utility.chart',
			text: 'Updated'
		});
	});

	$('#button-stateful-jquery-select').on('click', function () {
		button22.toggle(true);
	});

	$('#button-stateful-jquery-deselect').on('click', function () {
		button22.toggle(false);
	});

	$('#button-stateful-jquery-disable').on('click', function () {
		button22.disable();
	});

	$('#button-stateful-jquery-enable').on('click', function () {
		button22.enable();
	});

	$('#button-stateful-jquery-destroy').on('click', function () {
		console.log(button22.destroy());
	});
});
