/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useState, useEffect, useRef, useCallback, type ReactNode, type CSSProperties } from 'react';
import classNames from '../../utilities/class-names';
import EventUtil from '../../utilities/event';
import Button from '../button';
import Icon from '../icon';
import { TOAST } from '../../utilities/constants';
import DOMElementFocus from '../../utilities/dom-element-focus';

/**
 * Toast variant types
 */
export type ToastVariant = 'error' | 'info' | 'success' | 'warning';

/**
 * Assistive text for Toast
 */
export interface ToastAssistiveText {
	/** Close button assistive text */
	closeButton?: ReactNode;
	/** Error variant label */
	error?: string;
	/** Info variant label */
	info?: string;
	/** Success variant label */
	success?: string;
	/** Warning variant label */
	warning?: string;
}

/**
 * Labels for Toast
 */
export interface ToastLabels {
	/** Secondary text below heading */
	details?: ReactNode;
	/** Main heading content */
	heading?: ReactNode;
	/** Link text in heading */
	headingLink?: ReactNode;
}

/**
 * Props for the Toast component
 */
export interface ToastProps {
	/** Assistive text for accessibility */
	assistiveText?: ToastAssistiveText;
	/** CSS classes for the toast */
	className?: string | string[] | Record<string, boolean>;
	/** Auto-dismiss duration in milliseconds */
	duration?: number;
	/** Custom icon (defaults to variant-specific icon) */
	icon?: ReactNode;
	/** Text labels */
	labels?: ToastLabels;
	/** Callback when heading link is clicked */
	onClickHeadingLink?: (event: React.MouseEvent) => void;
	/** Callback when close button is clicked or duration expires */
	onRequestClose?: () => void;
	/** Custom styles */
	style?: CSSProperties;
	/** Toast type/severity */
	variant: ToastVariant;
}

const defaultAssistiveText: ToastAssistiveText = {
	closeButton: 'Close',
	error: 'error',
	info: 'info',
	success: 'success',
	warning: 'warning',
};

const defaultLabels: ToastLabels = {};

const defaultIcons: Record<ToastVariant, ReactNode> = {
	info: <Icon category="utility" name="info" />,
	success: <Icon category="utility" name="success" />,
	warning: <Icon category="utility" name="warning" />,
	error: <Icon category="utility" name="error" />,
};

/**
 * Toast serves as a feedback & confirmation mechanism after the user takes an action.
 */
const Toast = ({
	assistiveText: propAssistiveText,
	className,
	duration,
	icon: propIcon,
	labels: propLabels,
	onClickHeadingLink,
	onRequestClose,
	style,
	variant = 'info',
}: ToastProps): React.ReactElement => {
	const [isInitialRender, setIsInitialRender] = useState(true);
	const toastRef = useRef<HTMLDivElement | null>(null);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };
	const labels = { ...defaultLabels, ...propLabels };

	const clearTimeoutRef = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	}, []);

	const handleClose = useCallback(() => {
		clearTimeoutRef();
		onRequestClose?.();
	}, [clearTimeoutRef, onRequestClose]);

	// Set up auto-dismiss timer
	useEffect(() => {
		if (duration) {
			timeoutRef.current = setTimeout(handleClose, duration);
		}
		return () => {
			clearTimeoutRef();
			DOMElementFocus.returnFocusToStoredElement();
		};
	}, [duration, handleClose, clearTimeoutRef]);

	// Handle initial focus
	const saveToastRef = useCallback((element: HTMLDivElement | null) => {
		toastRef.current = element;
		if (isInitialRender && element) {
			DOMElementFocus.storeActiveElement();
			element.focus();
			setIsInitialRender(false);
		}
	}, [isInitialRender]);

	// Get the icon to display
	const icon = propIcon || defaultIcons[variant];

	const clonedIcon = React.isValidElement(icon)
		? React.cloneElement(icon as React.ReactElement<{ containerClassName?: string; inverse?: boolean; size?: string }>, {
				containerClassName: 'slds-m-right_small slds-no-flex slds-align-top',
				inverse: true,
				size: 'small',
		  })
		: icon;

	const assistiveTextVariant: Record<ToastVariant, string | undefined> = {
		info: assistiveText.info,
		success: assistiveText.success,
		warning: assistiveText.warning,
		error: assistiveText.error,
	};

	return (
		<div
			className={classNames(
				'slds-notify slds-notify_toast',
				{
					'slds-theme_info': variant === 'info',
					'slds-theme_success': variant === 'success',
					'slds-theme_warning': variant === 'warning',
					'slds-theme_error': variant === 'error',
				},
				className as string
			)}
			ref={saveToastRef}
			role="status"
			style={style}
			tabIndex={0}
		>
			<span className="slds-assistive-text">
				{assistiveTextVariant[variant]}
			</span>
			{clonedIcon}
			<div className="slds-notify__content">
				<h2 className="slds-text-heading_small">
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
				{labels.details && <p>{labels.details}</p>}
			</div>
			<Button
				assistiveText={{ icon: assistiveText.closeButton as string }}
				className="slds-notify__close"
				iconCategory="utility"
				iconName="close"
				iconSize="medium"
				inverse
				onClick={onRequestClose}
				title={assistiveText.closeButton as string}
				variant="icon"
			/>
		</div>
	);
};

Toast.displayName = TOAST;

export default Toast;















