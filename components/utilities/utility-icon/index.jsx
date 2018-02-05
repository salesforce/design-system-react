/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

import Svg from './svg';

import SLDS_ICONS_UTILITY from '../../../icons/utility';
import SLDS_ICONS_ACTION from '../../../icons/action';
import SLDS_ICONS_CUSTOM from '../../../icons/custom';
import SLDS_ICONS_DOCTYPE from '../../../icons/doctype';
import SLDS_ICONS_STANDARD from '../../../icons/standard';

/*
 * If inline icons are present and icon bundle imports are not just an empty object, then inline icons will be used instead of external icons that require HTTP access.
 */
const UtilityIcon = (
	{
		name = '',
		assistiveText, // eslint-disable-line no-unused-vars
		category,
		icon,
		path,
		...rest
	},
	context,
) => {
	checkProps('UtilityIcon', { name, category, path, context });

	const inlineIcons = {
		action: SLDS_ICONS_ACTION,
		custom: SLDS_ICONS_CUSTOM,
		doctype: SLDS_ICONS_DOCTYPE,
		standard: SLDS_ICONS_STANDARD,
		utility: SLDS_ICONS_UTILITY,
	};
	let inlineData;

	if (icon) {
		// Use SVG data passed in with `icon` prop
		inlineData = icon;
	} else if (Object.keys(inlineIcons[category]).length) {
		// Use inline icon data if it exists. ENV variables will have to set to allow this.
		inlineData = inlineIcons[category][name.toLowerCase()];
		inlineData.viewBox = inlineIcons[category].viewBox;
	}

	let modifiedPath;

	if (path) {
		// Use `path` prop of Icon if present
		modifiedPath = path;
	} else if (context[`${category}Sprite`]) {
		// Use category sprite file from IconSettings if present
		modifiedPath = `${context[`${category}Sprite`]}#${name}`;
	} else {
		// Otherwise, use external URLs for icons
		modifiedPath =
			context.iconPath &&
			`${context.iconPath}/${category}-sprite/svg/symbols.svg#${name}`;
	}

	return inlineData ? (
		<Svg data={inlineData} name={name} {...rest} />
	) : (
		<svg {...rest}>
			<use xlinkHref={modifiedPath} />
		</svg>
	);
};

UtilityIcon.displayName = 'UtilityIcon';

UtilityIcon.propTypes = {
	assistiveText: PropTypes.string,
	category: PropTypes.oneOf([
		'action',
		'custom',
		'doctype',
		'standard',
		'utility',
	]),
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
	path: PropTypes.string,
};

UtilityIcon.defaultProps = {
	category: 'utility',
};

UtilityIcon.contextTypes = {
	iconPath: PropTypes.string,
	actionSprite: PropTypes.string,
	customSprite: PropTypes.string,
	doctypeSprite: PropTypes.string,
	standardSprite: PropTypes.string,
	utilitySprite: PropTypes.string,
};

export default UtilityIcon;
