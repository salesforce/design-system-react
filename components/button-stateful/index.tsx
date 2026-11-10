/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useCallback,
	useEffect,
	useState,
	type ReactNode,
	type MouseEvent,
	type FocusEvent,
	type KeyboardEvent,
} from 'react';
import classNames from 'classnames';

import ButtonIcon from '../icon/button-icon';
import getAriaProps from '../../utilities/get-aria-props';
import { BUTTON_STATEFUL } from '../../utilities/constants';
import checkProps from './check-props';
import componentDoc from './component.json';

/**
 * Button stateful variant types
 */
export type ButtonStatefulVariant =
	| 'base'
	| 'neutral'
	| 'brand'
	| 'destructive'
	| 'icon'
	| 'icon-filled'
	| 'inverse'
	| 'success'
	| 'text';

/**
 * State configuration for stateful button
 */
export interface ButtonStatefulState {
	/** Icon component or icon name */
	icon?: ReactNode;
	/** Icon name (if not using icon prop) */
	iconName?: string;
	/** Button label */
	label?: string;
}

/**
 * Assistive text for ButtonStateful
 */
export interface ButtonStatefulAssistiveText {
	/** Text for icon */
	icon?: string;
}

/**
 * Click event data for ButtonStateful
 */
export interface ButtonStatefulClickData {
	/** The requested next state: the inverse of the current `isActive`. */
	isActive: boolean;
}

export type ButtonStatefulClickHandler = (
	event: MouseEvent<HTMLButtonElement>,
	data: ButtonStatefulClickData
) => void;

/**
 * `onClick` is required unless the button is `disabled`: ButtonStateful is
 * controlled, so without it clicking does nothing.
 */
export type ButtonStatefulClickProps =
	| {
			/**
			 * Called on click with the requested next state in `data.isActive`. The
			 * rendered state only changes when `isActive` is updated. Required
			 * unless `disabled` is set.
			 */
			onClick: ButtonStatefulClickHandler;
	  }
	| { disabled: true; onClick?: ButtonStatefulClickHandler };

interface ButtonStatefulBaseProps {
	/**
	 * Whether the button is in its selected state. ButtonStateful is
	 * controlled: update this prop from `onClick`, which reports the requested
	 * next value in `data.isActive`.
	 */
	isActive: boolean;
	/** @deprecated Use `isActive` instead. */
	active?: boolean;
	/** Assistive text */
	assistiveText?: ButtonStatefulAssistiveText;
	/** CSS classes */
	className?: string;
	/** Disabled state */
	disabled?: boolean;
	/** Icon component */
	icon?: ReactNode;
	/** Icon name */
	iconName?: string;
	/** Icon size */
	iconSize?: string;
	/** HTML id */
	id?: string;
	/** Blur handler */
	onBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
	/** Focus handler */
	onFocus?: (event: FocusEvent<HTMLButtonElement>) => void;
	/** Key down handler */
	onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
	/** Key press handler */
	onKeyPress?: (event: KeyboardEvent<HTMLButtonElement>) => void;
	/** Key up handler */
	onKeyUp?: (event: KeyboardEvent<HTMLButtonElement>) => void;
	/** Mouse down handler */
	onMouseDown?: (event: MouseEvent<HTMLButtonElement>) => void;
	/** Mouse enter handler */
	onMouseEnter?: (event: MouseEvent<HTMLButtonElement>) => void;
	/** Scale to full width on small screens */
	responsive?: boolean;
	/** Initial/unselected state */
	stateOne?: ButtonStatefulState;
	/** Selected state */
	stateTwo?: ButtonStatefulState;
	/** Deselect/hover state */
	stateThree?: ButtonStatefulState;
	/** Tab index */
	tabIndex?: string;
	/** Button variant. `text` renders a stateful button with no border or background. */
	variant?: ButtonStatefulVariant;
}

/**
 * Props for the ButtonStateful component
 */
export type ButtonStatefulProps = ButtonStatefulBaseProps &
	ButtonStatefulClickProps;

const defaultAssistiveText: ButtonStatefulAssistiveText = { icon: '' };

const defaultStateOne: ButtonStatefulState = {
	iconName: 'add',
	label: 'Follow',
};
const defaultStateTwo: ButtonStatefulState = {
	iconName: 'check',
	label: 'Following',
};
const defaultStateThree: ButtonStatefulState = {
	iconName: 'close',
	label: 'Unfollow',
};

/**
 * The ButtonStateful component is a variant of the Lightning Design System Button component.
 * It is used for buttons that have a state of unselected or selected.
 */
