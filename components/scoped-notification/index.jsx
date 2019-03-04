/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Scoped Notification design pattern](https://lightningdesignsystem.com/components/scoped-notifications/) in React.
// Based on SLDS v2.4.5
import IconSettings from '~/components/icon-settings';
import Icon from '~/components/icon';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { SCOPED_NOTIFICATION } from '../../utilities/constants';

const propTypes = {
	/**
	 * CSS classes to be added to tag with `.slds-scoped-notification`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 *  Theme for the scoped notification
	 */
	theme: PropTypes.oneOf(['dark', 'light']),
	/**
	 *  Icon for the scoped notification
	 */
	icon: PropTypes.string.isRequired,
};

const defaultProps = {
	theme: 'light',
};

/**
 * A scoped notification component communicates to the user the progress of a particular process
 */
class ScopedNotification extends React.Component {
	render() {
		return (
			<div
				className={classNames(
					`slds-scoped-notification`,
					`slds-media`,
					`slds-media_center`,
					`slds-scoped-notification_${this.props.theme}`,
					this.props.className
				)}
				role="status"
			>
				<div className="slds-media__figure">
					<IconSettings iconPath="/assets/icons">
						<Icon
							assistiveText={this.props.assistiveText}
							category="utility"
							name={this.props.icon}
							colorVariant={this.props.theme === 'light' ? 'light' : 'base'}
							size="small"
						/>
					</IconSettings>
				</div>
				<div className="slds-media__body">{this.props.children}</div>
			</div>
		);
	}
}

ScopedNotification.displayName = SCOPED_NOTIFICATION;
ScopedNotification.propTypes = propTypes;
ScopedNotification.defaultProps = defaultProps;

export default ScopedNotification;
