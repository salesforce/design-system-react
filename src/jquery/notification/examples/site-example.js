import { Lib, Notification } from 'design-system-jquery';
import * as controlTemplate from './template-control';
import * as demoControlsTemplate from './template-demo-controls';
import { sampleData } from 'design-system-utilities';

const $ = Lib.global.jQuery || Lib.global.$;

const COMPONENT_NAME = 'notification';
const COMPONENT_DISPLAY_NAME = 'Notifications';
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

	const notification1 = new Notification($('#' + COMPONENT_NAME + '-jquery-control #component-wrapper-' + COMPONENT_NAME + '__1'), {
		text: 'Base System Alert'
	});
	const notification2 = new Notification($('#' + COMPONENT_NAME + '-jquery-control #component-wrapper-' + COMPONENT_NAME + '__2'), {
		text: 'Scheduled Maintenance Notification: Sunday March 15, 8:00 AM-10:00 PST',
		theme: 'success'
	});
	const notification3 = new Notification($('#' + COMPONENT_NAME + '-jquery-control #component-wrapper-' + COMPONENT_NAME + '__3'), {
		text: 'Your browser is currently not supported. Your Salesforce may be degraded.',
		theme: 'error'
	});
	const notification4 = new Notification($('#' + COMPONENT_NAME + '-jquery-control #component-wrapper-' + COMPONENT_NAME + '__4'), {
		text: 'You are in offline mode.',
		theme: 'offline'
	});

	void(notification1);
	void(notification2);
	void(notification3);
	void(notification4);
});
