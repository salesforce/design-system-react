import {Lib, Checkbox} from 'design-system-jquery';
import * as controlTemplate from './template-control';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	$('#checkbox-jquery-control').append(controlTemplate.template);

	// new api controls
	const checkbox1 = new Checkbox($('#checkbox1'), {
		text: 'Checked',
		value: 'value9',
		checked: true
	});

	const checkbox2 = new Checkbox($('#checkbox2'), {
		text: 'Unchecked',
		value: 'value10',
		checked: false
	});

	void checkbox1;
	void checkbox2;
});
