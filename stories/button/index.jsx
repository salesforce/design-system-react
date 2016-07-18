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

const getIconButton = props => getButton({ variant: 'icon', ...props });

storiesOf(BUTTON, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => getButton({ label: 'Base', variant: 'base' }))
	.add('Neutral', () => getButton({ label: 'Neutral' }))
	.add('Neutral Icon', () => getButton({ label: 'Neutral Icon', iconName: 'download', 'iconPosition': 'left' }))
	.add('Disabled', () => getButton({ label: 'Disabled', variant: 'brand', disabled: true }))
	.add('Icon Container Small', () => getIconButton({
		assistiveText: 'Icon border container small',
		iconName: 'settings',
		iconSize: 'small',
		iconVariant: 'border'
	}))
	.addDecorator(getStory => <div className="slds-p-around--medium" style={{"backgroundColor": "green"}}>{getStory()}</div>)
	.add('Dropdown Icon inverse', () => getIconButton({
		assistiveText: 'Dropdown Icon inverse',
    variant: 'icon-inverse',
		iconName: 'settings',
		iconVariant: 'more'
	}))
	.addDecorator(getStory => <div className="slds-p-around--medium slds-hint-parent" style={{"backgroundColor": "green"}}>{getStory()}</div>)
	.add('Hint inverse', () => getIconButton({ assistiveTest: 'Hint', iconName: 'down', hint: true, variant: 'icon-inverse' }))

