/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React
import React from 'react';

/**
 * Used internally, provides fixed cell rendering
 */
const CellFixed = (props) => (
	<div
		className="slds-cell-fixed"
		style={{
			display: 'flex',
			flexDirection: 'row',
			flexWrap: 'nowrap',
			lineHeight: '2rem',
		}}
	>
		{props.children}
	</div>
);

export default CellFixed;
