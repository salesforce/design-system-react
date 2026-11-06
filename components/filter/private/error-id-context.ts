/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { createContext } from 'react';

/**
 * The id of the error element rendered for a Filter, provided by `PanelFilterList` when it
 * renders one. A Filter only points `aria-describedby` at an element that exists.
 */
const FilterErrorIdContext = createContext<string | undefined>(undefined);

export default FilterErrorIdContext;
