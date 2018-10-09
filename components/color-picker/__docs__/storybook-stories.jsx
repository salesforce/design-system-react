import React from 'react';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../icon-settings';

import ColorPicker from '../../color-picker';
import { COLOR_PICKER } from '../../../utilities/constants';

const handleChange = (event, data) => {
	const dataAsArray = Object.keys(data).map((key) => data[key]);
	action('onChange')(event, data, ...dataAsArray);
};

storiesOf(COLOR_PICKER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Default', () => <ColorPicker onChange={handleChange} />)
	.add('Custom Only', () => (
		<ColorPicker onChange={handleChange} variant="custom" />
	))
	.add('Swatch Only', () => (
		<ColorPicker onChange={handleChange} variant="swatches" />
	))
	.add('Predefined Colors', () => (
		<ColorPicker
			value="#000000"
			onChange={handleChange}
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
			onChange={handleChange}
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
	.add('Hidden Input', () => <ColorPicker onChange={handleChange} hideInput />)
	.add('Custom Tab Selected', () => (
		<ColorPicker onChange={handleChange} tabSelector="custom" />
	));
