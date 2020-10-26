/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Header Notifications Component
// Implements the [Global Header Notifications design pattern](https://www.lightningdesignsystem.com/components/global-header/#Notifications) in React.

import React from 'react';
import PropTypes from 'prop-types';
import assign from 'lodash.assign';
import Button from '../button';
import Popover from '../popover';

import { GLOBAL_HEADER_NOTIFICATIONS } from '../../utilities/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * * `newNotificationsAfter`: Assistive text for when there are new notifications, after the notificationCount. The default is ' new notifications'.
	 * * `newNotificationsBefore`: Assistive text for when there are new notifications, before the notificationCount. The default is ''.
	 * * `noNotifications`: Assistive text for when there are no new notifications.
	 */
	assistiveText: PropTypes.shape({
		newNotificationsAfter: PropTypes.string,
		newNotificationsBefore: PropTypes.string,
		noNotifications: PropTypes.string,
	}),
	/**
	 * Dictates the number of notifications shown in the new notifications badge.
	 */
	notificationCount: PropTypes.number,
	/**
	 * A `Popover` component. The props from this popover will be merged and override any default props. The `children` prop will be ignored.
	 */
	popover: PropTypes.node,
};

function GlobalHeaderNotifications(props) {
	const buttonAriaProps = {
		'aria-live': 'assertive',
	};
	const { notificationCount } = props;
	const popoverProps = assign(
		{
			align: 'bottom right',
			body: <span />,
			triggerClassName: 'slds-dropdown-trigger slds-dropdown-trigger_click',
		},
		props.popover ? props.popover.props : {}
	);
	let notificationsAssistiveText = props.assistiveText.noNotifications;

	// eslint-disable-next-line fp/no-delete
	delete popoverProps.children;

	if (notificationCount > 0) {
		notificationsAssistiveText = `${props.assistiveText.newNotificationsBefore}${notificationCount}${props.assistiveText.newNotificationsAfter}`;
	} else {
		buttonAriaProps['aria-atomic'] = true;
	}

	return (
		<Popover {...popoverProps}>
			<Button
				assistiveText={{ icon: notificationsAssistiveText }}
				className="slds-button_icon slds-global-actions__notifications slds-global-actions__item-action"
				iconCategory="utility"
				iconClassName="slds-global-header__icon"
				iconName="notification"
				iconSize="small"
				iconVariant="container"
				title={notificationsAssistiveText}
				variant="icon"
				{...buttonAriaProps}
			/>
			{notificationCount > 0 ? (
				<span
					aria-hidden="true"
					className="slds-notification-badge slds-incoming-notification slds-show-notification"
				>
					{notificationCount}
				</span>
			) : (
				<span aria-hidden="true" className="slds-notification-badge" />
			)}
		</Popover>
	);
}

GlobalHeaderNotifications.displayName = GLOBAL_HEADER_NOTIFICATIONS;

GlobalHeaderNotifications.defaultProps = {
	assistiveText: {
		newNotificationsAfter: ' new notifications',
		newNotificationsBefore: '',
		noNotifications: 'No new notifications',
	},
	notificationCount: 0,
};

GlobalHeaderNotifications.propTypes = propTypes;

export default GlobalHeaderNotifications;
