const collection = [
	{
		content: '<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>',
		trigger: 'hover',
		positionedTargetVerticalAttachment: 'right',
		constrainedToElement: document.querySelector('body')
	},
	{
		content: '<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>',
		trigger: 'click',
		positionedTargetVerticalAttachment: 'right',
		constrainedToElement: document.querySelector('body')
	},
	{
		content: '<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>',
		trigger: 'focus',
		positionedTargetVerticalAttachment: 'right',
		constrainedToElement: document.querySelector('body')
	}
];

module.exports = {
	default: {
		collection: collection
	}
};
