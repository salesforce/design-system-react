import * as Lib from '../../lib/lib';
import Pillbox from './pillbox';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const pillbox = new Pillbox($('#pillbox1'), {
		selection: [
			{
				text: 'test1',
				id: 1
			},
			{
				text: 'test2',
				id: 2
			}
		]
	});
	
	void(pillbox);
});

