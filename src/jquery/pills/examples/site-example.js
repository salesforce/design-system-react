import { Lib, Pills as Component } from 'design-system-jquery';
import * as controlTemplate from './template-control';
import * as demoControlsTemplate from './template-demo-controls';
import { sampleData } from 'design-system-utilities';

const $ = Lib.global.jQuery || Lib.global.$;

const COMPONENT_NAME = 'pills';
const COMPONENT_DISPLAY_NAME = 'Pills';
const SAMPLE_DATA_ACCESSOR = 'pills';
const SAMPLE_DATA = sampleData[SAMPLE_DATA_ACCESSOR];
const SAMPLE_DATA_DEFAULT = SAMPLE_DATA.default;

$(function () {
	$('#' + COMPONENT_NAME + '-jquery-control')
		.attr('data-component-name', COMPONENT_NAME)
		.attr('data-component-display-name', COMPONENT_DISPLAY_NAME)
		.append(controlTemplate.template({
			componentCollection: SAMPLE_DATA_DEFAULT,
			componentName: COMPONENT_NAME,
			componentDisplayName: COMPONENT_DISPLAY_NAME
		})
	);

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
	$.each(SAMPLE_DATA, function (index, value) {
		const thisComponentProperties = {};
		if (typeof value !== 'undefined') {
			if (index === 'default') {
				$.each(SAMPLE_DATA_DEFAULT, function (index2, value2) {
					if (typeof value2 !== 'undefined') {
						if (index2 !== '') {
							thisComponentProperties[index2] = value2;
						}
					}
				});
			}
		}
		components[COMPONENT_NAME + index] = new Component($('#' + COMPONENT_NAME + '-jquery-control #component-wrapper-' + COMPONENT_NAME + '__' + COMPONENT_NAME), thisComponentProperties);
		void (components[COMPONENT_NAME + index]);
		// Log on change
		$('#component-wrapper-' + COMPONENT_NAME + '__' + COMPONENT_NAME).on('changed', function (event, data) {
			Lib.log('changed', data);
		});
	});
});
