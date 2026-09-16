import { useState } from 'react';
import IconSettings from '../../icon-settings';
import Radio from '../';

export default {
	title: 'Components/Radio',
	component: Radio,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['base', 'button-group', 'visual-picker'],
		},
		disabled: { control: 'boolean' },
		checked: { control: 'boolean' },
	},
};

// Default radio
export const Default = {
	args: {
		labels: { label: 'Radio Option' },
		name: 'default-radio',
	},
};

// Radio group example
const RadioGroupExample = () => {
	const [selected, setSelected] = useState('option1');

	return (
		<fieldset className="slds-form-element">
			<legend className="slds-form-element__legend slds-form-element__label">
				Select an option
			</legend>
			<div className="slds-form-element__control">
				<Radio
					labels={{ label: 'Option 1' }}
					name="radio-group"
					value="option1"
					checked={selected === 'option1'}
					onChange={() => setSelected('option1')}
				/>
				<Radio
					labels={{ label: 'Option 2' }}
					name="radio-group"
					value="option2"
					checked={selected === 'option2'}
					onChange={() => setSelected('option2')}
				/>
				<Radio
					labels={{ label: 'Option 3' }}
					name="radio-group"
					value="option3"
					checked={selected === 'option3'}
					onChange={() => setSelected('option3')}
				/>
			</div>
		</fieldset>
	);
};

export const RadioGroup = {
	render: () => <RadioGroupExample />,
};

// Disabled radio
export const Disabled = {
	args: {
		labels: { label: 'Disabled Option' },
		name: 'disabled-radio',
		disabled: true,
	},
};

// Checked radio
export const Checked = {
	args: {
		labels: { label: 'Checked Option' },
		name: 'checked-radio',
		checked: true,
		onChange: () => {},
	},
};

// With assistive text
export const WithAssistiveText = {
	args: {
		labels: { label: 'Visible Label' },
		assistiveText: { label: 'Additional context for screen readers' },
		name: 'assistive-radio',
	},
};
