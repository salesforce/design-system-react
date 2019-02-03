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
	 * * `newNotifications`: Assistive text for when there are new notifications. The default is '${notificationCount} new notifications'. '${notificationCount}' will be replaced with the notificationCount prior to rendering.
	 * * `noNotifications`: Assistive text for when there are no new notifications.
	 */
	assistiveText: PropTypes.shape({
		newNotifications: PropTypes.string,
		noNotifications: PropTypes.string
	}),
	/**
	 * Dictates the number of notifications shown in the new notifications badge.
	 */
	notificationCount: PropTypes.number,
	/**
	 * A `Popover` component. The props from this popover will be merged and override any default props.
	 */
	popover: PropTypes.node
};

/**
 * A GlobalHeaderNotifications component.
 */
class GlobalHeaderNotifications extends React.Component {
	render() {
		const notificationCount = this.props.notificationCount;
		const popoverProps = assign({
			align: 'bottom right',
			body: (<span></span>),
			heading: 'Notifications',
			triggerClassName: 'slds-dropdown-trigger slds-dropdown-trigger_click'
		}, this.props.popover ? this.props.popover.props : {});
		let notificationsAssistiveText = this.props.assistiveText.noNotifications;

		delete popoverProps.children;

		if (notificationCount > 0) {
			notificationsAssistiveText = this.props.assistiveText.newNotifications;
			notificationsAssistiveText = notificationsAssistiveText.replace('${notificationCount}', notificationCount);
		}

		return (
			<Popover {...popoverProps}>
				<div>
					<Button
						assistiveText={{ icon: notificationsAssistiveText }}
						className="slds-button_icon slds-global-actions__notifications slds-global-actions__item-action"
						iconCategory="utility"
						iconClassName="slds-global-header__icon"
						iconName="notification"
						iconSize="small"
						iconVariant="container"
						variant="icon"
					/>
					{(notificationCount > 0) ? (
						<span
							aria-hidden="true"
							className="slds-notification-badge slds-incoming-notification slds-show-notification"
						>
							{notificationCount}
						</span>
					) : <span aria-hidden="true" className="slds-notification-badge" />}
				</div>
			</Popover>
		);
	}
}

GlobalHeaderNotifications.displayName = GLOBAL_HEADER_NOTIFICATIONS;

GlobalHeaderNotifications.defaultProps = {
	assistiveText: {
		newNotifications: '${notificationCount} new notifications',
		noNotifications: 'no new notifications'
	},
	notificationCount: 0
};

GlobalHeaderNotifications.propTypes = propTypes;

export default GlobalHeaderNotifications;
