import {Lib, Tooltip} from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const tooltip = new Tooltip($('#tooltip-jquery-toggle'), {
		content: '<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>',
		trigger: 'hover',
		position: 'right',
		container: $('body')
	});
	
	void(tooltip);
});

