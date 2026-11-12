import { useState } from 'react';
import IconSettings from '../../icon-settings';
import Slider from '../';

// Slider is controlled: keep `value` in state, seeded from the story args.
const StatefulSlider = ({ onChange, value: initialValue, ...args }) => {
	const [value, setValue] = useState(initialValue);
	return (
		<Slider
			{...args}
			onChange={(event, data) => {
				onChange?.(event, data);
				setValue(data.value);
			}}
			value={value}
		/>
	);
};

export default {
	title: 'Components/Slider',
	component: Slider,
	// Remount when the `value` control changes so the new value seeds the state.
	render: (args) => <StatefulSlider key={args.value} {...args} />,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium" style={{ maxWidth: '400px' }}>
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	argTypes: {
		value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
		min: { control: 'number' },
		max: { control: 'number' },
		step: { control: 'number' },
		disabled: { control: 'boolean' },
		vertical: { control: 'boolean' },
		size: {
			control: { type: 'select' },
			options: ['x-small', 'small', 'medium', 'large'],
		},
	},
};

// Default slider
export const Default = {
	args: {
		labels: { label: 'Slider Label' },
		value: 50,
	},
};

// Slider with custom range
export const CustomRange = {
	args: {
		labels: { label: 'Custom Range' },
		value: 25,
		min: 0,
		max: 50,
	},
};

// Slider with step
export const WithStep = {
	args: {
		labels: { label: 'Step of 10' },
		value: 30,
		step: 10,
	},
};

// Disabled slider
export const Disabled = {
	args: {
		labels: { label: 'Disabled Slider' },
		value: 60,
		disabled: true,
	},
};

// Slider with error
export const WithError = {
	args: {
		hasError: true,
		labels: {
			label: 'Slider with Error',
			error: 'Value exceeds the recommended limit.',
		},
		value: 80,
	},
};

// Vertical slider
export const Vertical = {
	render: () => (
		<div style={{ height: '200px' }}>
			<StatefulSlider
				labels={{ label: 'Vertical Slider' }}
				value={50}
				vertical
			/>
		</div>
	),
};

// Different sizes
export const Sizes = {
	render: () => (
		<div className="slds-grid slds-grid_vertical slds-gutters">
			<StatefulSlider labels={{ label: 'X-Small' }} value={50} size="x-small" />
			<StatefulSlider labels={{ label: 'Small' }} value={50} size="small" />
			<StatefulSlider labels={{ label: 'Medium' }} value={50} size="medium" />
			<StatefulSlider labels={{ label: 'Large' }} value={50} size="large" />
		</div>
	),
};
