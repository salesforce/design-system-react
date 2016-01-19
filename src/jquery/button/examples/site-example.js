import { Lib, Button } from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

const buttonsProperties = [
	{
		assistiveText: 'button-base',
		disabled: false,
		domNode: '.button-base',
		icon: '',
		iconPosition: '',
		iconStyle: '',
		iconSize: '',
		size: '',
		text: 'Button Base',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-base-disabled',
		disabled: true,
		domNode: '.button-base-disabled',
		icon: '',
		iconPosition: '',
		iconStyle: '',
		iconSize: '',
		size: '',
		text: 'Disabled',
		theme: 'neutral',
		views: []
	},
	{
		assistiveText: 'button-neutral',
		disabled: false,
		domNode: '.button-neutral',
		icon: '',
		iconPosition: '',
		iconStyle: '',
		iconSize: '',
		size: '',
		text: 'Button Neutral',
		theme: 'neutral',
		views: []
	},
	{
		assistiveText: 'button-neutral-disabled',
		disabled: true,
		domNode: '.button-neutral-disabled',
		icon: '',
		iconPosition: '',
		iconStyle: '',
		iconSize: '',
		size: '',
		text: 'Disabled',
		theme: 'neutral',
		views: []
	},
	{
		assistiveText: 'button-neutral-small',
		disabled: false,
		domNode: '.button-neutral-small',
		icon: '',
		iconPosition: '',
		iconStyle: '',
		iconSize: '',
		size: 'small',
		text: 'Small',
		theme: 'neutral',
		views: []
	},
	{
		assistiveText: 'button-neutral-icon-left',
		disabled: false,
		domNode: '.button-neutral-icon-left',
		icon: 'utility.download',
		iconPosition: 'left',
		iconStyle: '',
		iconSize: '',
		size: '',
		text: 'Download',
		theme: 'neutral',
		views: []
	},
	{
		assistiveText: 'button-neutral-icon-right',
		disabled: false,
		domNode: '.button-neutral-icon-right',
		icon: 'utility.download',
		iconPosition: 'right',
		iconStyle: '',
		iconSize: '',
		size: '',
		text: 'Download',
		theme: 'neutral',
		views: []
	},
	{
		assistiveText: 'button-brand',
		disabled: false,
		domNode: '.button-brand',
		icon: '',
		iconPosition: '',
		iconStyle: '',
		iconSize: '',
		size: '',
		text: 'Button Brand',
		theme: 'brand',
		views: []
	},
	{
		assistiveText: 'button-brand-disabled',
		disabled: true,
		domNode: '.button-brand-disabled',
		icon: '',
		iconPosition: '',
		iconStyle: '',
		iconSize: '',
		size: '',
		text: 'Disabled',
		theme: 'brand',
		views: []
	},
	{
		assistiveText: 'button-brand-small',
		disabled: false,
		domNode: '.button-brand-small',
		icon: '',
		iconPosition: '',
		iconStyle: '',
		iconSize: '',
		size: 'small',
		text: 'Small',
		theme: 'brand',
		views: []
	},
	{
		assistiveText: 'button-destructive',
		disabled: false,
		domNode: '.button-destructive',
		icon: '',
		iconPosition: '',
		iconStyle: '',
		iconSize: '',
		size: '',
		text: 'Button Destructive',
		theme: 'destructive',
		views: []
	},
	{
		assistiveText: 'button-destructive-disabled',
		disabled: true,
		domNode: '.button-destructive-disabled',
		icon: '',
		iconPosition: '',
		iconStyle: '',
		iconSize: '',
		size: '',
		text: 'Disabled',
		theme: 'destructive',
		views: []
	},
	{
		assistiveText: 'button-destructive-small',
		disabled: false,
		domNode: '.button-destructive-small',
		icon: '',
		iconPosition: '',
		iconStyle: '',
		iconSize: '',
		size: 'small',
		text: 'Small',
		theme: 'destructive',
		views: []
	},
	{
		assistiveText: 'button-inverse',
		disabled: false,
		domNode: '.button-inverse',
		icon: '',
		iconPosition: '',
		iconStyle: '',
		iconSize: '',
		size: '',
		text: 'Button Inverse',
		theme: 'inverse',
		views: []
	},
	{
		assistiveText: 'button-inverse-disabled',
		disabled: true,
		domNode: '.button-inverse-disabled',
		icon: '',
		iconPosition: '',
		iconStyle: '',
		iconSize: '',
		size: '',
		text: 'Disabled',
		theme: 'inverse',
		views: []
	},
	{
		assistiveText: 'button-inverse-small',
		disabled: false,
		domNode: '.button-inverse-small',
		icon: '',
		iconPosition: '',
		iconStyle: '',
		iconSize: '',
		size: 'small',
		text: 'Small',
		theme: 'inverse',
		views: []
	},
	{
		assistiveText: 'button-stateful',
		disabled: false,
		domNode: '.button-stateful',
		icon: 'utility.add',
		iconPosition: '',
		iconStyle: '',
		iconSize: '',
		size: '',
		text: 'Follow',
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
	},
	{
		assistiveText: 'button-stateful-inverse',
		disabled: false,
		domNode: '.button-stateful-inverse',
		icon: 'utility.add',
		iconPosition: '',
		iconStyle: '',
		iconSize: '',
		size: '',
		text: 'Follow',
		theme: 'inverse',
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
	},
	{
		assistiveText: 'button-icon-bare-x-small',
		disabled: false,
		domNode: '.button-icon-bare-x-small',
		icon: 'utility.close',
		iconPosition: '',
		iconStyle: 'icon-bare',
		iconSize: 'x-small',
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-bare-small',
		disabled: false,
		domNode: '.button-icon-bare-small',
		icon: 'utility.close',
		iconPosition: '',
		iconStyle: 'icon-bare',
		iconSize: 'small',
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-bare',
		disabled: false,
		domNode: '.button-icon-bare',
		icon: 'utility.close',
		iconPosition: '',
		iconStyle: 'icon-bare',
		iconSize: '',
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-bare-large',
		disabled: false,
		domNode: '.button-icon-bare-large',
		icon: 'utility.close',
		iconPosition: '',
		iconStyle: 'icon-bare',
		iconSize: 'large',
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-bare-x-small--disabled',
		disabled: true,
		domNode: '.button-icon-bare-x-small--disabled',
		icon: 'utility.close',
		iconPosition: '',
		iconStyle: 'icon-bare',
		iconSize: 'x-small',
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-bare-small--disabled',
		disabled: true,
		domNode: '.button-icon-bare-small--disabled',
		icon: 'utility.close',
		iconPosition: '',
		iconStyle: 'icon-bare',
		iconSize: 'small',
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-bare--disabled',
		disabled: true,
		domNode: '.button-icon-bare--disabled',
		icon: 'utility.close',
		iconPosition: '',
		iconStyle: 'icon-bare',
		iconSize: '',
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-bare-large--disabled',
		disabled: true,
		domNode: '.button-icon-bare-large--disabled',
		icon: 'utility.close',
		iconPosition: '',
		iconStyle: 'icon-bare',
		iconSize: 'large',
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-container',
		disabled: false,
		domNode: '.button-icon-container',
		icon: 'utility.table',
		iconPosition: '',
		iconStyle: 'icon-container',
		iconSize: '',
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-container-disabled',
		disabled: true,
		domNode: '.button-icon-container-disabled',
		icon: 'utility.table',
		iconPosition: '',
		iconStyle: 'icon-container',
		iconSize: '',
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-border',
		disabled: false,
		domNode: '.button-icon-border',
		icon: 'utility.table',
		iconPosition: '',
		iconStyle: 'icon-border',
		iconSize: '',
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-border-disabled',
		disabled: true,
		domNode: '.button-icon-border-disabled',
		icon: 'utility.table',
		iconPosition: '',
		iconStyle: 'icon-border',
		iconSize: '',
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-border-filled',
		disabled: false,
		domNode: '.button-icon-border-filled',
		icon: 'utility.table',
		iconPosition: '',
		iconStyle: 'icon-border-filled',
		iconSize: '',
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-border-filled-disabled',
		disabled: true,
		domNode: '.button-icon-border-filled-disabled',
		icon: 'utility.table',
		iconPosition: '',
		iconStyle: 'icon-border-filled',
		iconSize: '',
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-more',
		disabled: false,
		domNode: '.button-icon-more',
		icon: 'utility.table',
		iconPosition: '',
		iconStyle: 'icon-more',
		iconSize: '',
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-more-disabled',
		disabled: true,
		domNode: '.button-icon-more-disabled',
		icon: 'utility.table',
		iconPosition: '',
		iconStyle: 'icon-more',
		iconSize: '',
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-stateful',
		disabled: false,
		domNode: '.button-icon-stateful',
		icon: 'utility.like',
		iconPosition: '',
		iconStyle: 'icon-border',
		iconSize: '',
		selected: false,
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-inverse',
		disabled: false,
		domNode: '.button-icon-inverse',
		icon: 'utility.close',
		iconPosition: '',
		iconStyle: 'icon-inverse',
		iconSize: '',
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-inverse-disabled',
		disabled: true,
		domNode: '.button-icon-inverse-disabled',
		icon: 'utility.close',
		iconPosition: '',
		iconStyle: 'icon-inverse',
		iconSize: '',
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-bare-hint',
		disabled: false,
		domNode: '.button-icon-bare-hint',
		icon: 'utility.close',
		iconPosition: '',
		iconStyle: 'icon-bare-hint',
		iconSize: '',
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-border-hint',
		disabled: false,
		domNode: '.button-icon-border-hint',
		icon: 'utility.close',
		iconPosition: '',
		iconStyle: 'icon-border-hint',
		iconSize: '',
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-border-filled-hint',
		disabled: false,
		domNode: '.button-icon-border-filled-hint',
		icon: 'utility.close',
		iconPosition: '',
		iconStyle: 'icon-border-filled-hint',
		iconSize: '',
		size: '',
		text: '',
		theme: '',
		views: []
	},
	{
		assistiveText: 'button-icon-container-hint',
		disabled: false,
		domNode: '.button-icon-container-hint',
		icon: 'utility.close',
		iconPosition: '',
		iconStyle: 'icon-container-hint',
		iconSize: '',
		size: '',
		text: '',
		theme: '',
		views: []
	}
];

