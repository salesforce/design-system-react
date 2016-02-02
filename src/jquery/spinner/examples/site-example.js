import {Lib, Spinner} from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

// SAMPLE CONTROL CODE -->

$(function () {
	// const spinner = new Spinner($('#spinner'));
	const spinner1 = new Spinner($('#spinner__spinner--0'), {
		size: 'large',
		theme: 'base'
	});
	const spinner2 = new Spinner($('#spinner__spinner--1'), {
		size: 'medium',
		theme: 'base'
	});
	const spinner3 = new Spinner($('#spinner__spinner--2'), {
		size: 'small',
		theme: 'base'
	});

	const spinner4 = new Spinner($('#spinner__spinner--3'), {
		size: 'large',
		theme: 'brand'
	});
	const spinner5 = new Spinner($('#spinner__spinner--4'), {
		size: 'medium',
		theme: 'brand'
	});
	const spinner6 = new Spinner($('#spinner__spinner--5'), {
		size: 'small',
		theme: 'brand'
	});

	const spinner7 = new Spinner($('#spinner__spinner--6'), {
		size: 'large',
		theme: 'inverse'
	});
	const spinner8 = new Spinner($('#spinner__spinner--7'), {
		size: 'medium',
		theme: 'inverse'
	});
	const spinner9 = new Spinner($('#spinner__spinner--8'), {
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

// <-- SAMPLE CONTROL CODE
