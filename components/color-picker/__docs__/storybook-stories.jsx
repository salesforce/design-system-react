import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../icon-settings';

import ColorPicker from '../../color-picker';
import { COLOR_PICKER } from '../../../utilities/constants';

import Default from '../__examples__/default';

// eslint-disable-next-line camelcase
import UNSAFE_DirectionSettings from '../../utilities/UNSAFE_direction';

const makeRtl = (component) => (
	// eslint-disable-next-line
	<UNSAFE_DirectionSettings.Provider value="rtl">
		<div dir="rtl">{component}</div>
	</UNSAFE_DirectionSettings.Provider>
);

const HEX_REGEX_6_DIGITS = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

const handleChange = (event, data) => {
	const dataAsArray = Object.keys(data).map((key) => data[key]);
	action('onChange')(event, data, ...dataAsArray);
};

const customOuterInputValidator = (hex) => !hex || HEX_REGEX_6_DIGITS.test(hex);

storiesOf(COLOR_PICKER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Default', () => (
		<ColorPicker
			className="test_class_name"
			events={{ onChange: handleChange }}
			labels={{ label: 'Choose Color' }}
			id="default-color-picker"
		/>
	))
	.add('Default - Right to Left (RTL)', () =>
		makeRtl(
			<ColorPicker
				className="test_class_name"
				events={{ onChange: handleChange }}
				labels={{ label: 'Choose Color' }}
				id="default-color-picker"
			/>
		)
	)
	.add('Custom Only', () => (
		<ColorPicker
			events={{ onChange: handleChange }}
			id="custom-only-color-picker"
			labels={{ label: 'Choose Color' }}
			variant="custom"
		/>
	))
	.add('Swatch Only', () => (
		<ColorPicker
			events={{ onChange: handleChange }}
			id="swatch-only-color-picker"
			labels={{ label: 'Choose Color' }}
			variant="swatches"
		/>
	))
	.add('Predefined Colors', () => (
		<ColorPicker
			events={{
				onChange: handleChange,
			}}
			id="predefined-color-picker"
			labels={{ label: 'Choose Color' }}
			swatchColors={[
				'#000000',
				'#ff0000',
				'#00ff00',
				'#0000ff',
				'#ffff00',
				'#ff00ff',
				'#00ffff',
				'#ffffff',
				'',
			]}
			value="#000000"
		/>
	))
	.add('Predefined Colors Only', () => (
		<ColorPicker
			value="#000000"
			events={{
				onChange: handleChange,
			}}
			id="predefined-only-color-picker"
			labels={{ label: 'Choose Color' }}
			swatchColors={[
				'#000000',
				'#ff0000',
				'#00ff00',
				'#0000ff',
				'#ffff00',
				'#ff00ff',
				'#00ffff',
				'#ffffff',
				'',
			]}
			variant="swatches"
		/>
	))
	.add('Hidden Input', () => (
		<ColorPicker
			events={{ onChange: handleChange }}
			hideInput
			id="hidden-input-color-picker"
			labels={{ label: 'Choose Color' }}
		/>
	))
	.add('Custom Tab Selected', () => (
		<ColorPicker
			defaultSelectedTab="custom"
			events={{ onChange: handleChange }}
			id="Custom-tab-default-color-picker"
			labels={{ label: 'Choose Color' }}
		/>
	))
	.add('Outer Input in Error State', () => (
		<ColorPicker
			events={{ onChange: handleChange }}
			errorText="Hex is invalid. Please correct this field."
			id="outer-input-error-state-color-picker"
			labels={{ label: 'Choose Color' }}
			value="#invalid"
		/>
	))
	.add('Working Color Input in Error State', () => (
		<ColorPicker
			events={{ onChange: handleChange }}
			errorTextWorkingColor="Hex is invalid. Please correct this field."
			id="working-color-error-state-color-picker"
			labels={{ label: 'Choose Color' }}
			valueWorking="#f"
			variant="custom"
		/>
	))
	.add('Custom Validator', () => (
		// Example of a custom validator that support hex color with strictly 6 digits.
		<ColorPicker
			events={{
				onChange: handleChange,
				onValidateColor: customOuterInputValidator,
				onValidateWorkingColor: customOuterInputValidator,
			}}
			id="custom-validator-color-picker"
			labels={{ label: 'Choose Color' }}
		/>
	))
	.add('Color Picker Disabled', () => (
		<ColorPicker
			id="color-picker"
			disabled
			labels={{ label: 'Choose Color' }}
		/>
	))
	.add('ColorPicker Menu Open', () => (
		<ColorPicker
			id="color-picker"
			classNameMenu="test_class_name_menu"
			isOpen
			labels={{ label: 'Choose Color' }}
		/>
	))
	.add('Doc site Default', () => <Default />);
