/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { useRef, useCallback, useImperativeHandle, forwardRef, type ReactNode, type KeyboardEvent, type MouseEvent, type FocusEvent } from 'react';
import classNames from 'classnames';
import { PILL } from '../../utilities/constants';
import UtilityIcon from '../utilities/utility-icon';
import KEYS from '../../utilities/key-code';
import EventUtil from '../../utilities/event';

/**
 * Pill variant types
 */
export type PillVariant = 'link' | 'option';

/**
 * Assistive text for Pill
 */
export interface PillAssistiveText {
	/** Remove button assistive text */
	remove?: string;
}

/**
 * Labels for Pill
 */
export interface PillLabels {
	/** Pill label text */
	label?: string;
	/** Title tooltip */
	title?: string;
	/** Remove icon title */
	removeTitle?: string;
}

/**
 * Props for the Pill component
 */
export interface PillProps {
	/** Assistive text for accessibility */
	assistiveText?: PillAssistiveText;
	/** Avatar element to display */
	avatar?: ReactNode;
	/** Use bare styling */
	bare?: boolean;
	/** Custom content (overrides label) */
	children?: ReactNode;
	/** CSS classes for the pill */
	className?: string | string[] | Record<string, boolean>;
	/** Show error styling */
	hasError?: boolean;
	/** URL for link variant */
	href?: string;
	/** Icon element to display */
	icon?: ReactNode;
	/** Text labels */
	labels?: PillLabels;
	/** Blur callback */
	onBlur?: (event: FocusEvent<HTMLSpanElement>) => void;
	/** Click callback */
	onClick?: (event?: MouseEvent<HTMLSpanElement | HTMLAnchorElement>) => void;
	/** Focus callback */
	onFocus?: (event: FocusEvent<HTMLSpanElement>) => void;
	/** Keydown callback */
	onKeyDown?: (event: KeyboardEvent<HTMLSpanElement>) => void;
	/** Remove callback */
	onRemove?: () => void;
	/** Pill variant */
	variant?: PillVariant;
}

/**
 * Ref methods for Pill
 */
export interface PillRef {
	/** Remove focus from the pill */
	blur: () => void;
	/** Give focus to the pill */
	focus: () => void;
}

const defaultLabels: PillLabels = {};
const defaultAssistiveText: PillAssistiveText = {};

/**
 * A pill displays a label that can contain links and can be removed from view.
 */
const Pill = forwardRef<PillRef, PillProps>(({
	assistiveText: propAssistiveText,
	avatar,
	bare,
	children,
	className,
	hasError,
	href,
	icon,
	labels: propLabels,
	onBlur,
	onClick,
	onFocus,
	onKeyDown,
	onRemove,
	variant = 'link',
}, ref) => {
	const rootRef = useRef<HTMLSpanElement | null>(null);
	const labels = { ...defaultLabels, ...propLabels };
	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };

	// Expose focus/blur methods via ref
	useImperativeHandle(ref, () => ({
		blur: () => rootRef.current?.blur(),
		focus: () => rootRef.current?.focus(),
	}));

	const getHref = useCallback(() => {
		return typeof href === 'string' ? href : '#';
	}, [href]);

	const handleKeyDown = useCallback((event: KeyboardEvent<HTMLSpanElement>) => {
		onKeyDown?.(event);
		if (event.defaultPrevented) return;

		switch (event.keyCode) {
			case KEYS.ENTER:
				if (onClick) {
					EventUtil.trap(event);
					onClick();
				}
				break;
			case KEYS.BACKSPACE:
			case KEYS.DELETE:
				if (onRemove) {
					EventUtil.trap(event);
					onRemove();
				}
				break;
			default:
				break;
		}
	}, [onClick, onKeyDown, onRemove]);

	const handleLinkClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
		if (getHref() === '#') {
			event.preventDefault();
		}
		onClick?.(event);
	}, [getHref, onClick]);

	// Render icon or avatar
	const renderIcon = () => {
		const iconElement = icon || avatar;
		if (iconElement) {
			return <span className="slds-pill__icon_container">{iconElement}</span>;
		}
		return null;
	};

	// Render label or children
	const renderLabel = () => {
		if (labels.label) {
			if (variant === 'link') {
				return (
					<a
						href={getHref()}
						className="slds-pill__action"
						title={labels.title || labels.label}
						onClick={handleLinkClick}
					>
						<span className="slds-pill__label">{labels.label}</span>
					</a>
				);
			}
			return (
				<span
					className="slds-pill__label"
					title={labels.title || labels.label}
				>
					{labels.label}
				</span>
			);
		}
		return children;
	};

	// Render remove icon
	const renderRemoveIcon = () => {
		if (onRemove) {
			return (
				<span
					className="slds-icon_container slds-pill__remove"
					title={labels.removeTitle}
					role="button"
					onClick={onRemove}
				>
					<UtilityIcon
						style={{ cursor: 'pointer' }}
						category="utility"
						className="slds-icon slds-icon_x-small slds-icon-text-default"
						name="close"
					/>
					<span className="slds-assistive-text">
						{assistiveText.remove || labels.removeTitle}
					</span>
				</span>
			);
		}
		return null;
	};

	// Determine role
	let role: string | undefined;
	if (variant === 'link') {
		role = 'button';
	} else if (variant === 'option') {
		role = 'option';
	}

	return (
		<span
			ref={rootRef}
			role={role}
			className={classNames(
				'slds-pill',
				{
					'slds-pill_link': variant === 'link',
					'slds-has-error': hasError,
					'slds-pill_bare': bare,
				},
				className as string
			)}
			onClick={!labels.label || variant !== 'link' ? onClick : undefined}
			onKeyDown={onRemove ? handleKeyDown : undefined}
			onBlur={onBlur}
			onFocus={onFocus}
		>
			{renderIcon()}
			{renderLabel()}
			{renderRemoveIcon()}
		</span>
	);
});

Pill.displayName = PILL;

export default Pill;















