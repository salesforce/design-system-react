import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import IconSettings from '../../icon-settings';

import ColorPicker from '../index';

// eslint-disable-next-line camelcase
import UNSAFE_DirectionSettings from '../../utilities/UNSAFE_direction';

import Default from '../__examples__/default';

const HEX_REGEX_6_DIGITS = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

const handleChange = (event: React.SyntheticEvent, data: { color: string; isValid?: boolean }) => {
	action('onChange')(event, data);
};

const customOuterInputValidator = (hex: string) => !hex || HEX_REGEX_6_DIGITS.test(hex);

const meta: Meta<typeof ColorPicker> = {
	title: 'Components/ColorPicker',
	component: ColorPicker,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	parameters: {
		docs: {
			description: {
				component:
					'The Unified Color Picker component allows for a fully accessible and configurable color picker, allowing the user to pick from a set of predefined colors (swatches), or to pick a custom color using a HSB selection interface.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const DefaultStory: Story = {
	name: 'Default',
	args: {
		className: 'test_class_name',
		events: { onChange: handleChange },
		labels: { label: 'Choose Color' },
		id: 'default-color-picker',
	},
};

export const RightToLeft: Story = {
	name: 'Default - Right to Left (RTL)',
	render: () => (
		// eslint-disable-next-line
		<UNSAFE_DirectionSettings.Provider value="rtl">
			<div dir="rtl">
				<ColorPicker
					className="test_class_name"
					events={{ onChange: handleChange }}
					labels={{ label: 'Choose Color' }}
					id="default-color-picker"
				/>
			</div>
		</UNSAFE_DirectionSettings.Provider>
	),
};

export const NoLabel: Story = {
	name: 'No label',
	args: {
		className: 'test_class_name',
		events: { onChange: handleChange },
		assistiveText: { label: 'I should be read' },
		id: 'default-color-picker',
	},
};

export const CustomOnly: Story = {
	args: {
		events: { onChange: handleChange },
		id: 'custom-only-color-picker',
		labels: { label: 'Choose Color' },
		variant: 'custom',
	},
};

export const SwatchOnly: Story = {
	args: {
		events: { onChange: handleChange },
		id: 'swatch-only-color-picker',
		labels: { label: 'Choose Color' },
		variant: 'swatches',
	},
};

export const PredefinedColors: Story = {
	args: {
		events: { onChange: handleChange },
		id: 'predefined-color-picker',
		labels: { label: 'Choose Color' },
		swatchColors: [
			'#000000',
			'#ff0000',
			'#00ff00',
			'#0000ff',
			'#ffff00',
			'#ff00ff',
			'#00ffff',
			'#ffffff',
			'',
		],
		value: '#000000',
	},
};

export const PredefinedColorsOnly: Story = {
	args: {
		value: '#000000',
		events: { onChange: handleChange },
		id: 'predefined-only-color-picker',
		labels: { label: 'Choose Color' },
		swatchColors: [
			'#000000',
			'#ff0000',
			'#00ff00',
			'#0000ff',
			'#ffff00',
			'#ff00ff',
			'#00ffff',
			'#ffffff',
			'',
		],
		variant: 'swatches',
	},
};

export const HiddenInput: Story = {
	args: {
		events: { onChange: handleChange },
		hideInput: true,
		id: 'hidden-input-color-picker',
		labels: { label: 'Choose Color' },
	},
};

export const CustomTabSelected: Story = {
	args: {
		defaultSelectedTab: 'custom',
		events: { onChange: handleChange },
		id: 'Custom-tab-default-color-picker',
		labels: { label: 'Choose Color' },
	},
};

export const OuterInputErrorState: Story = {
	name: 'Outer Input in Error State',
	args: {
		events: { onChange: handleChange },
		errorText: 'Hex is invalid. Please correct this field.',
		id: 'outer-input-error-state-color-picker',
		labels: { label: 'Choose Color' },
		value: '#invalid',
	},
};

export const WorkingColorErrorState: Story = {
	name: 'Working Color Input in Error State',
	args: {
		events: { onChange: handleChange },
		errorTextWorkingColor: 'Hex is invalid. Please correct this field.',
		id: 'working-color-error-state-color-picker',
		labels: { label: 'Choose Color' },
		valueWorking: '#f',
		variant: 'custom',
	},
};

export const CustomValidator: Story = {
	args: {
		events: {
			onChange: handleChange,
			onValidateColor: customOuterInputValidator,
			onValidateWorkingColor: customOuterInputValidator,
		},
		id: 'custom-validator-color-picker',
		labels: { label: 'Choose Color' },
	},
};

export const Disabled: Story = {
	name: 'Color Picker Disabled',
	args: {
		id: 'color-picker',
		disabled: true,
		labels: { label: 'Choose Color' },
	},
};

export const MenuOpen: Story = {
	name: 'ColorPicker Menu Open',
	args: {
		id: 'color-picker',
		classNameMenu: 'test_class_name_menu',
		isOpen: true,
		labels: { label: 'Choose Color' },
	},
};

export const DocSiteDefault: Story = {
	name: 'Doc site Default',
	render: () => <Default />,
};

