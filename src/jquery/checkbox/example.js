import * as Lib from '../../lib/lib';
import Checkbox from './checkbox';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	// "declarative" control
	$('#myCheckbox1').checkbox();	// TODO: ask how I should determine initial state from classes / data-attributes

	// "imperative" control
	$('#myCheckbox2').checkbox({
		highlight: true,
		inline: false
	});

	// new api control

	// TODO: ask what ties it to a DOM element?

	void Checkbox;
});
