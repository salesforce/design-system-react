import * as Lib from '../../lib/lib';
import Checkbox from './checkbox';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	// new api controls
	const checkboxNA1 = new Checkbox($('#myCheckbox'), {
		text: 'Custom checkbox unchecked on initialization',
		value: 'value9'
	});

	void checkboxNA1;
});
