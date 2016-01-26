import { Lib } from 'design-system-jquery';

const $ = Lib.global.jQuery || Lib.global.$;

const collection = [
	{
		content: '<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>',
		trigger: 'hover',
		positionedTargetVerticalAttachment: 'right',
		constrainedToElement: $('body')
	},
	{
		content: '<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>',
		trigger: 'click',
		positionedTargetVerticalAttachment: 'right',
		constrainedToElement: $('body')
	},
	{
		content: '<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>',
		trigger: 'focus',
		positionedTargetVerticalAttachment: 'right',
		constrainedToElement: $('body')
	}
];

module.exports = {
	default: {
		collection: collection
	}
};
