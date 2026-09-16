/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Button design pattern](https://lightningdesignsystem.com/components/buttons/) in React.

import React, {
	useEffect,
	useRef,
	forwardRef,
	type MouseEvent,
	type FocusEvent,
	type KeyboardEvent,
	type CSSProperties,
	type ReactNode,
	type ForwardedRef,
} from 'react';
import classNames from 'classnames';
// These imports use the old JSX files for now until they're converted
import ButtonIcon from '../icon/button-icon/index.jsx';
import Tooltip from '../tooltip/index.jsx';
import getAriaProps from '../../utilities/get-aria-props';
import getDataProps from '../../utilities/get-data-props';
import getFormProps from '../../utilities/get-form-props';
import { BUTTON } from '../../utilities/constants';
import type { IconCategory } from '../../types/common';

/**
 * Button variant types
 */
export type ButtonVariant =
	| 'base'
	| 'link'
	| 'neutral'
	| 'brand'
	| 'outline-brand'
	| 'destructive'
	| 'success'
	| 'text-destructive'
	| 'icon';

/**
 * Button icon variant types
 */
export type ButtonIconVariant =
	| 'bare'
	| 'container'
	| 'border'
	| 'border-filled'
	| 'brand'
	| 'more'
	| 'global-header';

/**
 * Button icon size types
 */
export type ButtonIconSize = 'x-small' | 'small' | 'medium' | 'large';

/**
 * Button type attribute
 */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Icon position relative to label
 */
export type IconPosition = 'left' | 'right';

/**
 * Assistive text for button
 */
export interface ButtonAssistiveText {
	icon?: string;
}

/**
 * Props for the Button component
 */
export interface ButtonProps {
	/** Assistive text for accessibility */
	assistiveText?: ButtonAssistiveText | string;
	/** Callback for DOM reference */
	buttonRef?: (ref: HTMLButtonElement | null) => void;
	/** Additional CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Child elements */
	children?: ReactNode;
	/** Disabled state */
	disabled?: boolean;
	/** Hint styling for icon buttons */
	hint?: boolean;
	/** Icon category */
	iconCategory?: IconCategory;
	/** CSS classes for icon */
	iconClassName?: string | string[] | Record<string, boolean>;
	/** Icon name */
	iconName?: string;
	/** Direct path to icon sprite */
	iconPath?: string;
	/** Icon position */
	iconPosition?: IconPosition;
	/** Icon size */
	iconSize?: ButtonIconSize;
	/** Icon variant */
	iconVariant?: ButtonIconVariant;
	/** Unique identifier */
	id?: string;
	/** Inverse colors for dark backgrounds */
	inverse?: boolean;
	/** Visible button label */
	label?: ReactNode;
	/** Blur event handler */
	onBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
	/** Click event handler */
	onClick?: (event: MouseEvent<HTMLButtonElement>, data?: { id?: string }) => void;
	/** Focus event handler */
	onFocus?: (event: FocusEvent<HTMLButtonElement>) => void;
	/** Key down event handler */
	onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
	/** Key press event handler */
	onKeyPress?: (event: KeyboardEvent<HTMLButtonElement>) => void;
	/** Key up event handler */
	onKeyUp?: (event: KeyboardEvent<HTMLButtonElement>) => void;
	/** Mouse down event handler */
	onMouseDown?: (event: MouseEvent<HTMLButtonElement>) => void;
	/** Mouse enter event handler */
	onMouseEnter?: (event: MouseEvent<HTMLButtonElement>) => void;
	/** Mouse leave event handler */
	onMouseLeave?: (event: MouseEvent<HTMLButtonElement>) => void;
	/** Mouse up event handler */
	onMouseUp?: (event: MouseEvent<HTMLButtonElement>) => void;
	/** Request focus callback */
	onRequestFocus?: (element: HTMLButtonElement) => void;
	/** Trigger onRequestFocus */
	requestFocus?: boolean;
	/** Responsive width on small screens */
	responsive?: boolean;
	/** Custom inline styles */
	style?: CSSProperties;
	/** Tab index */
	tabIndex?: number | string;
	/** HTML title attribute */
	title?: string;
	/** Tooltip content (deprecated) */
	tooltip?: ReactNode;
	/** Button type attribute */
	type?: ButtonType;
	/** Button variant */
	variant?: ButtonVariant;
	/** Allow any additional props for aria-*, data-*, form* */
	[key: `aria-${string}`]: string | boolean | undefined;
	[key: `data-${string}`]: string | number | boolean | undefined;
	[key: `form${string}`]: string | undefined;
}

const defaultAssistiveText: ButtonAssistiveText = { icon: '' };

/**
 * The Button component is the Lightning Design System Button component.
 * Use for label buttons, icon buttons, or buttons with both labels and icons.
 *
 * Either a `label` or `assistiveText.icon` is required for accessibility.
 * For buttons that maintain selected/unselected states, use ButtonStateful.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
		const {
			assistiveText = defaultAssistiveText,
			buttonRef,
			children,
			className,
			disabled = false,
			hint = false,
			iconCategory,
			iconClassName,
			iconName,
			iconPath,
			iconPosition,
			iconSize = 'medium',
			iconVariant,
			id,
			inverse,
			label,
			onBlur,
			onClick,
			onFocus,
			onKeyDown,
			onKeyPress,
			onKeyUp,
			onMouseDown,
			onMouseEnter,
			onMouseLeave,
			onMouseUp,
			onRequestFocus,
			requestFocus,
			style,
			tabIndex,
			title,
			tooltip,
			type = 'button',
			variant = 'neutral',
			...restProps
		} = props;

		const internalRef = useRef<HTMLButtonElement | null>(null);

		useEffect(() => {
			if (requestFocus && onRequestFocus && internalRef.current) {
				onRequestFocus(internalRef.current);
			}
		}, [requestFocus, onRequestFocus]);

		const getClassName = (): string => {
			const isIcon = variant === 'icon';
			let computedIconVariant = iconVariant;
			const iconMore = iconVariant === 'more';
			const iconBorder = iconVariant === 'border';
			const iconGlobalHeader = iconVariant === 'global-header';

			const showButtonVariant =
				(variant !== 'base' &&
					!iconVariant &&
					!inverse &&
					variant !== 'link') ||
				iconVariant === 'bare';
			const plainInverseBtn = inverse && !isIcon;
			const plainInverseIcon =
				inverse && isIcon && !iconMore && !iconBorder;
			const moreInverseIcon = inverse && iconMore;
			const borderInverseIcon = inverse && iconBorder;

			// Reset to container style for the actual button CSS
			if (iconVariant === 'global-header') {
				computedIconVariant = 'container';
			}

			return classNames(
				{
					'slds-button': variant !== 'link',
					[`slds-button_${variant}`]: showButtonVariant,
					'slds-button_inverse': plainInverseBtn,
					'slds-button_icon-inverse': plainInverseIcon || moreInverseIcon,
					'slds-button_icon-border-inverse': borderInverseIcon,
					[`slds-button_icon-${computedIconVariant}`]:
						computedIconVariant && !borderInverseIcon,
					'slds-global-header__button_icon': iconGlobalHeader,
					[`slds-button_icon-${iconSize}`]:
						iconVariant && iconSize !== 'medium',
					'slds-button_reset': variant === 'link',
					'slds-text-link': variant === 'link',
				},
				className as string
			);
		};

		const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
			if (onClick) {
				onClick(event, { id });
			}
		};

		const renderIcon = (name?: string): React.ReactElement => {
			const computedIconSize =
				!iconSize || iconVariant ? undefined : iconSize;
			return (
				<ButtonIcon
					category={iconCategory || 'utility'}
					className={classNames(
						{
							'slds-global-header__icon': iconVariant === 'global-header',
						},
						iconClassName as string
					)}
					hint={hint}
					inverse={inverse}
					name={name}
					path={iconPath}
					position={iconPosition}
					size={computedIconSize}
				/>
			);
		};

		const renderLabel = (): ReactNode => {
			const iconOnly = iconName || iconPath;
			const assistiveTextIcon =
				typeof assistiveText === 'string'
					? assistiveText
					: {
							...defaultAssistiveText,
							...(assistiveText as ButtonAssistiveText),
					  }.icon;

			return iconOnly && assistiveTextIcon ? (
				<span className="slds-assistive-text">{assistiveTextIcon}</span>
			) : (
				label
			);
		};

		const renderButton = (): React.ReactElement => {
			const ariaProps = getAriaProps(restProps);
			const dataProps = getDataProps(restProps);
			const formProps = getFormProps(restProps);

			return (
				<button
					className={getClassName()}
					disabled={disabled}
					id={id}
					onBlur={onBlur}
					onClick={handleClick}
					onFocus={onFocus}
					onKeyDown={onKeyDown}
					onKeyPress={onKeyPress}
					onKeyUp={onKeyUp}
					onMouseDown={onMouseDown}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					onMouseUp={onMouseUp}
					ref={(node) => {
						internalRef.current = node;
						if (typeof ref === 'function') {
							ref(node);
						} else if (ref) {
							ref.current = node;
						}
						if (buttonRef) {
							buttonRef(node);
						}
					}}
					tabIndex={typeof tabIndex === 'string' ? parseInt(tabIndex, 10) : tabIndex}
					title={title}
					type={type}
					style={style}
					{...ariaProps}
					{...dataProps}
					{...formProps}
				>
					{iconPosition === 'right' ? renderLabel() : null}
					{iconName || iconPath ? renderIcon(iconName) : null}
					{iconVariant === 'more' ? (
						<ButtonIcon
							category="utility"
							name="down"
							size="x-small"
							className={iconClassName as string}
						/>
					) : null}
					{iconPosition === 'left' || !iconPosition ? renderLabel() : null}
					{children}
				</button>
			);
		};

		// Deprecated: wrap button in tooltip if tooltip prop is provided
		if (tooltip) {
			return <Tooltip content={tooltip}>{renderButton()}</Tooltip>;
		}

		return renderButton();
	}
);

Button.displayName = BUTTON;

export default Button;
