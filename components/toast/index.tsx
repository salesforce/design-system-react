/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
	type ReactElement,
	type ReactNode,
	type CSSProperties,
} from 'react';
import classNames from '../../utilities/class-names';
import EventUtil from '../../utilities/event';
import Button from '../button';
import Icon, { type IconProps } from '../icon';
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
 * What caused a Toast close request
 */
export type ToastRequestCloseTrigger = 'timeout' | 'close-button';

/**
 * Data passed to `onRequestClose`
 */
export interface ToastRequestCloseData {
	/** What caused the request: the close button was clicked, or `duration` elapsed */
	trigger: ToastRequestCloseTrigger;
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
	/**
	 * `Icon` shown before the message (defaults to variant-specific icon). Its `size` and
	 * `inverse` default to 'small' and `true`; its `containerClassName` is added to the spacing classes.
	 */
	icon?: ReactElement<IconProps>;
	/** Text labels */
	labels?: ToastLabels;
	/** Callback when heading link is clicked */
	onClickHeadingLink?: (event: React.MouseEvent) => void;
	/**
	 * Callback when close button is clicked or duration expires. `event` is the close
	 * button click, or `undefined` when the `duration` timer fires. `data.trigger` is
	 * `'close-button'` or `'timeout'`.
	 */
	onRequestClose?: (
		event: React.MouseEvent<HTMLButtonElement> | undefined,
		data: ToastRequestCloseData
	) => void;
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

	// Keep the latest callback in a ref so a new (e.g. inline) `onRequestClose`
	// on each parent render does not restart the auto-dismiss timer.
	const onRequestCloseRef = useRef(onRequestClose);
	useEffect(() => {
		onRequestCloseRef.current = onRequestClose;
	}, [onRequestClose]);

	const handleTimeout = useCallback(() => {
		clearTimeoutRef();
		onRequestCloseRef.current?.(undefined, { trigger: 'timeout' });
	}, [clearTimeoutRef]);

	const handleCloseButtonClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			onRequestClose?.(event, { trigger: 'close-button' });
		},
		[onRequestClose]
	);

	// Set up auto-dismiss timer
	useEffect(() => {
		if (duration) {
			timeoutRef.current = setTimeout(handleTimeout, duration);
		}
		return () => {
			clearTimeoutRef();
			DOMElementFocus.returnFocusToStoredElement();
		};
	}, [duration, handleTimeout, clearTimeoutRef]);

	// Handle initial focus
	const saveToastRef = useCallback(
		(element: HTMLDivElement | null) => {
			toastRef.current = element;
			if (isInitialRender && element) {
				DOMElementFocus.storeActiveElement();
				element.focus();
				setIsInitialRender(false);
			}
		},
		[isInitialRender]
	);

	// Get the icon to display
	const icon = propIcon || defaultIcons[variant];

	const clonedIcon = React.isValidElement<IconProps>(icon)
		? React.cloneElement(icon, {
				containerClassName: classNames(
					'slds-m-right_small slds-no-flex slds-align-top',
					icon.props.containerClassName
				),
				inverse: icon.props.inverse ?? true,
				size: icon.props.size ?? 'small',
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
						<a onClick={EventUtil.trappedHandler(onClickHeadingLink)} href="#">
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
				onClick={handleCloseButtonClick}
				title={assistiveText.closeButton as string}
				variant="icon"
			/>
		</div>
	);
};

Toast.displayName = TOAST;

export default Toast;
