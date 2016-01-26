import { Lib, Badge } from 'design-system-jquery';
import * as controlTemplate from './template-control';
import * as demoControlsTemplate from './template-demo-controls';
import { sampleData } from 'design-system-utilities';

const $ = Lib.global.jQuery || Lib.global.$;

const COMPONENT_NAME = 'badge';
const COMPONENT_DISPLAY_NAME = 'Badges';
const COMPONENT_SAMPLE_DATA_ACCESSOR = 'badge';
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
			'text',
			'theme'
		];

		$.each(defaultComponentProperties, function (index2, value2) {
			if ( typeof value[value2] !== 'undefined') {
				if ( value[value2] !== '' ) {
					thisComponentProperties[value2] = value[value2];
				}
			}
		});
		components[COMPONENT_NAME + index] = new Badge($('#' + COMPONENT_NAME + '-jquery-control ' + value.domNode), thisComponentProperties);
		void (components[COMPONENT_NAME + index]);
	});


	// Example of instantiating without an element and subsequently appending
	const badge15 = new Badge({
		text: 'Appended',
		theme: 'inverse'
	});
	badge15.appendTo($('#badge-jquery-control .badge15'));
	void(badge15);
});
