/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # App Launcher Modal Header

// ## Dependencies

// ### React
import React from 'react';

// ## Children
import Button from '../button';
import Search from '../forms/input/search';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

// ## Constants
import { APP_LAUNCHER_MODAL_HEADER } from '../../utilities/constants';

const AppLauncherModalHeader = React.createClass({

	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: APP_LAUNCHER_MODAL_HEADER,

	// ### Prop Types
	propTypes: {
		// TODO: ADD PROPTYPE DESCRIPTIONS
		/*
		 * Set the App Launcher's title text (for localization)
		 */
		appLauncherTitle: PropTypes.string,
		/*
		 * Set the search input's placeholder text (for localization)
		 */
		searchPlaceholderText: PropTypes.string,
		/*
		 * Set the App Exchange Button's text (for localization)
		 */
		appExchangeButtonText: PropTypes.string
		// filterForSearch: PropTypes.func.isRequired,
		// search: PropTypes.string,
		// onSearchChange: PropTypes.func
	},

	getDefaultProps () {
		return {
			appLauncherTitle: 'App Launcher',
			searchPlaceholderText: 'Find an app',
			appExchangeButtonText: 'App Exchange'
		};
	},

	// handleSearchChange (value, e) {
	// 	e.stopPropagation();

	// 	if (value !== this.props.search && this.props.onSearchChange) {
	// 		this.props.onSearchChange(value, e);
	// 	}
	// },

	render () {
		return (
			<div className="slds-modal__header slds-app-launcher__header slds-grid slds-grid--align-spread slds-grid--vertical-align-center">
				<h2 className="slds-text-heading--medium">{this.props.appLauncherTitle}</h2>
				<div className="slds-app-launcher__header-search">
					<Search
						id="app-launcher-search"
						assistiveText="Find an app"
						placeholder={this.props.searchPlaceholderText}
					/>
				</div>
				<Button label={this.props.appExchangeButtonText} />
			</div>
		);
	}
});


module.exports = AppLauncherModalHeader;
