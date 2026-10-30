/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Dropdown Trigger Component (Simple Button Flavor) --- SLDS for React

import React, { forwardRef, type ReactElement, type ReactNode } from 'react';
import classnames from 'classnames';

import Button, { type ButtonProps } from '../button';
import { MENU_DROPDOWN_TRIGGER } from '../../utilities/constants';
import isElementOfType from '../../utilities/is-element-of-type';
import mergeProps, {
	renderTrigger,
	type TriggerRender,
} from '../../utilities/merge-props';

/**
 * Props MenuDropdown passes to a `trigger` that isn't a `Button`. The trigger `div` handles
 * clicks, focus, keys and hover, so the trigger only needs to be focusable and take `ref`.
 */
export interface MenuDropdownTriggerProps {
	'aria-expanded'?: boolean;
	'aria-haspopup': true;
	/** Includes the class MenuDropdown uses to ignore clicks on the trigger when closing */
	className?: string;
	disabled?: boolean;
	ref: (element: HTMLElement | null) => void;
	tabIndex?: number;
}

/**
 * Props MenuDropdown passes to its default trigger that aren't part of the public type.
 */
export interface ButtonTriggerInjectedProps {
	/** MenuDropdown's `trigger` */
	trigger?: TriggerRender<MenuDropdownTriggerProps>;
}

export interface ButtonTriggerProps {
	/** Text that is visually hidden but read aloud by screenreaders */
	assistiveText?: Record<string, unknown>;
	/** A `Button` element whose props override the ones MenuDropdown passes */
	children?: ReactElement<ButtonProps>;
	/** CSS classes to be added to triggering button */
	className?: string | string[] | Record<string, boolean>;
	/** A unique ID for accessibility support */
	id?: string;
	/** Whether the dropdown is inline */
	isInline?: boolean;
	/** Informs the trigger on the open/close state of the dropdown menu */
	isOpen?: boolean;
	/** The dropdown menu to render */
	menu?: ReactNode;
	/** Called when the trigger button loses focus */
	onBlur?: React.FocusEventHandler<HTMLDivElement>;
	/** Triggered when the trigger button is clicked */
	onClick?: React.MouseEventHandler<HTMLDivElement>;
	/** Called when the trigger button gains focus */
	onFocus?: React.FocusEventHandler<HTMLDivElement>;
	/** Called when a key is pressed */
	onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
	/** Called when mouse clicks down on the trigger button */
	onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
	/** Called when mouse hovers over the trigger button */
	onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
	/** Called when mouse hover leaves the trigger button */
	onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
	/** Determines if mouse hover or click opens the dropdown menu */
	openOn?: 'hover' | 'click' | 'hybrid';
	/** The ref of the actual triggering button */
	triggerRef?: (element: HTMLButtonElement | null) => void;
	/** CSS classes to be added to wrapping trigger div */
	triggerClassName?: string | string[] | Record<string, boolean>;
	/** Icon category passed from MenuDropdown */
	iconCategory?: 'action' | 'custom' | 'doctype' | 'standard' | 'utility';
	/** Icon name passed from MenuDropdown */
	iconName?: string;
	/** Icon position passed from MenuDropdown */
	iconPosition?: 'left' | 'right';
	/** Icon size passed from MenuDropdown */
	iconSize?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large';
	/** Icon variant passed from MenuDropdown */
	iconVariant?: 'bare' | 'container' | 'border' | 'border-filled' | 'more';
	/** Button variant passed from MenuDropdown */
	variant?: 'base' | 'neutral' | 'brand' | 'destructive' | 'icon';
	/** Whether to show hint styling */
	hint?: boolean;
	/** Whether the button is inverse */
	inverse?: boolean;
	/** Button label */
	label?: string | ReactNode;
	/** Disabled state */
	disabled?: boolean;
	/** Tooltip */
	tooltip?: ReactNode;
	/** Tab index */
	tabIndex?: string;
	/** Button style */
	style?: React.CSSProperties;
}

/**
 * The Dropdown Button Trigger renders the default trigger button for the dropdown menu.
 * If this component has a `Button` child, the child's props override the ones MenuDropdown passes.
 * Passing this component (or a custom trigger with its `displayName`) as a child of MenuDropdown
 * is deprecated: pass the `Button` or other element as MenuDropdown's `trigger` instead.
 */
const ButtonTrigger = forwardRef<
	HTMLDivElement,
	ButtonTriggerProps & ButtonTriggerInjectedProps
>((props, ref) => {
	const {
		assistiveText,
		children,
		className,
		disabled,
		hint,
		iconCategory,
		iconName,
		iconPosition,
		iconSize,
		iconVariant,
		id,
		inverse,
		isInline: _isInline,
		isOpen,
		label,
		onBlur,
		menu,
		onClick,
		onFocus,
		onKeyDown,
		onMouseDown,
		onMouseEnter,
		onMouseLeave,
		openOn: openOnProp,
		style,
		tabIndex,
		tooltip,
		trigger,
		triggerRef,
		triggerClassName,
		variant,
	} = props;

	const openOn = openOnProp === 'hover' ? 'click' : openOnProp;

	// The `trigger` element, or (deprecated) the Button child of this component
	const buttonElement: ReactNode =
		trigger === undefined
			? React.Children.toArray(children).find((child) =>
					isElementOfType<ButtonProps>(child, Button)
				)
			: (trigger as ReactNode);

	const buttonDefaults: Record<string, unknown> = {
		assistiveText,
		className,
		disabled,
		hint,
		iconCategory,
		iconName,
		iconPosition,
		iconSize,
		iconVariant,
		inverse,
		label,
		style,
		tabIndex,
		tooltip,
		variant,
		'aria-expanded': isOpen,
		'aria-haspopup': true,
	};

	let renderedTrigger: ReactNode;
	if (trigger !== undefined && !isElementOfType(trigger as ReactNode, Button)) {
		renderedTrigger = renderTrigger(trigger, {
			'aria-expanded': isOpen,
			'aria-haspopup': true,
			className: classnames(className as string) || undefined,
			disabled,
			ref: triggerRef as (element: HTMLElement | null) => void,
			tabIndex: tabIndex === undefined ? undefined : Number(tabIndex),
		});
	} else {
		// The Button's own props override MenuDropdown's
		const buttonProps = isElementOfType<ButtonProps>(buttonElement, Button)
			? (buttonElement.props as Record<string, unknown>)
			: {};
		const consumerButtonRef = buttonProps.buttonRef as ButtonProps['buttonRef'];
		renderedTrigger = (
			<Button
				{...(mergeProps(buttonDefaults, buttonProps) as ButtonProps)}
				buttonRef={
					consumerButtonRef
						? (element: HTMLButtonElement | null) => {
								consumerButtonRef(element);
								triggerRef?.(element);
							}
						: triggerRef
				}
			/>
		);
	}

	return (
		<div
			ref={ref}
			className={classnames(
				`slds-dropdown-trigger slds-dropdown-trigger_${openOn}`,
				{
					'slds-is-open': isOpen,
				},
				triggerClassName as string | string[] | Record<string, boolean>
			)}
			id={id}
			onBlur={onBlur}
			onClick={onClick}
			onKeyDown={onKeyDown}
			onFocus={onFocus}
			onMouseDown={onMouseDown}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{renderedTrigger}
			{menu}
		</div>
	);
});

ButtonTrigger.displayName = MENU_DROPDOWN_TRIGGER;

export default ButtonTrigger as React.ForwardRefExoticComponent<
	ButtonTriggerProps & React.RefAttributes<HTMLDivElement>
>;
