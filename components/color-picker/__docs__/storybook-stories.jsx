import React from 'react';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../icon-settings';

import ColorPicker from '../../color-picker';
import { COLOR_PICKER } from '../../../utilities/constants';

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
	.add('Default', () => <ColorPicker events={{ onChange: handleChange }} />)
	.add('Custom Only', () => (
		<ColorPicker events={{ onChange: handleChange }} variant="custom" />
	))
	.add('Swatch Only', () => (
		<ColorPicker events={{ onChange: handleChange }} variant="swatches" />
	))
	.add('Predefined Colors', () => (
		<ColorPicker
			value="#000000"
			events={{
				onChange: handleChange,
			}}
			swatchColors={[
				'',
				'#000000',
				'#ff0000',
				'#00ff00',
				'#0000ff',
				'#ffff00',
				'#ff00ff',
				'#00ffff',
				'#ffffff',
			]}
		/>
	))
	.add('Predefined Colors Only', () => (
		<ColorPicker
			value="#000000"
			events={{
				onChange: handleChange,
			}}
			swatchColors={[
				'',
				'#000000',
				'#ff0000',
				'#00ff00',
				'#0000ff',
				'#ffff00',
				'#ff00ff',
				'#00ffff',
				'#ffffff',
			]}
			variant="swatches"
		/>
	))
	.add('Hidden Input', () => (
		<ColorPicker events={{ onChange: handleChange }} hideInput />
	))
	.add('Custom Tab Selected', () => (
		<ColorPicker
			events={{ onChange: handleChange }}
			defaultSelectedTab="custom"
		/>
	))
	.add('Outer Input in Error State', () => (
		<ColorPicker
			value="#invalid"
			events={{ onChange: handleChange }}
			errorText="Hex is invalid. Please correct this field."
		/>
	))
	.add('Working Color Input in Error State', () => (
		<ColorPicker
			events={{ onChange: handleChange }}
			errorTextWorkingColor="Hex is invalid. Please correct this field."
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
		/>
	))
	.add('Color Picker Disabled', () => <ColorPicker disabled />);
