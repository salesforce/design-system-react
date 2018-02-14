import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '../../icon-settings';

import { NOTIFICATION } from '../../../utilities/constants';
import Notification from '../../notification';

storiesOf(NOTIFICATION, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base: Alert', () => (
		<Notification
			content={[
				'Your new contact ',
				<a href="javascript:void(0);" key="0123">
					Sara Smith
				</a>,
				' was successfully created.',
			]}
			iconName="notification"
			isOpen
			onDismiss={() => {
				console.log('dismiss alert');
			}}
			texture
			theme="success"
			variant="alert"
		/>
	))
	.add('Base: Toast', () => (
		<Notification
			content="toast notification"
			inverse
			isOpen
			name="account"
			onDismiss={() => {
				console.log('dismiss toast');
			}}
			theme="error"
			variant="toast"
		/>
	));
