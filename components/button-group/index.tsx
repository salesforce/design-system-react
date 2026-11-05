/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useId, type ReactNode, type ReactElement } from 'react';
import classNames from 'classnames';
import { BUTTON_GROUP } from '../../utilities/constants';
import type { ButtonProps } from '../button';
import type { CheckboxProps } from '../checkbox';
import type { MenuDropdownProps } from '../menu-dropdown';
import type { ChildrenOf } from '../../types/common';

/**
 * Button group variant types
 */
export type ButtonGroupVariant = 'checkbox' | 'list';

/**
 * Labels for ButtonGroup
 */
export interface ButtonGroupLabels {
	/** Error message to display */
	error?: string;
	/** Label above the button group */
	label?: string;
}

/**
 * Props for the ButtonGroup component
 */
export interface ButtonGroupProps {
	/**
	 * `Button`, `MenuDropdown` or, for the `checkbox` variant, `Checkbox` elements. The last
	 * child gets `slds-button_last` added to its `triggerClassName`. Checkbox children default
	 * to `variant="button-group"` and are described by `labels.error`.
	 */
	children: ChildrenOf<ButtonProps | MenuDropdownProps | CheckboxProps>;
	/** CSS classes for the button group */
	className?: string | string[] | Record<string, boolean>;
	/** CSS classes for the fieldset container */
	classNameContainer?: string | string[] | Record<string, boolean>;
	/** Unique identifier */
	id?: string;
	/** Text labels */
	labels?: ButtonGroupLabels;
	/** Button group variant */
	variant?: ButtonGroupVariant;
}

const defaultLabels: ButtonGroupLabels = {};

/**
 * The ButtonGroup component wraps other components (Button, MenuDropdown, Checkbox, etc).
 */
const ButtonGroup = ({
	children,
	className,
	classNameContainer,
	id: propId,
	labels: propLabels,
	variant,
}: ButtonGroupProps): React.ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;
	const labels = { ...defaultLabels, ...propLabels };

	const childArray = React.Children.toArray(children);
	let lastElementIndex = -1;
	childArray.forEach((child, index) => {
		if (React.isValidElement(child)) lastElementIndex = index;
	});
	let processedChildren: ReactNode = children;

	// Add slds-button_last class to the last button (for non-checkbox, non-list variants)
	if (childArray.length > 1 && !variant) {
		processedChildren = childArray.map((child, index) => {
			if (index === lastElementIndex && React.isValidElement(child)) {
				const { triggerClassName } = child.props as {
					triggerClassName?: MenuDropdownProps['triggerClassName'];
				};
				return React.cloneElement(
					child as ReactElement<{ triggerClassName?: string }>,
					{
						triggerClassName: classNames(
							triggerClassName as string,
							'slds-button_last'
						),
					}
				);
			}
			return child;
		});
	}

	let component: ReactElement;

	if (variant === 'checkbox') {
		// Checkbox button group
		const errorId = labels.error ? `button-group-error-${id}` : undefined;
		const checkboxChildren = React.Children.map(children, (child) => {
			if (React.isValidElement<CheckboxProps>(child)) {
				return React.cloneElement(child, {
					variant: child.props.variant ?? 'button-group',
					'aria-describedby':
						classNames(child.props['aria-describedby'], errorId) || undefined,
				});
			}
			return child;
		});

		component = (
			<div
				className={classNames(
					'slds-checkbox_button-group',
					className as string
				)}
				id={id}
			>
				{checkboxChildren}
			</div>
		);
	} else if (variant === 'list') {
		// List variant
		component = (
			<ul
				className={classNames('slds-button-group-list', className as string)}
				id={id}
			>
				{React.Children.map(children, (child) => (
					<li>{child}</li>
				))}
			</ul>
		);
	} else {
		// Default button group
		component = (
			<div
				className={classNames('slds-button-group', className as string)}
				id={id}
				role="group"
			>
				{processedChildren}
			</div>
		);
	}

	// Wrap in fieldset if checkbox variant or has label
	if (variant === 'checkbox' || labels.label) {
		return (
			<fieldset
				className={classNames(
					'slds-form-element',
					{ 'slds-has-error': labels.error },
					classNameContainer as string
				)}
			>
				<legend className="slds-form-element__legend slds-form-element__label">
					{labels.label}
				</legend>
				<div className="slds-form-element__control">
					{component}
					{labels.error && (
						<div
							className="slds-form-element__help"
							id={`button-group-error-${id}`}
						>
							{labels.error}
						</div>
					)}
				</div>
			</fieldset>
		);
	}

	return component;
};

ButtonGroup.displayName = BUTTON_GROUP;

export default ButtonGroup;
