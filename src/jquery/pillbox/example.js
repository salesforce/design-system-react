import * as Lib from '../../lib/lib';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	$('#pillbox1').pillbox({
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
});

