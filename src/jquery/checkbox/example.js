import * as Lib from '../../lib/lib';
import Checkbox from './checkbox';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	// "declarative" control (the others use data-initialize)
	$('#myCheckbox1').checkbox();

	// "imperative" controls
	$('#myCheckbox2').checkbox({
		text: 'Custom checkbox unchecked on initialization',
		toggleSelector: '.toggleSelector2'
	});
	$('#myCheckbox3').checkbox({
		checked: true,
		disabled: true,
		text: 'Custom checkbox checked disabled on initialization'
	});
	$('#myCheckbox4').checkbox({
		checked: true,
		highlight: true,
		inline: true,
		text: 'Custom inline checkbox checked on initialization'
	});
	$('#myCheckbox5').checkbox({
		disabled: true,
		inline: true,
		text: 'Custom inline checkbox disabled on initialization'
	});

	// new api controls
	const checkboxNA1 = new Checkbox($('#myCheckbox6'), {
		text: 'Custom checkbox unchecked on initialization',
		toggleSelector: '.toggleSelector3'
	});
	const checkboxNA2 = new Checkbox($('#myCheckbox7'), {
		checked: true,
		disabled: true,
		text: 'Custom checkbox checked disabled on initialization'
	});
	const checkboxNA3 = new Checkbox($('#myCheckbox8'), {
		checked: true,
		highlight: true,
		inline: true,
		text: 'Custom inline checkbox checked on initialization'
	});
	const checkboxNA4 = new Checkbox($('#myCheckbox9'), {
		disabled: true,
		inline: true,
		text: 'Custom inline checkbox disabled on initialization'
	});

	void checkboxNA1;
	void checkboxNA2;
	void checkboxNA3;
	void checkboxNA4;
});
