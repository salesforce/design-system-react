/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useState, useRef, useEffect, useCallback, type ReactNode, type CSSProperties } from 'react';
import classNames from '../../utilities/class-names';
import Button from '../button';
import Icon from '../icon';
import { ALERT } from '../../utilities/constants';
import DOMElementFocus from '../../utilities/dom-element-focus';
import EventUtil from '../../utilities/event';

/**
 * Alert variant types
 */
export type AlertVariant = 'error' | 'info' | 'offline' | 'warning';

/**
 * Assistive text for Alert
 */
export interface AlertAssistiveText {
	/** Close button assistive text */
	closeButton?: ReactNode;
}

/**
 * Labels for Alert
 */
export interface AlertLabels {
	/** Main heading content */
	heading?: ReactNode;
	/** Link text in heading */
	headingLink?: ReactNode;
}

/**
 * Props for the Alert component
 */
export interface AlertProps {
	/** Assistive text for accessibility */
	assistiveText?: AlertAssistiveText;
	/** CSS classes for the alert container */
	className?: string | string[] | Record<string, boolean>;
	/** Show close button */
	dismissible?: boolean;
	/** Custom icon (defaults to variant-specific icon) */
	icon?: ReactNode;
	/** Text labels */
	labels?: AlertLabels;
	/** Callback when heading link is clicked */
	onClickHeadingLink?: (event: React.MouseEvent) => void;
	/** Callback when close button is clicked */
	onRequestClose?: (event: React.MouseEvent) => void;
	/** Custom styles */
	style?: CSSProperties;
	/** Alert type/severity */
	variant: AlertVariant;
}

const defaultAssistiveText: AlertAssistiveText = {
	closeButton: 'Close',
};

const defaultLabels: AlertLabels = {};

const assistiveTextVariant: Record<AlertVariant, string> = {
	info: 'info',
	warning: 'warning',
	error: 'error',
	offline: 'offline',
};

const defaultIcons: Record<AlertVariant, ReactNode> = {
	info: <Icon category="utility" name="info" />,
	offline: <Icon category="utility" name="offline" />,
	warning: <Icon category="utility" name="warning" />,
	error: <Icon category="utility" name="error" />,
};

/**
 * Alert banners communicate a state that affects the entire system, not just a feature or page.
 * It persists over a session and appears without the user initiating the action.
 */
const Alert = ({
	assistiveText: propAssistiveText,
	className,
	dismissible,
	icon: propIcon,
	labels: propLabels,
	onClickHeadingLink,
	onRequestClose,
	style,
	variant = 'info',
}: AlertProps): React.ReactElement => {
	const [isInitialRender, setIsInitialRender] = useState(true);
	const closeButtonRef = useRef<HTMLButtonElement | null>(null);

	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };
	const labels = { ...defaultLabels, ...propLabels };

	// Store focus on mount, restore on unmount
	useEffect(() => {
		return () => {
			DOMElementFocus.returnFocusToStoredElement();
		};
	}, []);

	const saveButtonRef = useCallback((component: HTMLButtonElement | null) => {
		closeButtonRef.current = component;
		if (isInitialRender && component) {
			DOMElementFocus.storeActiveElement();
			component.focus();
			setIsInitialRender(false);
		}
	}, [isInitialRender]);

	// Get the icon to display
	const icon = propIcon || defaultIcons[variant];

	const clonedIcon = React.isValidElement(icon)
		? React.cloneElement(icon as React.ReactElement<{ containerClassName?: string; inverse?: boolean; size?: string }>, {
				containerClassName: 'slds-m-right_x-small',
				inverse: true,
				size: 'x-small',
		  })
		: icon;

	return (
		<div
			className={classNames(
				'slds-notify slds-notify_alert slds-theme_alert-texture',
				{
					'slds-theme_info': variant === 'info',
					'slds-theme_warning': variant === 'warning',
					'slds-theme_error': variant === 'error',
					'slds-theme_offline': variant === 'offline',
				},
				className as string
			)}
			role="alert"
			style={style}
		>
			<span className="slds-assistive-text">
				{assistiveTextVariant[variant]}
			</span>
			{clonedIcon}
			<h2>
				{labels.heading}{' '}
				{labels.headingLink && (
					<a
						onClick={EventUtil.trappedHandler(onClickHeadingLink)}
						href="#"
					>
						{labels.headingLink}
					</a>
				)}
			</h2>
			{dismissible && (
				<Button
					assistiveText={{ icon: assistiveText.closeButton as string }}
					buttonRef={saveButtonRef}
					className="slds-notify__close"
					iconCategory="utility"
					iconName="close"
					iconSize="medium"
					inverse
					onClick={onRequestClose}
					title={assistiveText.closeButton as string}
					variant="icon"
				/>
			)}
		</div>
	);
};

Alert.displayName = ALERT;

export default Alert;















