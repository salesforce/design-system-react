import {Lib, Tooltip} from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

// SAMPLE CONTROL CODE -->

$(function () {
	const tooltipProperties0 = {
		content: 'I should show myself on click.', trigger: 'click', position: 'right', isOpen: false, modal: false, container: document.querySelector('body')
	};
	const tooltipProperties1 = {
		content: 'I should show up on hover.', trigger: 'hover', position: 'bottom', isOpen: false, modal: false, container: document.querySelector('body')
	};
	const tooltipProperties2 = {
		content: 'I will appear on focus.', trigger: 'focus', position: 'left', isOpen: false, modal: false, container: document.querySelector('body')
	};

	const tooltip0 = new Tooltip($('#tooltip__tooltip--0'), tooltipProperties0);
	const tooltip1 = new Tooltip($('#tooltip__tooltip--1'), tooltipProperties1);
	const tooltip2 = new Tooltip($('#tooltip__tooltip--2'), tooltipProperties2);

	void(tooltip0);
	void(tooltip1);
	void(tooltip2);
});

// <-- SAMPLE CONTROL CODE
