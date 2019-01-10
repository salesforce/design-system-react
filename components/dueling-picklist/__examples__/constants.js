export const fruitOptions = 'Apple Banana Orange Pear Watermelon'.split(' ').map((fruit, i) => ({
	id: i + '',
	label: fruit,
}));