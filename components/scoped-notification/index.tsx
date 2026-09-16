/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactNode, type ReactElement } from 'react';
import classNames from 'classnames';
import Icon from '../icon';
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
	/** Custom icon (accepts Icon component) */
	icon?: ReactElement;
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
		let iconAssistiveText: { label?: string } = {};
		const iconProps = propIcon.props as Record<string, unknown>;

		if (assistiveText?.icon) {
			iconAssistiveText.label = assistiveText.icon;
		}

		if (iconProps.assistiveText) {
			iconAssistiveText = {
				...iconAssistiveText,
				...(iconProps.assistiveText as { label?: string }),
			};
		}

		icon = React.cloneElement(propIcon, {
			...iconProps,
			assistiveText: iconAssistiveText,
		} as Record<string, unknown>);
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

