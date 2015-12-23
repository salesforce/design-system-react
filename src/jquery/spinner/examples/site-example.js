import {Lib, Spinner} from 'design-system-jquery';

// require('../../../scss/components/grid-system/flavors/automatic-sizing/index.scss');
// require('../../../scss/components/grid-system/flavors/horizontal-alignment-spread/index.scss');
// require('../../../scss/components/grid-system/flavors/vertical-alignment/index.scss');

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	// const spinner = new Spinner($('#spinner'));
	const spinner1 = new Spinner($('#spinner-jquery-control .spinner1'), {
		size: 'large',
		theme: 'base'
	});
	const spinner2 = new Spinner($('#spinner-jquery-control .spinner2'), {
		size: 'medium',
		theme: 'base'
	});
	const spinner3 = new Spinner($('#spinner-jquery-control .spinner3'), {
		size: 'small',
		theme: 'base'
	});

	const spinner4 = new Spinner($('#spinner-jquery-control .spinner4'), {
		size: 'large',
		theme: 'brand'
	});
	const spinner5 = new Spinner($('#spinner-jquery-control .spinner5'), {
		size: 'medium',
		theme: 'brand'
	});
	const spinner6 = new Spinner($('#spinner-jquery-control .spinner6'), {
		size: 'small',
		theme: 'brand'
	});

	const spinner7 = new Spinner($('#spinner-jquery-control .spinner7'), {
		size: 'large',
		theme: 'inverse'
	});
	const spinner8 = new Spinner($('#spinner-jquery-control .spinner8'), {
		size: 'medium',
		theme: 'inverse'
	});
	const spinner9 = new Spinner($('#spinner-jquery-control .spinner9'), {
		size: 'small',
		theme: 'inverse'
	});

	void(spinner1);
	void(spinner2);
	void(spinner3);
	void(spinner4);
	void(spinner5);
	void(spinner6);
	void(spinner7);
	void(spinner8);
	void(spinner9);
});
