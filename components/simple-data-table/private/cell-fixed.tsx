/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { ReactNode } from 'react';

interface CellFixedProps {
	children?: ReactNode;
}

/**
 * Used internally, provides fixed cell rendering
 */
const CellFixed: React.FC<CellFixedProps> = ({ children }) => (
	<div
		className="slds-cell-fixed"
		style={{
			display: 'flex',
			flexDirection: 'row',
			flexWrap: 'nowrap',
			lineHeight: '2rem',
		}}
	>
		{children}
	</div>
);

export default CellFixed;
