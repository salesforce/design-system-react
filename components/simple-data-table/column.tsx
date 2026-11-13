/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import { SIMPLE_DATA_TABLE_COLUMN } from '../../utilities/constants';
import type { SimpleDataTableColumnProps } from './types';

export type { SimpleDataTableColumnProps };

/**
 * Columns define the structure of the data displayed in the SimpleDataTable.
 * This component doesn't render anything - it's used for configuration.
 */
const SimpleDataTableColumn: React.FC<SimpleDataTableColumnProps> = () => {
	// This component doesn't render anything.
	// It's used as a configuration element parsed by SimpleDataTable.
	return null;
};

SimpleDataTableColumn.displayName = SIMPLE_DATA_TABLE_COLUMN;

export default SimpleDataTableColumn;
