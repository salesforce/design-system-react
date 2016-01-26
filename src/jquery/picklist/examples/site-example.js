import { Lib, Picklist } from 'design-system-jquery';
import * as controlTemplate from './template-control';
import * as demoControlsTemplate from './template-demo-controls';
import { sampleData } from 'design-system-utilities';

const $ = Lib.global.jQuery || Lib.global.$;

const COMPONENT_NAME = 'picklist';
const COMPONENT_DISPLAY_NAME = 'Picklists';
const COMPONENT_COLLECTION = sampleData.COMPONENT_NAME.default.collection;

$(function () {
	$('#' + COMPONENT_NAME + '-jquery-control')
	.attr(
		'data-component-name', COMPONENT_NAME
	).attr(
		'data-component-display-name', COMPONENT_DISPLAY_NAME
	).append(
		controlTemplate.template({
			componentColleciton: COMPONENT_COLLECTION,
			componentName: COMPONENT_NAME,
			componentDisplayName: COMPONENT_DISPLAY_NAME
		}
	));

	$('#' + COMPONENT_NAME + '-jquery-demo-controls')
		.attr('data-component-name', COMPONENT_NAME)
		.attr('data-component-display-name', COMPONENT_DISPLAY_NAME)
		.append(demoControlsTemplate.template({
			componentColleciton: COMPONENT_COLLECTION,
			componentName: COMPONENT_NAME,
			componentDisplayName: COMPONENT_DISPLAY_NAME
		})
	);

	const picklist = new Picklist($('#' + COMPONENT_NAME + '-jquery-control .' + COMPONENT_NAME + '1'), {
		collection: sampleData.picklist.default.collection,
		selection: {
			value: '1'
		}
	});

	$('#' + COMPONENT_NAME + '-jquery-control .' + COMPONENT_NAME + '1').on('changed', function (event, data) {
		Lib.log('changed', data);
	});

	void (picklist);
});
