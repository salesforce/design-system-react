/* eslint-disable indent */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { BUTTON } from '../../utilities/constants';
import Button from '../../components/button';

const getButton = props => (
	<Button
		{...props}
		onClick={action('click')}
	/>
);

storiesOf(BUTTON, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => getButton({ label: 'Base', variant: 'base' }))
	.add('Neutral', () => getButton({ label: 'Neutral' }))
	.add('Neutral Icon', () => getButton({ label: 'Neutral Icon', iconName: 'download', 'iconPosition': 'left' }))
	.add('Disabled', () => getButton({ label: 'Disabled', variant: 'brand', disabled: true }))
