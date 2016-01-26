const collection = [
	{
		labelText: 'Radio Group Label',
		name: 'rads',
		radios: [
			{
				text: 'Checked',
				value: 'value9',
				checked: true
			},
			{
				text: 'Unchecked',
				value: 'value10',
				checked: false
			},
			{
				text: 'Unchecked Disabled',
				value: 'value11',
				checked: false,
				disabled: true
			}
		]
	}
];

module.exports = {
	default: {
		collection: collection
	}
};
