/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable react/jsx-no-literals */

// ### React
import React from 'react';

// ## Constants
import { DEPRECATED_WARNING } from '../../../utilities/constants';

import Alert from '../../alert';
import AlertContainer from '../../alert/container';

/**
 * A utility component that is used to highlight a deprecated component.
 */
const DeprecatedWarning = () => (
	<div className="slds-p-top_x-large">
		<AlertContainer>
			<Alert
				labels={{
					heading: (
						<span>
							<strong>Deprecated component.</strong> No fit and finish bug fixes
							will be accepted for this component.
						</span>
					),
				}}
				variant="error"
			/>
		</AlertContainer>
	</div>
);

// ### Display Name
DeprecatedWarning.displayName = DEPRECATED_WARNING;

export default DeprecatedWarning;
