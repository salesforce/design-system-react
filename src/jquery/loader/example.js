import * as Lib from '../../lib/lib';
import Loader from './loader';

const $ = Lib.global.jQuery || Lib.global.$;

const exampleOptions = [
	{ frame: 5 },
	{ delay: 500 },
	{ begin: 3, end: 6 }
];

$(function () {
	// Imperative
	$('.imperative .loader1').loader();
	$('.imperative .loader2').loader(exampleOptions[0]);
	$('.imperative .loader3').loader(exampleOptions[1]);
	$('.imperative .loader4').loader(exampleOptions[2]);
	$('.imperative .svg').loader({ 'svg': true });

	// New syntax
	const loader1 = new Loader($('.new-api .loader1'));
	const loader2 = new Loader($('.new-api .loader2'), exampleOptions[0]);
	const loader3 = new Loader($('.new-api .loader3'), exampleOptions[1]);
	const loader4 = new Loader($('.new-api .loader4'), exampleOptions[2]);
	const loaderSVG = new Loader($('.new-api .svg'), { 'svg': true });

	void(loader1);
	void(loader2);
	void(loader3);
	void(loader4);
	void(loaderSVG);
});
