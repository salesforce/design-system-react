/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import { PORTAL_SETTINGS } from '../../utilities/constants';

/**
 * The Portal Settings component allows for the portal parent node to be specified in all child components and is recommended to be used at the root of the application. It's render function is `return this.props.children`, so it can only have one child node.
 *
 * **renderTo Selector**
 * Use this to specify the portal node using a string that is compatiable with document.querySelector
 * ie.
 * ```
 * <PortalSettings renderTo="#portal-destination">
 * ```
 * *
 */
const PortalSettings = ({ renderTo, children }) => {
	return (
		<PortalSettingsContext.Provider
			value={{
				renderTo,
			}}
		>
			{children}
		</PortalSettingsContext.Provider>
	);
};

PortalSettings.displayName = PORTAL_SETTINGS;

PortalSettings.propTypes = {
	/**
	 * Selector for the destination container for portal elements
	 * example: `#portal-destination`
	 */
	renderTo: PropTypes.string,
};

const PortalSettingsContext = React.createContext({});

export default PortalSettings;
export { PortalSettingsContext };
