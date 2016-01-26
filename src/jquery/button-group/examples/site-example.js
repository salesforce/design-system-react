import { Lib, ButtonGroup as Component } from 'design-system-jquery';
import * as controlTemplate from './template-control';
import * as demoControlsTemplate from './template-demo-controls';
import { sampleData } from 'design-system-utilities';

const $ = Lib.global.jQuery || Lib.global.$;

const COMPONENT_NAME = 'button-group';
const COMPONENT_DISPLAY_NAME = 'Button Groups';
const COMPONENT_SAMPLE_DATA_ACCESSOR = 'buttonGroup';
const COMPONENT_COLLECTION = sampleData[COMPONENT_SAMPLE_DATA_ACCESSOR].default.collection;

$(function () {
	$('#' + COMPONENT_NAME + '-jquery-control')
	.attr(
		'data-component-name', COMPONENT_NAME
	).attr(
		'data-component-display-name', COMPONENT_DISPLAY_NAME
	).append(
		controlTemplate.template({
			componentCollection: COMPONENT_COLLECTION,
			componentName: COMPONENT_NAME,
			componentDisplayName: COMPONENT_DISPLAY_NAME
		}
	));

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
			'assistiveText',
			'buttons',
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
		components[COMPONENT_NAME + index] = new Component($('#' + COMPONENT_NAME + '-jquery-control'), thisComponentProperties);
		void (components[COMPONENT_NAME + index]);
	});
});
