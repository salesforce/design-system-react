/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactNode } from 'react';
import { PORTAL_SETTINGS } from '../../utilities/constants';

/**
 * Portal settings context value
 */
export interface PortalSettingsContextValue {
	/** Selector for portal destination */
	renderTo?: string;
}

/**
 * Props for the PortalSettings component
 */
export interface PortalSettingsProps {
	/** Child components */
	children?: ReactNode;
	/** Selector for the destination container for portal elements (e.g., "#portal-destination") */
	renderTo?: string;
}

/**
 * Context for portal settings
 */
export const PortalSettingsContext = React.createContext<PortalSettingsContextValue>({});

/**
 * The Portal Settings component allows for the portal parent node to be specified
 * in all child components and is recommended to be used at the root of the application.
 */
const PortalSettings = ({
	renderTo,
	children,
}: PortalSettingsProps): React.ReactElement => {
	return (
		<PortalSettingsContext.Provider value={{ renderTo }}>
			{children}
		</PortalSettingsContext.Provider>
	);
};

PortalSettings.displayName = PORTAL_SETTINGS;

export default PortalSettings;















