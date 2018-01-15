/* eslint-disable react/display-name */

import React from 'react';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../icon-settings';

import { BUTTON } from '../../../utilities/constants';
import Button from '../../button';

const getButton = (props) => <Button {...props} onClick={action('click')} />;

const getIconButton = (props) => getButton({ variant: 'icon', ...props });

storiesOf(BUTTON, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () => getButton({ label: 'Base', variant: 'base' }))
	.add('Neutral', () => getButton({ label: 'Neutral' }))
	.add('Neutral with id', () =>
		getButton({ label: 'Neutral', id: 'custom-id' })
	)
	.add('Neutral Icon', () =>
		getButton({
			label: 'Neutral Icon',
			iconName: 'download',
			iconPosition: 'left',
			onFocus: action('focus'),
			onKeyDown: action('keyDown')
		})
	)
	.add('Disabled', () => getButton({ label: 'Disabled', disabled: true }))
	.add('Icon large', () =>
		getIconButton({
			assistiveText: 'Icon',
			iconSize: 'large',
			iconName: 'answer',
			title: 'chat'
		})
	)
	.add('Icon with external path', () =>
		getIconButton({
			assistiveText: 'Icon',
			iconSize: 'large',
			iconPath: '/assets/icons/utility-sprite/svg/symbols.svg#announcement',
			title: 'announcement'
		})
	)
	.addDecorator((getStory) => (
		<div
			className="slds-p-around--medium slds-hint-parent"
			style={{ backgroundColor: '#16325c' }}
		>
			{getStory()}
		</div>
	))
	.add('Icon Container Small', () =>
		getIconButton({
			assistiveText: 'Icon border container small',
			iconName: 'settings',
			iconSize: 'large',
			iconVariant: 'border',
			inverse: true
		})
	)
	.add('Dropdown Icon inverse', () =>
		getIconButton({
			'aria-haspopup': true,
			assistiveText: 'Dropdown Icon inverse',
			iconName: 'settings',
			iconVariant: 'more',
			inverse: true
		})
	)
	.addDecorator((getStory) => (
		<div className="slds-hint-parent" style={{ backgroundColor: '#16325c' }}>
			{getStory()}
		</div>
	))
	.add('Small Icon Hint inverse', () =>
		getIconButton({
			assistiveTest: 'Hint',
			iconName: 'down',
			iconVariant: 'border',
			iconSize: 'small',
			hint: true,
			inverse: true
		})
	);