$(function () {
	const buttons = [];
	$.each(buttonsProperties, function (index, value) {
		const thisButtonProperties = {};

		const defaultButtonProperties = [
			'assistiveText',
			'disabled',
			'children',
			'icon',
			'iconPosition',
			'iconSize',
			'iconStyle',
			'selected',
			'selectable',
			'size',
			'text',
			'theme',
			'truncate',
			'views'
		];

		$.each(defaultButtonProperties, function (index2, value2) {
			if ( typeof value[value2] !== 'undefined') {
				if ( value[value2] !== '' ) {
					thisButtonProperties[value2] = value[value2];
				}
			}
		});
		buttons['button' + index] = new Button($('#button-jquery-control ' + value.domNode), thisButtonProperties);
		void (buttons['button' + index]);
	});

	$('#button-jquery-set-icon').on('click', function () {
		buttons.button5.renderView({
			icon: 'utility.check',
			text: 'Icon Updated!'
		});
	});

	$('#button-stateful-jquery-select').on('click', function () {
		buttons.button16.toggle(true);
	});

	$('#button-stateful-jquery-deselect').on('click', function () {
		buttons.button16.toggle(false);
	});

	$('#button-stateful-jquery-disable').on('click', function () {
		buttons.button16.disable();
	});

	$('#button-stateful-jquery-enable').on('click', function () {
		buttons.button16.enable();
	});

	$('#button-stateful-jquery-recreate').attr('disabled', true);
	$('#button-stateful-jquery-destroy').on('click', function () {
		$('#button-stateful-jquery-destroy').attr('disabled', true);
		$('#button-stateful-jquery-recreate').attr('disabled', false);
		console.log(buttons.button16.destroy());
	});

	$('#button-stateful-jquery-recreate').on('click', function () {
		$('#button-stateful-jquery-destroy').attr('disabled', false);
		$('#button-stateful-jquery-recreate').attr('disabled', true);
		buttons.button16 = new Button($('#button-jquery-control .button-stateful'), {
			assistiveText: 'button-stateful',
			disabled: false,
			icon: 'utility.add',
			text: 'Follow',
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
		void (buttons.button16);
	});
});
