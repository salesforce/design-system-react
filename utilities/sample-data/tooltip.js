const collection = [
	{
		content: 'I should show myself on click.',
		trigger: 'click',
		position: 'right',
		isOpen: false,
		modal: false,
		container: document.querySelector('body')
	},
	{
		content: 'I should show up on hover.',
		trigger: 'hover',
		position: 'bottom',
		isOpen: false,
		modal: false,
		container: document.querySelector('body')
	},
	{
		content: 'I will appear on focus.',
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
