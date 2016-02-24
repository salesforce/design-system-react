import {Lib, Popover} from 'design-system-jquery';

import $ from 'jquery';

// SAMPLE CONTROL CODE -->

$(function () {
	const popoverProperties0 = {
		content: '<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>',
		trigger: 'hover',
		positionedTargetVerticalAttachment: 'right',
		constrainedToElement: document.querySelector('body')
	};
	const popoverProperties1 = {
		content: '<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>',
		trigger: 'click',
		positionedTargetVerticalAttachment: 'right',
		constrainedToElement: document.querySelector('body')
	};
	const popoverProperties2 = {
		content: '<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>',
		trigger: 'focus',
		positionedTargetVerticalAttachment: 'right',
		constrainedToElement: document.querySelector('body')
	};
	const popover0 = new Popover($('#popover__popover--0'), popoverProperties0);
	const popover1 = new Popover($('#popover__popover--1'), popoverProperties1);
	const popover2 = new Popover($('#popover__popover--2'), popoverProperties2);

	void(popover0);
	void(popover1);
	void(popover2);
});

// <-- SAMPLE CONTROL CODE
