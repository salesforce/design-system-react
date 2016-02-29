import {Lib, Search} from 'design-system-jquery';

import $ from 'jquery';

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
