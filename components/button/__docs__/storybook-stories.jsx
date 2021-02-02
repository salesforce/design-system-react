/* eslint-disable react/display-name */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../icon-settings';

import { BUTTON } from '../../../utilities/constants';
import Button from '../../button';

import BaseNeutral from '../__examples__/base-neutral';
import BrandDisabled from '../__examples__/brand-disabled-destructive-inverse';
import ButtonIcons from '../__examples__/button-icons';

const getButton = (props) => <Button {...props} onClick={action('click')} />;

const getIconButton = (props) => getButton({ variant: 'icon', ...props });

const blueBackground = (getStory) => (
	<div className="slds-hint-parent" style={{ backgroundColor: '#16325c' }}>
		{getStory()}
	</div>
);

storiesOf(BUTTON, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () => getButton({ label: 'Base', variant: 'base' }))
	.add('Aria attribute', () =>
		getButton({ label: 'Base', 'aria-label': 'Base', variant: 'base' })
	)
	.add('Data attribute', () =>
		getButton({
			label: 'Base',
			'data-some-property': 'Some value',
			variant: 'base',
		})
	)
	.add('Neutral', () => getButton({ label: 'Neutral' }))
	.add('Neutral with id', () =>
		getButton({ label: 'Neutral', id: 'custom-id' })
	)
	.add('Neutral Icon', () =>
		getButton({
			label: 'Neutral Icon',
			iconCategory: 'utility',
			iconName: 'download',
			iconPosition: 'left',
			onFocus: action('focus'),
			onKeyDown: action('keyDown'),
		})
	)
	.add('Disabled', () => getButton({ label: 'Disabled', disabled: true }))
	.add('Icon large', () =>
		getIconButton({
			assistiveText: { icon: 'Icon' },
			iconSize: 'large',
			iconCategory: 'utility',
			iconName: 'answer',
			title: 'chat',
		})
	)
	.add('Icon with external path', () =>
		getIconButton({
			assistiveText: { icon: 'Icon' },
			iconSize: 'large',
			iconPath: '/assets/icons/utility-sprite/svg/symbols.svg#announcement',
			title: 'announcement',
		})
	)
	.add(
		'Small Icon Hint inverse',
		() =>
			getIconButton({
				assistiveText: { icon: 'Hint' },
				iconCategory: 'utility',
				iconName: 'down',
				iconVariant: 'border',
				iconSize: 'small',
				hint: true,
				inverse: true,
			}),
		{ decorators: [blueBackground] }
	)
	.add(
		'Icon Container Small',
		() =>
			getIconButton({
				assistiveText: { icon: 'Icon border container small' },
				iconCategory: 'utility',
				iconName: 'settings',
				iconSize: 'large',
				iconVariant: 'border',
				inverse: true,
			}),
		{ decorators: [blueBackground] }
	)
	.add(
		'Dropdown Icon inverse',
		() =>
			getIconButton({
				'aria-haspopup': true,
				assistiveText: {
					icon: 'Dropdown Icon inverse',
				},
				iconCategory: 'utility',
				iconName: 'settings',
				iconVariant: 'more',
				inverse: true,
			}),
		{ decorators: [blueBackground] }
	)
	.add(
		'Outline brand button',
		() =>
			getButton({
				label: 'Outline brand button',
				variant: 'outline-brand',
			}),
		{ decorators: [blueBackground] }
	)
	.add('Doc site Base Neutral', () => <BaseNeutral />)
	.add('Doc site Brand Disabled', () => <BrandDisabled />)
	.add('Doc site Button Icons', () => <ButtonIcons />);
