import {Lib, Dropdown} from 'design-system-jquery';
import {sampleData} from 'design-system-utilities';
import * as controlTemplate from './template-control';
import * as demoControlsTemplate from './template-demo-controls';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	$('#dropdown-jquery-control').append(controlTemplate.template);
	$('#dropdown-jquery-demo-controls').append(demoControlsTemplate.template);
	const dropdown = new Dropdown($('#dropdown-jquery-control .dropdown1'), {
		collection: sampleData.dropdown.default.collection,
		selection: { value: '1' }
	});

	// events
	$('#dropdown-jquery-control .dropdown1').on('rendered', function (event, data) {
		Lib.log('rendered', data);
	});
	$('#dropdown-jquery-control .dropdown1').on('changed', function (event, data) {
		Lib.log('changed', data);
	});

	void(dropdown);
});
