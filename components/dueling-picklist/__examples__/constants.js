export const fruitOptions = 'Apple Banana Orange Pear Watermelon'
	.split(' ')
	.map((fruit, i) => ({
		id: `${i}`,
		label: fruit,
	}));

export const ids = {
	picklistGroupLabel: 'picklist-label',
	dragLiveRegion: 'drag-live-region',
	optionDragLabel: 'option-drag-label',
	optionsLabel: 'options-label',
	selectedLabel: 'selected-label',
}