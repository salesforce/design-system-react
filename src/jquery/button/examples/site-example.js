import { Lib, Button } from 'design-system-jquery';
import * as controlTemplate from './template-control';
import * as demoControlsTemplate from './template-demo-controls';
import { sampleData } from 'design-system-utilities';

const $ = Lib.global.jQuery || Lib.global.$;
const buttonsProperties = sampleData.button.default.collection;

$(function () {
	$('#button-jquery-control').append(controlTemplate.template);
	$('#button-jquery-demo-controls').append(demoControlsTemplate.template);
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
