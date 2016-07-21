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
	.add('Neutral', () => getButton({ label: 'Neutral'}))
	.add('Neutral Icon', () => getButton({
		label: 'Neutral Icon',
		iconName: 'download',
		iconPosition: 'left' ,
	}))
	.add('Disabled', () => getButton({ label: 'Disabled', disabled: true }))
	.add('Icon large', () => getIconButton({
		assistiveText: 'Icon',
		iconSize: 'large',
		iconName: 'answer'
	}))

	.addDecorator(getStory => <div className="slds-p-around--medium slds-hint-parent" style={{"backgroundColor": "green"}}>{getStory()}</div>)
	.add('Icon Container Small', () => getIconButton({
		assistiveText: 'Icon border container small',
		iconName: 'settings',
		iconSize: 'large',
		iconVariant: 'border',
		inverse: true
	}))
	.add('Dropdown Icon inverse', () => getIconButton({
		assistiveText: 'Dropdown Icon inverse',
		iconName: 'settings',
		iconVariant: 'more',
		inverse: true
	}))
	.add('Small Icon Hint inverse', () => getIconButton({
		assistiveTest: 'Hint',
		iconName: 'down',
		iconVariant: 'border',
		iconSize: 'small',
		hint: true,
		inverse: true
	}))

