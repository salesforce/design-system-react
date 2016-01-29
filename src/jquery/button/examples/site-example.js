import { Lib, Button as Component } from 'design-system-jquery';
import * as controlTemplate from './template-control';
import * as demoControlsTemplate from './template-demo-controls';
import { sampleData } from 'design-system-utilities';

const $ = Lib.global.jQuery || Lib.global.$;

const COMPONENT_NAME = 'button';
const COMPONENT_DISPLAY_NAME = 'Buttons';
const SAMPLE_DATA_ACCESSOR = 'button';
const SAMPLE_DATA_DEFAULT = sampleData[SAMPLE_DATA_ACCESSOR].default.collection;

$(function () {
	$('#' + COMPONENT_NAME + '-jquery-control')
	.attr(
		'data-component-name', COMPONENT_NAME
	).attr(
		'data-component-display-name', COMPONENT_DISPLAY_NAME
	).append(
		controlTemplate.template({
			componentCollection: SAMPLE_DATA_DEFAULT,
			componentName: COMPONENT_NAME,
			componentDisplayName: COMPONENT_DISPLAY_NAME
		}
	));

	$('#' + COMPONENT_NAME + '-jquery-demo-controls')
		.attr('data-component-name', COMPONENT_NAME)
		.attr('data-component-display-name', COMPONENT_DISPLAY_NAME)
		.append(demoControlsTemplate.template({
			componentCollection: SAMPLE_DATA_DEFAULT,
			componentName: COMPONENT_NAME,
			componentDisplayName: COMPONENT_DISPLAY_NAME
		})
	);

	const components = [];


	$.each(SAMPLE_DATA_DEFAULT, function (index, value) {
		const thisComponentProperties = {};
		const defaultComponentProperties = [
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

		$.each(defaultComponentProperties, function (index2, value2) {
			if ( typeof value[value2] !== 'undefined') {
				if ( value[value2] !== '' ) {
					thisComponentProperties[value2] = value[value2];
				}
			}
		});
		components[COMPONENT_NAME + index] = new Component($('#' + COMPONENT_NAME + '-jquery-control ' + value.domNode), thisComponentProperties);
		void (components[COMPONENT_NAME + index]);
	});

	$('#' + COMPONENT_NAME + '-jquery-set-icon').on('click', function () {
		components.button5.renderView({
			icon: 'utility.check',
			text: 'Icon Updated!'
		});
	});

	$('#' + COMPONENT_NAME + '-stateful-jquery-select').on('click', function () {
		components.button16.toggle(true);
	});

	$('#' + COMPONENT_NAME + '-stateful-jquery-deselect').on('click', function () {
		components.button16.toggle(false);
	});

	$('#' + COMPONENT_NAME + '-stateful-jquery-disable').on('click', function () {
		components.button16.disable();
	});

	$('#' + COMPONENT_NAME + '-stateful-jquery-enable').on('click', function () {
		components.button16.enable();
	});

	$('#' + COMPONENT_NAME + '-stateful-jquery-recreate').attr('disabled', true);
	$('#' + COMPONENT_NAME + '-stateful-jquery-destroy').on('click', function () {
		$('#' + COMPONENT_NAME + '-stateful-jquery-destroy').attr('disabled', true);
		$('#' + COMPONENT_NAME + '-stateful-jquery-recreate').attr('disabled', false);
		console.log(components.button16.destroy());
	});

	$('#' + COMPONENT_NAME + '-stateful-jquery-recreate').on('click', function () {
		$('#' + COMPONENT_NAME + '-stateful-jquery-destroy').attr('disabled', false);
		$('#' + COMPONENT_NAME + '-stateful-jquery-recreate').attr('disabled', true);
		components.button16 = new Component($('#' + COMPONENT_NAME + '-jquery-control .button-stateful'), {
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
		void (components.button16);
	});
});
