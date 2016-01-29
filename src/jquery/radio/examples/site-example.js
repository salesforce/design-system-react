import { Lib, Radios as Component } from 'design-system-jquery';
import * as controlTemplate from './template-control';
import * as demoControlsTemplate from './template-demo-controls';
import { sampleData } from 'design-system-utilities';

const $ = Lib.global.jQuery || Lib.global.$;

const COMPONENT_NAME = 'radio';
const COMPONENT_DISPLAY_NAME = 'Radio';
const SAMPLE_DATA_ACCESSOR = 'radio';
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

	$.each(SAMPLE_DATA_DEFAULT, function (index, value) {
		const thisComponentProperties = {};
		const defaultComponentProperties = [
			'labelText',
			'name',
			'radios'
		];
		$.each(defaultComponentProperties, function (index2, value2) {
			if (typeof value[value2] !== 'undefined') {
				if (value[value2] !== '') {
					thisComponentProperties[value2] = value[value2];
				}
			}
		});

		components[COMPONENT_NAME + index] = new Component($('#' + COMPONENT_NAME + '-jquery-control'), thisComponentProperties);
		void (components[COMPONENT_NAME + index]);
		// Log on change
		$('#component-wrapper-' + COMPONENT_NAME + '__' + COMPONENT_NAME).on('changed', function (event, data) {
			Lib.log('changed', data);
		});
	});
});
