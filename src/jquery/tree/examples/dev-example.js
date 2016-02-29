import { Lib, Tree as Component } from 'design-system-jquery';
import * as controlTemplate from './template-control';
import * as demoControlsTemplate from './template-demo-controls';
import { sampleData } from 'design-system-utilities';

import $ from 'jquery';

const COMPONENT_NAME = 'tree';
const COMPONENT_DISPLAY_NAME = 'Tree';
const SAMPLE_DATA_ACCESSOR = 'tree';
const SAMPLE_DATA = sampleData[SAMPLE_DATA_ACCESSOR];

$(function () {
	$('#' + COMPONENT_NAME + '-jquery-control')
		.attr('data-component-name', COMPONENT_NAME)
		.attr('data-component-display-name', COMPONENT_DISPLAY_NAME)
		.append(controlTemplate.template({
			componentName: COMPONENT_NAME,
			componentDisplayName: COMPONENT_DISPLAY_NAME
		})
	);

	$('#' + COMPONENT_NAME + '-jquery-demo-controls')
		.attr('data-component-name', COMPONENT_NAME)
		.attr('data-component-display-name', COMPONENT_DISPLAY_NAME)
		.append(demoControlsTemplate.template({
			componentName: COMPONENT_NAME,
			componentDisplayName: COMPONENT_DISPLAY_NAME
		})
	);

	const components = [];
	$.each(SAMPLE_DATA, function (index, value) {
		const thisComponentProperties = {};
		if (typeof value !== 'undefined') {
			if (index === 'default') {
				$.each(SAMPLE_DATA.default, function (index2, value2) {
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
