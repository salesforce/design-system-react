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
		<div className="slds-p-around--medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Default', () => <ColorPicker onChange={handleChange} />)
	.add('Custom Colors', () => (
		<ColorPicker
			color="#000000"
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
	));
