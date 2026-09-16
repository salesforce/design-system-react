/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useId, type ReactNode, type ReactElement } from 'react';
import classNames from 'classnames';
import { BUTTON_GROUP } from '../../utilities/constants';

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
	/** Button components to render */
	children: ReactNode;
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

	const childCount = React.Children.count(children);
	let processedChildren = children;

	// Add slds-button_last class to the last button (for non-checkbox, non-list variants)
	if (childCount > 1 && !variant) {
		processedChildren = React.Children.map(children, (child, index) => {
			if (index === childCount - 1 && React.isValidElement(child)) {
				return React.cloneElement(child as ReactElement<{ triggerClassName?: string }>, {
					triggerClassName: 'slds-button_last',
				});
			}
			return child;
		});
	}

	let component: ReactElement;

	if (variant === 'checkbox') {
		// Checkbox button group
		const checkboxChildren = React.Children.map(children, (child) => {
			if (React.isValidElement(child)) {
				const cloneProps: { variant?: string; 'aria-describedby'?: string } = {
					variant: 'button-group',
				};
				if (labels.error) {
					cloneProps['aria-describedby'] = `button-group-error-${id}`;
				}
				return React.cloneElement(child as ReactElement, cloneProps);
			}
			return child;
		});

		component = (
			<div
				className={classNames('slds-checkbox_button-group', className as string)}
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















