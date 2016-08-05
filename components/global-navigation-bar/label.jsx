/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # GlobalNavigationBar Label Component

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### classNames
import classNames from 'classnames';

// ## Constants
import { GLOBAL_NAVIGATION_BAR_LABEL } from '../../utilities/constants';

/**
 * Wraps text in the proper markup and removes link styling to support use in the GlobalNavigationBar.
 */
const GlobalNavigationBarLabel = (props) => {
	// Separate props we care about in order to pass others along passively to the `span` tag
	const {
		className,
		label,
		...other
	} = props;

	return (
		<li className="slds-context-bar__item slds-no-hover">
			<span
				// inline style override
				style={{ color: '#16325c' }}
				className={classNames('slds-context-bar__label-action', className)}
				{...other}
			>
				<span className="slds-truncate">{label}</span>
			</span>
		</li>
	);
};

GlobalNavigationBarLabel.displayName = GLOBAL_NAVIGATION_BAR_LABEL;

// ### Prop Types
GlobalNavigationBarLabel.propTypes = {
	/**
	 * Class names to be added to the `span` element
	 */
	className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
	/**
	 * Text to show
	 */
	label: PropTypes.string
};

module.exports = GlobalNavigationBarLabel;
