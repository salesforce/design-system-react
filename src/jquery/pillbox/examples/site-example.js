import {Lib, Pillbox} from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	$('#pillbox-jquery-control .pillbox1').facades_pillbox({
		selection: [
			{
				text: 'item 1',
				value: 1
			},
			{
				text: 'item 2',
				value: 2
			},
			{
				text: 'item 3',
				value: 3
			}
		]
	});

	$('#pillbox-jquery-control .pillbox1').on('changed', function (evt, item) {
		console.log('pill removed', item);
	});

	void(Pillbox);
});

