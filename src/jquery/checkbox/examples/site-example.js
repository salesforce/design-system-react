import { Lib, Checkbox as Component } from 'design-system-jquery';
import * as controlTemplate from './template-control';
import { sampleData } from 'design-system-utilities';

const $ = Lib.global.jQuery || Lib.global.$;
const COMPONENT_NAME = 'checkbox';
const COMPONENT_DISPLAY_NAME = 'Checkboxes';
const SAMPLE_DATA_ACCESSOR = 'checkbox';
const SAMPLE_DATA = sampleData[SAMPLE_DATA_ACCESSOR];
const SAMPLE_DATA_DEFAULT = SAMPLE_DATA.default;
const SAMPLE_DATA_COLLECTION = SAMPLE_DATA_DEFAULT.collection;

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

	const components = [];
	$.each(SAMPLE_DATA_COLLECTION, function (index, value) {
		const thisComponentProperties = {};
		if (typeof value !== 'undefined') {
			$.each(value, function (index2, value2) {
				if (typeof value2 !== 'undefined') {
					if (index2 !== '') {
						thisComponentProperties[index2] = value2;
					}
				}
			});
		}
		components[COMPONENT_NAME + index] = new Component($('#component-wrapper-' + COMPONENT_NAME + '__' + COMPONENT_NAME + '--' + index), thisComponentProperties);
		void (components[COMPONENT_NAME + index]);
	});
});
