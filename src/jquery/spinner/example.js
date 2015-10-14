import * as Lib from '../../lib/lib';
import Spinner from './spinner';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const spinner = new Spinner($('#spinner'));
	// const spinner = new Spinner($('#spinner'), {
	// 	size: 'medium',
	// 	theme: 'base'
	// });

	void(spinner);
});
