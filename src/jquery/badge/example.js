import * as Lib from '../../lib/lib';
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

	const badge4 = new Badge($('#badge-jquery-control .badge4'), {
		text: 'inverse',
		theme: 'inverse'
	});

	void(badge1);
	void(badge2);
	void(badge3);
	void(badge4);
});
