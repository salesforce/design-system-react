import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '../../icon-settings';
import { NOTIFICATION } from '../../../utilities/constants';
import Notification from '../../notification';
import Alerts from '../__examples__/alerts';
import Toasts from '../__examples__/toasts';
import WithinModal from '../__examples__/within-modal';

storiesOf(NOTIFICATION, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base: Alert', () => (
		<Notification
			content={[
				'Your new contact ',
				<a href="#" key="0123">
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
			silenceDeprecationWarning
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
			silenceDeprecationWarning
		/>
	))
	.add('Docs site Alerts', () => <Alerts />)
	.add('Docs site Toasts', () => <Toasts />)
	.add('Docs site WithinModal', () => <WithinModal />);
