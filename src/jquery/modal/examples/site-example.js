import { Lib, Modal as Component } from 'design-system-jquery';
import * as controlTemplate from './template-control';
import * as controlLauncherTemplate from './template-control-launcher';
import * as demoControlsTemplate from './template-demo-controls';
import { sampleData } from 'design-system-utilities';

const $ = Lib.global.jQuery || Lib.global.$;

const COMPONENT_NAME = 'modal';
const COMPONENT_DISPLAY_NAME = 'Modal';
const COMPONENT_SAMPLE_DATA_ACCESSOR = 'modal';
const COMPONENT_COLLECTION = sampleData[COMPONENT_SAMPLE_DATA_ACCESSOR].default.collection;

$(function () {
	$('#' + COMPONENT_NAME + '-jquery-control')
		.attr('data-component-name', COMPONENT_NAME)
		.attr('data-component-display-name', COMPONENT_DISPLAY_NAME)
		.append(
			controlTemplate.template({
				componentCollection: COMPONENT_COLLECTION,
				componentName: COMPONENT_NAME,
				componentDisplayName: COMPONENT_DISPLAY_NAME
			})
		)
		.before(
			controlLauncherTemplate.template({
				componentCollection: COMPONENT_COLLECTION,
				componentName: COMPONENT_NAME,
				componentDisplayName: COMPONENT_DISPLAY_NAME
			})
		)
	;

	$('#' + COMPONENT_NAME + '-jquery-demo-controls')
		.attr('data-component-name', COMPONENT_NAME)
		.attr('data-component-display-name', COMPONENT_DISPLAY_NAME)
		.append(
			demoControlsTemplate.template({
				componentCollection: COMPONENT_COLLECTION,
				componentName: COMPONENT_NAME,
				componentDisplayName: COMPONENT_DISPLAY_NAME
			})
		)
	;

	const components = [];

	$.each(COMPONENT_COLLECTION, function (index, value) {
		const thisComponentProperties = {};
		const defaultComponentProperties = [
			'headerText',
			'headerTagline',
			'headerTextSize',
			'secondaryButtonText',
			'primaryButtonText'
		];
		$.each(defaultComponentProperties, function (index2, value2) {
			if (typeof value[value2] !== 'undefined') {
				if (value[value2] !== '') {
					thisComponentProperties[value2] = value[value2];
				}
			}
		});
		components[COMPONENT_NAME + index] = new Component($('#' + COMPONENT_NAME + '-jquery-control'), thisComponentProperties);

		components[COMPONENT_NAME + index].on('close', function () {
			$('#' + COMPONENT_NAME + '-jquery-control-launch').focus();
		});

		components[COMPONENT_NAME + index].on('primary', function () {
			console.log('Save primary modal');
			$('#' + COMPONENT_NAME + '-jquery-control-launch').focus();
		});

		components[COMPONENT_NAME + index].on('secondary', function () {
			components[COMPONENT_NAME + index].close();
			$('#' + COMPONENT_NAME + '-jquery-control-launch').focus();
		});

		$('#' + COMPONENT_NAME + '-jquery-control-launch').on('click', function () {
			components[COMPONENT_NAME + index].open();
		});
		void (components[COMPONENT_NAME + index]);
	});
});
