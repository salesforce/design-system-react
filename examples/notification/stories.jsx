import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { NOTIFICATION } from '../../utilities/constants';
import Notification from '../../components/notification';

storiesOf(NOTIFICATION, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base: Alert', () => (
		<Notification
			content={["Your new contact ", <a href="#" key="0123">Sara Smith</a>, " was successfully created."]}
			iconName="notification"
			isOpen
			onDismiss={() => { console.log('dismiss alert') }}
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
			onDismiss={() => { console.log('dismiss toast') }}
			theme="error"
			variant="toast"
		/>
	));
