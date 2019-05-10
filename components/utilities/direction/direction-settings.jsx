/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';

// Definition constants for Left-to-Right and Right-to-Left
const DIRECTIONS = {};
DIRECTIONS.LTR = 'ltr';
DIRECTIONS.RTL = 'rtl';

/*
 * Definition React context that defaults to left-to-right
 * Use this context to wrap your component(s) and pass in 'ltr' or 'rtl' to specify direction
 * It's also expected that the dom html document or your markup has `dir='ltr'` or `dir='rtl' attribute set.
 * The dir attribute is essential to set the direction of text to display and enable HTML in right-to-left.
 * For instance, setting `dir='rtl'` will cause block elements and table columns to start on the right and flow from right to left.
 *
 * Example on how to use this context for right-to-left:
 * <DirectionSettings.Provider value="rtl">
 *      <Combobox ... />
 * </DirectionSettings.Provider>
 */
const DirectionSettings = React.createContext('ltr');

export { DirectionSettings as default, DIRECTIONS };
