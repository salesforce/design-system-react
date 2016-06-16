/* eslint-disable indent */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { BUTTON } from '../../utilities/constants';
import Button from '../../components/button';
import ButtonGroup from '../../components/button-group';
import Tooltip from '../../components/popover-tooltip';

const getButton = props => (
	<Button
		{...props}
		onClick={action('click')}
	/>
);

const wrapWithButtonGroup = props => (
	<ButtonGroup>
		{ getButton({ label: 'Neutral Icon', iconName: 'download', 'iconPosition': 'left' }) }
		{ getButton(props) }
		{ getButton({ label: 'Neutral Icon', iconName: 'download', 'iconPosition': 'left' }) }
	</ButtonGroup>
);

const getIconButton = props => getButton({ variant: 'icon', ...props });

storiesOf(BUTTON, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => getButton({ label: 'Base', variant: 'base' }))
	.add('Neutral', () => getButton({ label: 'Neutral' }))
	.add('Neutral Icon', () => getButton({ label: 'Neutral Icon', iconName: 'download', 'iconPosition': 'left' }))
	.add('Disabled', () => getButton({ label: 'Disabled', variant: 'brand', disabled: true }))
	.add('Disabled With Tooltip', () => getButton({ label: 'Disabled', variant: 'brand', disabled: true, tooltip:<Tooltip content="YES!" align="bottom" /> }))
	.add('Disabled With Tooltip inside ButtonGroup', () => wrapWithButtonGroup({ label: 'Disabled', variant: 'brand', disabled: true, tooltip:<Tooltip content="YES!" align="bottom" /> } ))
	.add('Icon Container Small', () => getIconButton({
		assistiveText: 'Icon Container Small',
		iconName: 'settings',
		iconSize: 'small',
		iconVariant: 'container'
	}))
