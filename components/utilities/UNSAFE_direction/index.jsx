/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';

// Constants to specify directions: Left-to-Right (ltr) or Right-to-Left (rtl)
const DIRECTIONS = {};
DIRECTIONS.LTR = 'ltr';
DIRECTIONS.RTL = 'rtl';

/*
 * Use this React context to wrap your component(s) to specify direction. Use either `DIRECTIONS.LTR` (ltr) or `DIRECTIONS.LTR` (rtl).
 * It's also expected that the `HTML` document of your markup has `dir='ltr'` or `dir='rtl'` attribute set.
 * The dir attribute is essential to set the direction of text to display and enable HTML in right-to-left.
 * For instance, setting `dir='rtl'` will cause block elements and table columns to start on the right and flow from right to left.
 *
 * Note: (1) This context is prefixed with UNSAFE because it is not a publicly supported feature.
 *       (2) When testing this feature in the storybooks, styles consumed from `salesforce-lightning-design-system.css` may appear broken.
 *           This is expected since Design System React loads only the LTR version since SLDS doesn't ship a static version of RTL.
 * Example on how to use the context to set your component right-to-left:
 * <UNSAFE_DirectionSettings.Provider value="rtl">
 *      <Combobox ... />
 * </UNSAFE_DirectionSettings.Provider>
 */
// eslint-disable-next-line camelcase
const UNSAFE_DirectionSettings = React.createContext('ltr');

// eslint-disable-next-line camelcase
export { UNSAFE_DirectionSettings as default, DIRECTIONS };
