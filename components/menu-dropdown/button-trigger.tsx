/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Dropdown Trigger Component (Simple Button Flavor) --- SLDS for React

import React, { forwardRef, type ReactElement, type ReactNode } from 'react';
import classnames from 'classnames';

import Button from '../button';
import { MENU_DROPDOWN_TRIGGER } from '../../utilities/constants';

export interface ButtonTriggerProps {
	/** Text that is visually hidden but read aloud by screenreaders */
	assistiveText?: Record<string, unknown>;
	/** Child elements (typically a Button) */
	children?: ReactElement;
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
	iconSize?: 'x-small' | 'small' | 'medium' | 'large';
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
 * If this component has children, it does not render itself to the DOM.
 * Instead, it renders its child element, `Button`, and all that child's properties.
 * This component may be used as a template to create custom triggers that do not use `Button`.
 */
const ButtonTrigger = forwardRef<HTMLDivElement, ButtonTriggerProps>(
	(props, ref) => {
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
			triggerRef,
			triggerClassName,
			variant,
		} = props;

		const openOn = openOnProp === 'hover' ? 'click' : openOnProp;

		// Trigger manipulation
		let propsFromGrandchildButton: Record<string, unknown> = {};

		// If there are children, extract props from the Button child
		if (React.Children.count(children) !== 0) {
			React.Children.forEach(children, (child) => {
				if (
					child &&
					React.isValidElement(child) &&
					(child.type as { displayName?: string })?.displayName === Button.displayName
				) {
					propsFromGrandchildButton = child.props as Record<string, unknown>;
				}
			});
		}

		// If Trigger has a Button child, then use the explicitly declared child's props
		// layered on top of those passed down by dropdown's props to allow manual override
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
				<Button
					assistiveText={assistiveText}
					className={className}
					disabled={disabled}
					hint={hint}
					iconCategory={iconCategory}
					iconName={iconName}
					iconPosition={iconPosition}
					iconSize={iconSize}
					iconVariant={iconVariant}
					inverse={inverse}
					label={label}
					style={style}
					tabIndex={tabIndex}
					tooltip={tooltip}
					variant={variant}
					aria-expanded={isOpen}
					aria-haspopup
					{...propsFromGrandchildButton}
					buttonRef={triggerRef}
				/>
				{menu}
			</div>
		);
	}
);

ButtonTrigger.displayName = MENU_DROPDOWN_TRIGGER;

export default ButtonTrigger;
