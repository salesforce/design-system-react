/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # GlobalNavigationBar App Launcher Trigger

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

import isFunction from 'lodash.isfunction';

// ### Child Components
import Icon from '../icon';

// ### classNames
import classNames from 'classnames';

// ### Event Utilities
// Used for trapping events
import { EventUtil } from '../../utilities';

// ## Constants
import { GLOBAL_NAVIGATION_BAR_APPLICATION_NAME } from '../../utilities/constants';


const AppLauncher = React.createClass({
	displayName: GLOBAL_NAVIGATION_BAR_APPLICATION_NAME,
	propTypes: {
		/**
		 * Label given to "app" icon for users of assistive technology.
		 */
		assistiveText: PropTypes.string.isRequired,
		/**
		 * Helpful if you need an application name with custom markup.
		 */
		children: PropTypes.node,
		/**
		 * HTML `id` that will be added to the "app icon" link. Helpful for assistive technology if `onClick` triggers a dropdown menu.
		 */
		id: PropTypes.string.isRequired,
		/**
		 * This is typically the name of the cloud or application. `name` and `children` should not both be passed in.
		 */
		name: PropTypes.string,
		/**
		 * Function triggered when "app" icon or application name is clicked.
		 */
		onClick: PropTypes.func,
		/**
		 * Allows longer application names without truncating them.
		 */
		noTruncate: PropTypes.bool
	},

	handleClick (event) {
		if (isFunction(this.props.onClick)) {
			EventUtil.trap(event);
			this.props.onClick(event);
		}
	},

	render () {
		const {
			assistiveText,
			children,
			id,
			name,
			noTruncate
		} = this.props;

		// Should be removed in the future by adding a reset class of some sort.
		let style = noTruncate ? { maxWidth: 'none' } : null;

		/* eslint-disable no-script-url */
		return (
			<div className="slds-context-bar__item slds-no-hover" style={style}>
				<div className="slds-context-bar__icon-action">
					<a
						id={id}
						href="javascript:void(0);"
						onClick={this.handleClick}
						aria-haspopup="true"
						className="slds-button slds-button--icon slds-context-bar__button"
					>
						<Icon
							category="utility"
							name="apps"
							inverse={false}
							className="slds-icon--small"
							assistiveText={assistiveText}
						/>
					</a>
				</div>
				<span className="slds-context-bar__label-action slds-context-bar__app-name">
					{name ? <span className={classNames({ 'slds-truncate': !noTruncate })}>{name}</span> : null}
					{children}
				</span>
			</div>
		);
		/* eslint-enable no-script-url */
	}
});

module.exports = AppLauncher;
