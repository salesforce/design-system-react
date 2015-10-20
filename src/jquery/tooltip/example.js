import * as Lib from '../../lib/lib';
import Tooltip from './tooltip';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const tooltip = new Tooltip($('#tooltip-jquery-toggle'), {
		content: '<span>This is a tip!</span>',
		trigger: 'hover',
		position: 'right',
		container: $('body')
	});
	
	void(tooltip);
});

