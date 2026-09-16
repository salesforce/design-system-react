import { useState } from 'react';
import IconSettings from '../../icon-settings';
import Radio from '../../radio';
import RadioGroup from '../';

export default {
	title: 'Components/RadioGroup',
	component: RadioGroup,
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
			options: ['base', 'button-group'],
		},
		required: { control: 'boolean' },
		disabled: { control: 'boolean' },
	},
};

// Interactive example with state
const InteractiveExample = ({ variant = 'base', ...props }) => {
	const [selected, setSelected] = useState('option1');

	return (
		<RadioGroup
			labels={{ label: 'Select an option' }}
			onChange={(e) => {
				if (e.target && e.target.value) {
					setSelected(e.target.value);
				}
			}}
			variant={variant}
			{...props}
		>
			<Radio
				labels={{ label: 'Option 1' }}
				value="option1"
				checked={selected === 'option1'}
				variant={variant === 'button-group' ? 'button-group' : 'base'}
			/>
			<Radio
				labels={{ label: 'Option 2' }}
				value="option2"
				checked={selected === 'option2'}
				variant={variant === 'button-group' ? 'button-group' : 'base'}
			/>
			<Radio
				labels={{ label: 'Option 3' }}
				value="option3"
				checked={selected === 'option3'}
				variant={variant === 'button-group' ? 'button-group' : 'base'}
			/>
		</RadioGroup>
	);
};

// Default radio group
export const Default = {
	render: () => <InteractiveExample />,
};

// Button group variant
export const ButtonGroupVariant = {
	render: () => <InteractiveExample variant="button-group" />,
};

// Required radio group
export const Required = {
	render: () => <InteractiveExample required />,
};

// Disabled radio group
export const Disabled = {
	render: () => <InteractiveExample disabled />,
};

// With error
export const WithError = {
	render: () => {
		const [selected, setSelected] = useState('');

		return (
			<RadioGroup
				labels={{
					label: 'Select an option',
					error: 'This field is required',
				}}
				onChange={(e) => {
					if (e.target && e.target.value) {
						setSelected(e.target.value);
					}
				}}
			>
				<Radio
					labels={{ label: 'Option 1' }}
					value="option1"
					checked={selected === 'option1'}
				/>
				<Radio
					labels={{ label: 'Option 2' }}
					value="option2"
					checked={selected === 'option2'}
				/>
			</RadioGroup>
		);
	},
};

// With assistive text
export const WithAssistiveText = {
	render: () => (
		<InteractiveExample
			assistiveText={{ label: 'Choose your preferred option' }}
		/>
	),
};
