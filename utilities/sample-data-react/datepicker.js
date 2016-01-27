const collection = [
	{
		range: [new Date(), new Date('2030')],
		inputLabel: 'Pick a Date',
		multiSelect: true
	},
	{
		range: [new Date(), new Date('2030')],
		inputLabel: 'Pick another date',
		multiSelect: false
	}
];


module.exports = {
	default: {
		collection: collection
	}
};
