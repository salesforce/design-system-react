import { Lib, Tooltip as Component } from 'design-system-jquery';
import * as controlTemplate from './template-control';
import * as demoControlsTemplate from './template-demo-controls';
import { sampleData } from 'design-system-utilities';

const $ = Lib.global.jQuery || Lib.global.$;

const COMPONENT_NAME = 'tooltip';
const COMPONENT_DISPLAY_NAME = 'Tooltip';
const COMPONENT_SAMPLE_DATA_ACCESSOR = 'tooltip';
const COMPONENT_COLLECTION = sampleData[COMPONENT_SAMPLE_DATA_ACCESSOR].default.collection;

$(function () {
	$('#' + COMPONENT_NAME + '-jquery-control')
		.attr('data-component-name', COMPONENT_NAME)
		.attr('data-component-display-name', COMPONENT_DISPLAY_NAME)
		.append(controlTemplate.template({
			componentCollection: COMPONENT_COLLECTION,
			componentName: COMPONENT_NAME,
			componentDisplayName: COMPONENT_DISPLAY_NAME
		})
	);

	$('#' + COMPONENT_NAME + '-jquery-demo-controls')
		.attr('data-component-name', COMPONENT_NAME)
		.attr('data-component-display-name', COMPONENT_DISPLAY_NAME)
		.append(demoControlsTemplate.template({
			componentCollection: COMPONENT_COLLECTION,
			componentName: COMPONENT_NAME,
			componentDisplayName: COMPONENT_DISPLAY_NAME
		})
	);

	const components = [];

	$.each(COMPONENT_COLLECTION, function (index, value) {
		const thisComponentProperties = {};
		const defaultComponentProperties = [
			'content',
			'trigger',
			'position',
			'container'
		];
		$.each(defaultComponentProperties, function (index2, value2) {
			if (typeof value[value2] !== 'undefined') {
				if (value[value2] !== '') {
					thisComponentProperties[value2] = value[value2];
				}
			}
		});
		components[COMPONENT_NAME + index] = new Component($('#' + COMPONENT_NAME + '-jquery-control #component-wrapper-' + COMPONENT_NAME + '__' + COMPONENT_NAME + '__' + index), thisComponentProperties);
		void (components[COMPONENT_NAME + index]);
		// Log on change
		$('#component-wrapper-' + COMPONENT_NAME + '__' + COMPONENT_NAME + '__' + index).on('changed', function (event, data) {
			Lib.log('changed', data);
		});
	});
});
