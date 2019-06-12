/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ### Children
import SLDSUtilityIcon from '../../utilities/utility-icon';

import { BUTTON_ICON } from '../../../utilities/constants';

/**
 * This is a non-interactive wrapper component for `UtilityIcon` that specifies button icon classes for an icon inside a `button` tag. Use of this component by itself is not recommended, but should be used as part of other components to obtain the correct styling for icons within buttons. This component only partially implements [Button Icons](http://www.lightningdesignsystem.com/components/button-icons). It does not return a `button` HTML tag. It only returns an icon for use within a button. Assistive text must also be rendered by the parent.
 */
const ButtonIcon = (props) => {
	checkProps(BUTTON_ICON, props);

	return (
		<SLDSUtilityIcon
			aria-hidden="true"
			category={props.category}
			className={classNames(
				'slds-button__icon',
				{
					[`slds-button__icon_${props.size}`]:
						props.size && props.size !== 'medium',
					'slds-button__icon_inverse-hint': props.inverse && props.hint,
					'slds-button__icon_hint': props.hint && !props.inverse,
					[`slds-button__icon_${props.position}`]: props.position,
				},
				props.className
			)} // iconClassName has been deprecated
			icon={props.icon}
			name={props.name}
			path={props.path}
		/>
	);
};

const propTypes = {
	/**
	 * Icon category from [lightningdesignsystem.com/icons/](https://www.lightningdesignsystem.com/icons/)
	 */
	category: PropTypes.oneOf([
		'action',
		'custom',
		'doctype',
		'standard',
		'utility',
	]).isRequired,
	/**
	 * Associates an icon button with another element on the page by changes the color of the SVG. Please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#hint">Lightning Design System Buttons > Hint</a>.
	 */
	hint: PropTypes.bool,
	/**
	 * An SVG object to use instead of name / category, look in `design-system-react/icons` for examples
	 */
	icon: PropTypes.object,
	/**
	 * Class names to be added to the SVG.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Setting `inverse` to true will switch the color of the icon: light to dark, dark to light.
	 */
	inverse: PropTypes.bool,
	/**
	 * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
	 */
	name: PropTypes.string,
	/**
	 * Path to the icon. This will override any global icon settings.
	 */
	path: PropTypes.string,
	/**
	 * Adds additional spacing on the opposite side specified between button icon and the button label
	 */
	position: PropTypes.oneOf(['left', 'right']),
	/**
	 * Size of the icon. Visit [lightningdesignsystem.com/components/icons/#flavor-sizes](https://www.lightningdesignsystem.com/components/icons/#flavor-sizes)
	 */
	size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
};

const defaultProps = {
	category: 'utility',
	size: 'medium',
};

ButtonIcon.displayName = BUTTON_ICON;
ButtonIcon.propTypes = propTypes;
ButtonIcon.defaultProps = defaultProps;

export default ButtonIcon;
