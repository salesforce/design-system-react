/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React, { type MouseEvent } from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// A simple javascript utility for conditionally joining classNames together.
import classNames from 'classnames';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ## Children
import UtilityIcon from '../../utilities/utility-icon';
import Button from '../../button';
import type { IconCategory } from '../../../types/common';

// ## Constants
import { ICON_INPUT } from '../../../utilities/constants';

export interface InputIconProps {
	/**
	 * Icon category from [lightningdesignsystem.com/icons/](https://www.lightningdesignsystem.com/icons/)
	 */
	category?: string;
	/**
	 * This is only needed if an input contains two icons, the Input component handles this prop for you.
	 */
	iconPosition?: 'left' | 'right';
	/**
	 * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
	 */
	name?: string;
	/**
	 * Path to the icon. This will override any global icon settings.
	 */
	path?: string;
	/**
	 * This event fires when the icon is clicked.
	 */
	onClick?: (event: MouseEvent) => void;
	/**
	 * Changes styles of the InputIcon.
	 */
	variant?: 'base' | 'combobox';
	[key: string]: unknown;
}

/**
 * A wrapper for icons that will be rendered inside of an Input
 *
 * If the `onClick` function prop is provided, the `design-system-react/components/button` component is used.
 * If not, the icon will be an instance of `design-system-react/components/utilities/utility-icon`.
 * Checkout out the appropriate component to see what props can be passed along via the `{...props}` rest operator
 */
const InputIcon = ({
	category = 'utility',
	variant = 'base',
	iconPosition,
	name,
	path,
	onClick,
	...rest
}: InputIconProps): React.ReactElement => {
	// need to pass click event up on SVG

	const variants: Record<'combobox' | 'base', React.ReactElement> = {
		combobox: (
			<span className="slds-icon_container slds-input__icon slds-input__icon_right">
				<UtilityIcon
					aria-hidden
					category={category as IconCategory}
					className={classNames(
						'slds-icon slds-icon_x-small slds-icon-text-default'
					)}
					name={name}
					path={path}
					{...rest}
				/>
			</span>
		),
		base: (
			<UtilityIcon
				aria-hidden
				category={category as IconCategory}
				className={classNames('slds-input__icon slds-icon-text-default', {
					[`slds-input__icon_${iconPosition}`]: iconPosition,
				})}
				name={name}
				path={path}
				{...rest}
			/>
		),
	};

	return isFunction(onClick) ? (
		<Button
			className={classNames('slds-input__icon', {
				[`slds-input__icon_${iconPosition}`]: iconPosition,
			})}
			iconCategory={category as IconCategory}
			iconName={name}
			iconPath={path}
			onClick={onClick}
			variant="icon"
			{...rest}
		/>
	) : (
		variants[variant]
	);
};

InputIcon.displayName = ICON_INPUT;

export default InputIcon;
