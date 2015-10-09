import * as Lib from '../../lib/lib';
import Badge from './badge';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	// badge
	const badge1 = new Badge($('#badge'), {
		text: 'label',
		theme: 'base'
	});

	// badge (default)
	const badge2 = new Badge($('#badge-default'), {
		text: 'label',
		theme: 'default'
	});

	// badge (shade)
	const badge3 = new Badge($('#badge-shade'), {
		text: 'label',
		theme: 'shade'
	});

	// badge (inverse)
	const badge4 = new Badge($('#badge-inverse'), {
		text: 'label',
		theme: 'inverse'
	});

	void(badge1);
	void(badge2);
	void(badge3);
	void(badge4);
});
