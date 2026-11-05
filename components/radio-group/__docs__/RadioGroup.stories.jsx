import { useState } from 'react';
import IconSettings from '../../icon-settings';
import Radio from '../radio';
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
			value={selected}
			onChange={(event, data) => setSelected(data.value)}
			variant={variant}
			{...props}
		>
			<Radio
				labels={{ label: 'Option 1' }}
				value="option1"
				variant={variant === 'button-group' ? 'button-group' : 'base'}
			/>
			<Radio
				labels={{ label: 'Option 2' }}
				value="option2"
				variant={variant === 'button-group' ? 'button-group' : 'base'}
			/>
			<Radio
				labels={{ label: 'Option 3' }}
				value="option3"
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
		const [selected, setSelected] = useState(null);

		return (
			<RadioGroup
				labels={{
					label: 'Select an option',
					error: 'This field is required',
				}}
				value={selected}
				onChange={(event, data) => setSelected(data.value)}
			>
				<Radio labels={{ label: 'Option 1' }} value="option1" />
				<Radio labels={{ label: 'Option 2' }} value="option2" />
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
