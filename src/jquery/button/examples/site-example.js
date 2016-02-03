import { Lib, Button } from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

// SAMPLE CONTROL CODE -->

const buttonsProperties = [
	{
		assistiveText: 'button-base', text: 'Button Base'
	}, {
		assistiveText: 'button-base-disabled', disabled: true, text: 'Disabled'
	}, {
		assistiveText: 'button-neutral', text: 'Button Neutral', theme: 'neutral'
	}, {
		assistiveText: 'button-neutral-disabled', disabled: true, text: 'Disabled', theme: 'neutral'
	}, {
		assistiveText: 'button-neutral-small', size: 'small', text: 'Small', theme: 'neutral'
	}, {
		assistiveText: 'button-neutral-icon-left', icon: 'utility.download', iconPosition: 'left', text: 'Download', theme: 'neutral'
	}, {
		assistiveText: 'button-neutral-icon-right', icon: 'utility.download', iconPosition: 'right', text: 'Download', theme: 'neutral'
	}, {
		assistiveText: 'button-brand', text: 'Button Brand', theme: 'brand'
	}, {
		assistiveText: 'button-brand-disabled', disabled: true, text: 'Disabled', theme: 'brand'
	}, {
		assistiveText: 'button-brand-small', size: 'small', text: 'Small', theme: 'brand'
	}, {
		assistiveText: 'button-destructive', text: 'Button Destructive', theme: 'destructive'
	}, {
		assistiveText: 'button-destructive-disabled', disabled: true, text: 'Disabled', theme: 'destructive'
	}, {
		assistiveText: 'button-destructive-small', size: 'small', text: 'Small', theme: 'destructive'
	}, {
		assistiveText: 'button-inverse', text: 'Button Inverse', theme: 'inverse'
	}, {
		assistiveText: 'button-inverse-disabled', disabled: true, text: 'Disabled', theme: 'inverse'
	}, {
		assistiveText: 'button-inverse-small', size: 'small', text: 'Small', theme: 'inverse'
	}, {
		assistiveText: 'button-stateful', icon: 'utility.add', text: 'Follow', theme: 'neutral', views: [
			{
				text: 'Following', view: 'selected', icon: 'utility.check'
			}, {
				text: 'Unfollow', view: 'selectedHover', icon: 'utility.close'
			}
		]
	}, {
		assistiveText: 'button-stateful-inverse', icon: 'utility.add', text: 'Follow', theme: 'inverse', views: [
			{
				text: 'Following', view: 'selected', icon: 'utility.check'
			}, {
				text: 'Unfollow', view: 'selectedHover', icon: 'utility.close'
			}
		]
	}, {
		assistiveText: 'button-icon-bare-x-small', icon: 'utility.close', iconStyle: 'icon-bare', iconSize: 'x-small'
	}, {
		assistiveText: 'button-icon-bare-small', icon: 'utility.close', iconStyle: 'icon-bare', iconSize: 'small'
	}, {
		assistiveText: 'button-icon-bare', icon: 'utility.close', iconStyle: 'icon-bare'
	}, {
		assistiveText: 'button-icon-bare-large', icon: 'utility.close', iconStyle: 'icon-bare', iconSize: 'large'
	}, {
		assistiveText: 'button-icon-bare-x-small--disabled', disabled: true, icon: 'utility.close', iconStyle: 'icon-bare', iconSize: 'x-small'
	}, {
		assistiveText: 'button-icon-bare-small--disabled', disabled: true, icon: 'utility.close', iconStyle: 'icon-bare', iconSize: 'small'
	}, {
		assistiveText: 'button-icon-bare--disabled', disabled: true, icon: 'utility.close', iconStyle: 'icon-bare'
	}, {
		assistiveText: 'button-icon-bare-large--disabled', disabled: true, icon: 'utility.close', iconStyle: 'icon-bare', iconSize: 'large'
	}, {
		assistiveText: 'button-icon-container', icon: 'utility.table', iconStyle: 'icon-container'
	}, {
		assistiveText: 'button-icon-container-disabled', disabled: true, icon: 'utility.table', iconStyle: 'icon-container'
	}, {
		assistiveText: 'button-icon-border', icon: 'utility.table', iconStyle: 'icon-border'
	}, {
		assistiveText: 'button-icon-border-disabled', disabled: true, icon: 'utility.table', iconStyle: 'icon-border'
	}, {
		assistiveText: 'button-icon-border-filled', icon: 'utility.table', iconStyle: 'icon-border-filled'
	}, {
		assistiveText: 'button-icon-border-filled-disabled', disabled: true, icon: 'utility.table', iconStyle: 'icon-border-filled'
	}, {
		assistiveText: 'button-icon-more', icon: 'utility.table', iconStyle: 'icon-more'
	}, {
		assistiveText: 'button-icon-more-disabled', disabled: true, icon: 'utility.table', iconStyle: 'icon-more'
	}, {
		assistiveText: 'button-icon-stateful', icon: 'utility.like', iconStyle: 'icon-border', selected: false
	}, {
		assistiveText: 'button-icon-inverse', icon: 'utility.close', iconStyle: 'icon-inverse'
	}, {
		assistiveText: 'button-icon-inverse-disabled', disabled: true, icon: 'utility.close', iconStyle: 'icon-inverse'
	}, {
		assistiveText: 'button-icon-bare-hint', icon: 'utility.close', iconStyle: 'icon-bare-hint'
	}, {
		assistiveText: 'button-icon-border-hint', icon: 'utility.close', iconStyle: 'icon-border-hint'
	}, {
		assistiveText: 'button-icon-border-filled-hint', icon: 'utility.close', iconStyle: 'icon-border-filled-hint'
	}, {
		assistiveText: 'button-icon-container-hint', icon: 'utility.close', iconStyle: 'icon-container-hint'
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
		buttons['button' + index] = new Button($('#button__' + value.assistiveText), thisButtonProperties);
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
		buttons.button16 = new Button($('#button__button-stateful'), {
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

// <-- SAMPLE CONTROL CODE
