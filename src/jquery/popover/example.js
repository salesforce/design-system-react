import * as Lib from '../../lib/lib';
import Popover from './popover';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const popover = new Popover($('#popover-jquery-toggle'), {
		content: '<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>',
		trigger: 'hover',
		position: 'right',
		container: $('body')
	});
	
	void(popover);
});

