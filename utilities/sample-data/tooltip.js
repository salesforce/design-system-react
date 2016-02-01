const collection = [
	{
		content: '<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>',
		trigger: 'click',
		position: 'right',
		isOpen: false,
		modal: false,
		container: document.querySelector('body')
	},
	{
		content: '<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>',
		trigger: 'hover',
		position: 'bottom',
		isOpen: false,
		modal: false,
		container: document.querySelector('body')
	},
	{
		content: '<span>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.</span>',
		trigger: 'focus',
		position: 'left',
		isOpen: false,
		modal: false,
		container: document.querySelector('body')
	}
];

module.exports = {
	default: {
		collection: collection
	}
};
