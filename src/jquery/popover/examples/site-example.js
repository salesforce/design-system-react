import {Lib, Popover} from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const popover = new Popover($('#popover-jquery-toggle'), {
		content: '<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>',
		trigger: 'hover',
		positionedTargetVerticalAttachment: 'right',
		constrainedToElement: $('body')
	});
	
	void(popover);
});

