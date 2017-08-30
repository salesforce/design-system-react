/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

import Svg from './svg';

import * as SLDS_ICONS_UTILITY from '../../../icons/utility';
import * as SLDS_ICONS_ACTION from '../../../icons/action';
import * as SLDS_ICONS_CUSTOM from '../../../icons/custom';
import * as SLDS_ICONS_DOCTYPE from '../../../icons/doctype';
import * as SLDS_ICONS_STANDARD from '../../../icons/standard';

const UtilityIcon = ({
	name = '',
	assistiveText, // eslint-disable-line no-unused-vars
	category,
	icon,
	path,
	...rest
}, context) => {
	checkProps('UtilityIcon', { name, category, path, context });

	let data;

	if (!path) {
		if (icon) {
			data = icon;
		} else {
			switch (category) {
				case 'action':
					if (Object.keys(SLDS_ICONS_ACTION).length > 1) {
						data = SLDS_ICONS_ACTION[name.toLowerCase()];
						data.viewBox = SLDS_ICONS_ACTION.viewBox;
					}
					break;
				case 'custom':
					if (Object.keys(SLDS_ICONS_CUSTOM).length > 1) {
						data = SLDS_ICONS_CUSTOM[name.toLowerCase()];
						data.viewBox = SLDS_ICONS_CUSTOM.viewBox;
					}
					break;
				case 'doctype':
					if (Object.keys(SLDS_ICONS_DOCTYPE).length > 1) {
						data = SLDS_ICONS_DOCTYPE[name.toLowerCase()];
						data.viewBox = SLDS_ICONS_DOCTYPE.viewBox;
					}
					break;
				case 'standard':
					if (Object.keys(SLDS_ICONS_STANDARD).length > 1) {
						data = SLDS_ICONS_STANDARD[name.toLowerCase()];
						data.viewBox = SLDS_ICONS_STANDARD.viewBox;
					}
					break;
				case 'utility':
				default:
					if (Object.keys(SLDS_ICONS_UTILITY).length > 1) {
						data = SLDS_ICONS_UTILITY[name.toLowerCase()];
						data.viewBox = SLDS_ICONS_UTILITY.viewBox;
					}
					break;
			}
		}
	}

	// Use icon path prop if set, then see if a global path is set, if not use inline icons
	const modifiedPath = path || (context.iconPath && `${context.iconPath}/${category}-sprite/svg/symbols.svg#${name}`);

	const output = modifiedPath && !icon
		? (<svg {...rest}>
			<use xlinkHref={modifiedPath} />
		</svg>)
		: (<Svg data={data} name={name} {...rest} />);

	return output;
};

UtilityIcon.displayName = 'UtilityIcon';

UtilityIcon.propTypes = {
	category: PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
	/**
   * An SVG object to use instead of name / category, look in `design-system-react/icons` for examples
   */
	icon: PropTypes.object,
	/**
   * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
   */
	name: PropTypes.string,
	/**
   * Path to the icon. This will override any global icon settings.
   */
	path: PropTypes.string
};

UtilityIcon.defaultProps = {
	category: 'utility'
};

UtilityIcon.contextTypes = {
	iconPath: PropTypes.string
};

module.exports = UtilityIcon;
