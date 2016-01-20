import {Lib, Combobox} from 'design-system-jquery';
import {sampleData} from 'design-system-utilities';
import * as controlTemplate from './template-control';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	$('#combobox-jquery-control').append(controlTemplate.template);
	const combobox1 = new Combobox($('#combobox-jquery-control .combobox1'), {
		collection: sampleData.picklist.default.collection,
		resize: 'auto',
		selection: { value: '1' }
	});

	// Log on change
	$('#combobox-jquery-control .combobox1').on('changed', function (event, data) {
		Lib.log('changed', data);
	});

	void(combobox1);
});
