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

import { BADGE_ICON } from '../../../utilities/constants';

/**
 * This is a non-interactive wrapper component for `UtilityIcon` that specifies badge icon classes for an icon inside a `badge` tag. Use of this component by itself is not recommended, but should be used as part of other components to obtain the correct styling for icons within badges. It does not return a `badge`. It only returns an icon for use within a badge. Assistive text must also be rendered by the parent.
 */
const BadgeIcon = (props) => {
	checkProps(BADGE_ICON, props);

	return (
		<span
			className={classNames('slds-badge__icon', {
				'slds-badge__icon_right': props.position === 'right',
				'slds-badge__icon_left': props.position === 'left',
			})}
		>
			<span
				className={classNames(
					'slds-icon_container',
					'slds-current-color',
					`slds-icon-${props.category}-${props.name}`
				)}
				title={props.title}
			>
				<SLDSUtilityIcon
					aria-hidden="true"
					category={props.category}
					className={classNames(
						'slds-icon',
						'slds-icon_xx-small',
						{
							[`slds-icon_${props.position}`]: props.position,
						},
						props.className
					)} // iconClassName has been deprecated
					icon={props.icon}
					name={props.name}
					path={props.path}
				/>
			</span>
		</span>
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
	 * Adds additional spacing on the opposite side specified between badge icon and the badge label
	 */
	position: PropTypes.oneOf(['left', 'right']),
	/**
	 * Size of the icon. Visit [lightningdesignsystem.com/components/icons/#flavor-sizes](https://www.lightningdesignsystem.com/components/icons/#flavor-sizes)
	 */
	size: PropTypes.oneOf(['xx-small', 'small', 'medium', 'large']),
};

const defaultProps = {
	category: 'utility',
	size: 'xx-small',
};

BadgeIcon.displayName = BADGE_ICON;
BadgeIcon.propTypes = propTypes;
BadgeIcon.defaultProps = defaultProps;

export default BadgeIcon;
