import {Lib} from 'design-system-jquery';

import Badge from './badge';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const badge1 = new Badge($('#badge-jquery-control .badge1'), {
		'text': 'badge'
	});

	const badge2 = new Badge($('#badge-jquery-control .badge2'), {
		text: 'default',
		theme: 'default'
	});

	const badge3 = new Badge($('#badge-jquery-control .badge3'), {
		text: 'shade',
		theme: 'shade'
	});

	// Example of instantiating without an element and subsequently appending
	const badge4 = new Badge({
		text: 'inverse',
		theme: 'inverse'
	});
	badge4.appendTo($('#badge-jquery-control .badge4'));

	void(badge1);
	void(badge2);
	void(badge3);
	void(badge4);
});
