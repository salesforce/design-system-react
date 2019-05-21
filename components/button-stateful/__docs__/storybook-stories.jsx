/* eslint-disable react/display-name */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../icon-settings';

import { BUTTON_STATEFUL } from '../../../utilities/constants';
import ButtonStateful from '../../button-stateful';

import IconTextButton from '../__examples__/icon-text';
import IconButton from '../__examples__/icon';

const getButtonStateful = (props) => (
	<ButtonStateful {...props} onClick={action('click')} />
);

storiesOf(BUTTON_STATEFUL, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () => getButtonStateful())
	.add('Disabled', () => getButtonStateful({ disabled: true }))
	.add('Icon', () =>
		getButtonStateful({
			assistiveText: { icon: 'Icon button' },
			variant: 'icon',
			label: 'Neutral Icon',
			iconName: 'check',
			onFocus: action('hover'),
			onMouseEnter: (e) => {
				console.log('target is ', e.target);
			},
		})
	)
	.add('Doc site Icon Text Button', () => <IconTextButton />)
	.add('Doc site Icon Button', () => <IconButton />);
