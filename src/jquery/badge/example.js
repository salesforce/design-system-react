import * as Lib from '../../lib/lib';
import Badge from './badge';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	// badge
	const badge1 = new Badge($('#badge'), {
		'text': 'label1'
	});

	// badge (default)
	const badge2 = new Badge($('#badge-default'), {
		text: 'label2',
		theme: 'default'
	});

	// badge (shade)
	const badge3 = new Badge($('#badge-shade'), {
		text: 'label3',
		theme: 'shade'
	});

	// badge (inverse)
	const badge4 = new Badge($('#badge-inverse'), {
		text: 'label4',
		theme: 'inverse'
	});

	void(badge1);
	void(badge2);
	void(badge3);
	void(badge4);
});