const ButtonStateful = ({
	isActive: isActiveProp,
	active,
	assistiveText: propAssistiveText,
	className,
	disabled = false,
	icon,
	iconName,
	iconSize = 'medium',
	id,
	onBlur,
	onClick,
	onFocus,
	onKeyDown,
	onKeyPress,
	onKeyUp,
	onMouseDown,
	onMouseEnter,
	responsive = false,
	stateOne = defaultStateOne,
	stateTwo = defaultStateTwo,
	stateThree = defaultStateThree,
	tabIndex,
	variant,
	...rest
}: ButtonStatefulProps): React.ReactElement => {
	useEffect(() => {
		checkProps(BUTTON_STATEFUL, { active, disabled, onClick }, componentDoc);
	});

	// `active` is the deprecated name; `isActive` wins when both are passed.
	const isActive = !!(isActiveProp ?? active);

	// SLDS shows the hover/focus text ("Unfollow") on a focused selected button.
	// After a mouse click that would show the opposite of what was just chosen,
	// so mark the click with `slds-is-selected-clicked` until focus leaves.
	// Keyboard clicks (`detail === 0`) keep the focus text.
	const [isClicked, setIsClicked] = useState(false);

	const getClassName = useCallback(
		(active: boolean) =>
			classNames(className, 'slds-button', 'slds-button_stateful', {
				'slds-button_neutral':
					variant !== 'icon' &&
					variant !== 'icon-filled' &&
					variant !== 'success' &&
					variant !== 'text',
				'slds-button_inverse': variant === 'inverse',
				'slds-button_success': variant === 'success',
				'slds-not-selected': !active,
				// SLDS uses one or the other: `:focus` on `slds-is-selected` would win
				'slds-is-selected': active && !isClicked,
				'slds-is-selected-clicked': active && isClicked,
				'slds-max-small-button_stretch': responsive,
				'slds-button_icon-border': variant === 'icon',
				'slds-button_icon-border-filled': variant === 'icon-filled',
			}),
		[className, variant, responsive, isClicked]
	);

	const handleClick = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			setIsClicked(e.detail > 0);
			onClick?.(e, { isActive: !isActive });
		},
		[onClick, isActive]
	);

	const handleBlur = useCallback(
		(e: FocusEvent<HTMLButtonElement>) => {
			setIsClicked(false);
			onBlur?.(e);
		},
		[onBlur]
	);

	const defaultIconProps = {
		disabled,
		size: 'small' as const,
		className: 'slds-button__icon_stateful',
	};

	const iconAssistiveText = { ...defaultAssistiveText, ...propAssistiveText }
		.icon;

	// Accept aria-* props
	let ariaProps = getAriaProps(rest);

	if (variant === 'icon' || variant === 'icon-filled') {
		if (Object.keys(ariaProps).length === 0) {
			ariaProps = { 'aria-live': 'polite' as const };
		}

		return (
			<button
				{...ariaProps}
				className={getClassName(isActive)}
				disabled={disabled}
				id={id}
				onBlur={handleBlur}
				onClick={handleClick}
				onFocus={onFocus}
				onKeyDown={onKeyDown}
				onKeyPress={onKeyPress}
				onKeyUp={onKeyUp}
				onMouseDown={onMouseDown}
				onMouseEnter={onMouseEnter}
				tabIndex={tabIndex ? parseInt(tabIndex, 10) : undefined}
				type="button"
			>
				{icon ? (
					React.cloneElement(
						icon as React.ReactElement<Record<string, unknown>>,
						{
							...defaultIconProps,
							...((icon as React.ReactElement<Record<string, unknown>>).props ||
								{}),
						}
					)
				) : (
					<ButtonIcon
						disabled={disabled}
						name={iconName}
						size={iconSize as 'x-small' | 'small' | 'medium' | 'large'}
						className="slds-button__icon_stateful"
					/>
				)}
				{iconAssistiveText ? (
					<span className="slds-assistive-text">{iconAssistiveText}</span>
				) : null}
			</button>
		);
	}

	const defaultIconPropsWithPosition = {
		...defaultIconProps,
		position: 'left' as const,
	};

	if (Object.keys(ariaProps).length === 0) {
		ariaProps = { 'aria-live': 'assertive' as const };
	}

	return (
		<button
			{...ariaProps}
			className={getClassName(isActive)}
			disabled={disabled}
			id={id}
			onBlur={handleBlur}
			onClick={handleClick}
			onFocus={onFocus}
			onKeyDown={onKeyDown}
			onKeyPress={onKeyPress}
			onKeyUp={onKeyUp}
			onMouseDown={onMouseDown}
			onMouseEnter={onMouseEnter}
			tabIndex={tabIndex ? parseInt(tabIndex, 10) : undefined}
			type="button"
		>
			<span className="slds-text-not-selected">
				{stateOne.icon ? (
					React.cloneElement(
						stateOne.icon as React.ReactElement<Record<string, unknown>>,
						{
							...defaultIconPropsWithPosition,
							...((stateOne.icon as React.ReactElement<Record<string, unknown>>)
								.props || {}),
							size: 'small',
						}
					)
				) : (
					<ButtonIcon
						disabled={disabled}
						name={stateOne.iconName}
						size="small"
						position="left"
						className="slds-button__icon_stateful"
					/>
				)}
				{stateOne.label}
			</span>
			<span className="slds-text-selected">
				{stateTwo.icon ? (
					React.cloneElement(
						stateTwo.icon as React.ReactElement<Record<string, unknown>>,
						{
							...defaultIconPropsWithPosition,
							...((stateTwo.icon as React.ReactElement<Record<string, unknown>>)
								.props || {}),
							size: 'small',
						}
					)
				) : (
					<ButtonIcon
						disabled={disabled}
						name={stateTwo.iconName}
						size="small"
						position="left"
						className="slds-button__icon_stateful"
					/>
				)}
				{stateTwo.label}
			</span>
			<span className="slds-text-selected-focus">
				{stateThree.icon ? (
					React.cloneElement(
						stateThree.icon as React.ReactElement<Record<string, unknown>>,
						{
							...defaultIconPropsWithPosition,
							...((
								stateThree.icon as React.ReactElement<Record<string, unknown>>
							).props || {}),
							size: 'small',
						}
					)
				) : (
					<ButtonIcon
						disabled={disabled}
						name={stateThree.iconName}
						size="small"
						position="left"
						className="slds-button__icon_stateful"
					/>
				)}
				{stateThree.label}
			</span>
		</button>
	);
};

ButtonStateful.displayName = BUTTON_STATEFUL;

export default ButtonStateful;
