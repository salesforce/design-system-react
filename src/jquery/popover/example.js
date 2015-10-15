import * as Lib from '../../lib/lib';
import Popover from './popover';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const popover = new Popover($('#popover'), {
		header: 'Sample Header',
		content: '<span>This is some sample content!</span>'
	});
	
	void(popover);
});

