/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Scoped Notification design pattern](https://lightningdesignsystem.com/components/scoped-notifications/) in React.
// Based on SLDS v2.4.5
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../icon';

import componentDoc from './component.json';
import checkProps from './check-props';

import { SCOPED_NOTIFICATION } from '../../utilities/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility.**
	 * * `icon`: The assistive text for the icon. Is overridden by `label` assistive text passed directly to an `Icon` component via the `icon` prop
	 */
	assistiveText: PropTypes.shape({
		icon: PropTypes.string,
	}),
	/**
	 * CSS classes to be added to tag with `.slds-scoped-notification`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 *  The icon to be displayed in the scoped notification. Accepts an `Icon` component
	 */
	icon: PropTypes.node,
	/**
	 *  Theme for the scoped notification
	 */
	theme: PropTypes.oneOf(['dark', 'light']),
};

const defaultProps = {};

/**
 * A Scoped Notification Component serve advisory information for the user that is not important enough to justify an alert.
 */
class ScopedNotification extends React.Component {
	constructor(props) {
		super(props);
		checkProps(SCOPED_NOTIFICATION, props, componentDoc);
	}

	render() {
		let icon;

		if (this.props.icon) {
			let iconAssistiveText = {};

			if (this.props.assistiveText && this.props.assistiveText.icon) {
				iconAssistiveText.label = this.props.assistiveText.icon;
			}

			if (this.props.icon.props.assistiveText) {
				iconAssistiveText = {
					...iconAssistiveText,
					...this.props.icon.props.assistiveText,
				};
			}

			icon = React.cloneElement(this.props.icon, {
				...this.props.icon.props,
				assistiveText: iconAssistiveText,
			});
		} else {
			icon = (
				<Icon
					assistiveText={{
						label:
							(this.props.assistiveText && this.props.assistiveText.icon) ||
							'Info',
					}}
					category="utility"
					name={this.props.iconName || 'info'}
					colorVariant={this.props.theme === 'dark' ? 'base' : undefined}
					size="small"
				/>
			);
		}

		return (
			<div
				className={classNames(
					`slds-scoped-notification`,
					`slds-media`,
					`slds-media_center`,
					{
						'slds-scoped-notification_light': this.props.theme === 'light',
						'slds-scoped-notification_dark': this.props.theme === 'dark',
					},
					this.props.className
				)}
				role="status"
			>
				<div className="slds-media__figure">{icon}</div>
				<div className="slds-media__body">{this.props.children}</div>
			</div>
		);
	}
}

ScopedNotification.displayName = SCOPED_NOTIFICATION;
ScopedNotification.propTypes = propTypes;
ScopedNotification.defaultProps = defaultProps;

export default ScopedNotification;
