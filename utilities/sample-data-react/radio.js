const labelText = 'React Radios Group';
const name = 'react-radios';
const collection = [
	{
		text: 'Checked',
		value: 'Griffendor',
		checked: true,
		disabled: false
	},
	{
		text: 'Unchecked',
		value: 'Slytherin',
		checked: false,
		disabled: false
	},
	{
		text: 'Unchecked Disabled',
		value: 'Huffelpuff',
		checked: false,
		disabled: true
	}
];

module.exports = {
	default: {
		labelText: labelText,
		name: name,
		collection: collection
	}
};
