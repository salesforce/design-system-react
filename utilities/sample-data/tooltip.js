const collection = [
	{
		content: '<span>I should show myself on click.</span>',
		trigger: 'click',
		position: 'right',
		isOpen: false,
		modal: false,
		container: document.querySelector('body')
	},
	{
		content: '<span>I should show up on hover.</span>',
		trigger: 'hover',
		position: 'bottom',
		isOpen: false,
		modal: false,
		container: document.querySelector('body')
	},
	{
		content: '<span>I will appear on focus.</span>',
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
