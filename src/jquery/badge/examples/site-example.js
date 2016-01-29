import { Lib, Badge as Component } from 'design-system-jquery';
import * as controlTemplate from './template-control';
import * as demoControlsTemplate from './template-demo-controls';
import { sampleData } from 'design-system-utilities';

const $ = Lib.global.jQuery || Lib.global.$;

const COMPONENT_NAME = 'badge';
const COMPONENT_DISPLAY_NAME = 'Badges';
const SAMPLE_DATA_ACCESSOR = 'badge';
const SAMPLE_DATA = sampleData[SAMPLE_DATA_ACCESSOR];
const SAMPLE_DATA_DEFAULT = SAMPLE_DATA.default;

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
		if (typeof value !== 'undefined') {
			if (typeof value === 'object') {
				$.each(value, function (index2, value2) {
					thisComponentProperties[index2] = value2;
				});
			}
		}
		components[COMPONENT_NAME + index] = new Component(
			$(
				'#'
				+ COMPONENT_NAME
				+ '-jquery-control #component-wrapper-'
				+ COMPONENT_NAME
				+ '__'
				+ COMPONENT_NAME
				+ '-'
				+ thisComponentProperties.theme
			),
			thisComponentProperties
		);
		void (components[COMPONENT_NAME + index]);
	});

	// Example of instantiating without an element and subsequently appending
	const badge15 = new Component({
		text: 'Appended',
		theme: 'inverse'
	});
	badge15.appendTo($('#badge-jquery-control .badge15'));
	void(badge15);
});
