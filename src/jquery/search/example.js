import * as Lib from '../../lib/lib';
import Search from './search';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	$('#search')
		.search()
		.on('searched.fu.search', function (e, text) {
			if (console && console.log) {
				console.log('Search: ' + text);
			}
		})
		.on('cleared.fu.search', function () {
			if (console && console.log) {
				console.log('Search box cleared');
			}
		})
	;

	$('#searchEnable').on('click', function () {
		$('#search').search('enable');
	});

	$('#searchDisable').on('click', function () {
		$('#search').search('disable');
	});
});

void(Search);
