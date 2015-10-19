import * as Lib from '../../lib/lib';
import Popover from './popover';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const popover = new Popover($('#popover-jquery-toggle'), {
		header: 'Sample Header',
		content: '<span>This is some sample content!</span>',
		trigger: 'hover',
		position: 'right',
		container: $('body')
	});
	
	void(popover);
});

