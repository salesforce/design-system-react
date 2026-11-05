/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactNode, type ReactElement } from 'react';
import classNames from 'classnames';
import Icon, { type IconProps } from '../icon';
import { SCOPED_NOTIFICATION } from '../../utilities/constants';

/**
 * Theme options for ScopedNotification
 */
export type ScopedNotificationTheme = 'dark' | 'light';

/**
 * Assistive text for ScopedNotification
 */
export interface ScopedNotificationAssistiveText {
	/** Assistive text for icon */
	icon?: string;
}

/**
 * Props for the ScopedNotification component
 */
export interface ScopedNotificationProps {
	/** Assistive text for accessibility */
	assistiveText?: ScopedNotificationAssistiveText;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Content to display in the notification */
	children?: ReactNode;
	/** Custom `Icon`. Its own `assistiveText` wins over `assistiveText.icon`. */
	icon?: ReactElement<IconProps>;
	/** Icon name when using default icon */
	iconName?: string;
	/** Theme for the notification */
	theme?: ScopedNotificationTheme;
}

/**
 * Scoped Notification serves advisory information for the user
 * that is not important enough to justify an alert.
 */
const ScopedNotification = ({
	assistiveText,
	className,
	children,
	icon: propIcon,
	iconName,
	theme,
}: ScopedNotificationProps): React.ReactElement => {
	// Build the icon element
	let icon: ReactNode;

	if (propIcon) {
		// Clone the provided icon with merged assistive text
		const { assistiveText: iconAssistiveText } = propIcon.props;
		icon = React.cloneElement(propIcon, {
			assistiveText: {
				label: assistiveText?.icon,
				...(typeof iconAssistiveText === 'string'
					? { label: iconAssistiveText }
					: iconAssistiveText),
			},
		});
	} else {
		// Use default icon
		icon = (
			<Icon
				assistiveText={{
					label: assistiveText?.icon || 'Info',
				}}
				category="utility"
				name={iconName || 'info'}
				colorVariant={theme === 'dark' ? 'base' : undefined}
				size="small"
			/>
		);
	}

	return (
		<div
			className={classNames(
				'slds-scoped-notification',
				'slds-media',
				'slds-media_center',
				{
					'slds-scoped-notification_light': theme === 'light',
					'slds-scoped-notification_dark': theme === 'dark',
				},
				className as string
			)}
			role="status"
		>
			<div className="slds-media__figure">{icon}</div>
			<div className="slds-media__body">{children}</div>
		</div>
	);
};

ScopedNotification.displayName = SCOPED_NOTIFICATION;

export default ScopedNotification;
