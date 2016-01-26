import { Lib } from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

const collection = [
	{
		content: '<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>',
		trigger: 'hover',
		position: 'right',
		container: $('body')
	},
	{
		content: '<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>',
		trigger: 'click',
		position: 'right',
		container: $('body')
	},
	{
		content: '<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>',
		trigger: 'focus',
		position: 'right',
		container: $('body')
	}
];

module.exports = {
	default: {
		collection: collection
	}
};
