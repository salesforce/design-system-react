/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { createContext, type ReactNode } from 'react';
import { ICON_SETTINGS } from '../../utilities/constants';
import type { IconCategory } from '../../types/common';

/**
 * Context value shape for IconSettings
 */
export interface IconSettingsContextValue {
	/** Path to the root icon folder */
	iconPath?: string;
	/** Function to generate custom icon paths */
	onRequestIconPath?: (data: { category: IconCategory; name: string }) => string;
	/** Path to the action sprite */
	actionSprite?: string;
	/** Path to the custom sprite */
	customSprite?: string;
	/** Path to the doctype sprite */
	doctypeSprite?: string;
	/** Path to the standard sprite */
	standardSprite?: string;
	/** Path to the utility sprite */
	utilitySprite?: string;
}

/**
 * Props for the IconSettings component
 */
export interface IconSettingsProps extends IconSettingsContextValue {
	/** Child components that will have access to icon settings */
	children: ReactNode;
}

/**
 * Context for sharing icon settings across the component tree
 */
export const IconSettingsContext = createContext<IconSettingsContextValue>({});

/**
 * The Icon Settings component allows for the path to the icons to be specified in all child
 * components and is recommended to be used at the root of the application.
 *
 * **Individual sprites**
 * If you are using webpack it is advised to use the sprite properties
 * {actionSprite, standardSprite...} to specify the individual sprite paths so that webpack can
 * easily re-write the paths.
 *
 * ```tsx
 * import actionSprite from '......';
 *
 * <IconSettings actionSprite={actionSprite} ......>
 *   <App />
 * </IconSettings>
 * ```
 *
 * **Root icon path**
 * Otherwise use the iconPath to specify the root path to where the icon files will be located
 * in your application such as `/assets/icons`.
 */
const IconSettings = ({
	iconPath,
	onRequestIconPath,
	actionSprite,
	customSprite,
	doctypeSprite,
	standardSprite,
	utilitySprite,
	children,
}: IconSettingsProps): React.ReactElement => {
	const contextValue: IconSettingsContextValue = {
		iconPath,
		onRequestIconPath,
		actionSprite,
		customSprite,
		doctypeSprite,
		standardSprite,
		utilitySprite,
	};

	return (
		<IconSettingsContext.Provider value={contextValue}>
			{children}
		</IconSettingsContext.Provider>
	);
};

IconSettings.displayName = ICON_SETTINGS;

export default IconSettings;

