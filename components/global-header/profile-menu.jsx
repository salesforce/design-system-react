/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Profile Menu Component

// ## Dependencies

// ### React
import React from 'react';

// ### MenuDropdown
import MenuDropdown from '../menu-dropdown';

// ## Children
import ProfileButton from './profile-button';

// ## Constants
import { GLOBAL_HEADER_PROFILE_MENU } from '../../utilities/constants';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

/**
 * Component description.
 */
const ProfileMenu = React.createClass({
	displayName: GLOBAL_HEADER_PROFILE_MENU,

	propTypes: {
		name: PropTypes.string,
		localization: PropTypes.object,
		logoutHref: PropTypes.string,
		onLogoutSelect: PropTypes.func,
		onSettingsSelect: PropTypes.func,
		onSwitchSelect: PropTypes.func,
		settingsHref: PropTypes.string,
		switchHref: PropTypes.string
	},

	handleLogoutClick (e) {
		e.preventDefault();
		if (this.props.onLogoutSelect) {
			this.props.onLogoutSelect(e);
		}
	},

	handleSettingsClick (e) {
		e.preventDefault();
		if (this.props.onSettingsSelect) {
			this.props.onSettingsSelect(e);
		}
	},

	handleSwitchClick (e) {
		e.preventDefault();
		if (this.props.onSwitchSelect) {
			this.props.onSwitchSelect(e);
		}
	},

	render () {
		const localization = this.props.localization;

		return (
			<Dropdown
				position="top"
				iconPosition="left"
				align="right"
				id="slds-global-nav__header__profile"
			>
				<DropdownTrigger>
					<ProfileButton />
				</DropdownTrigger>
				<Menu nubbinPosition="top right">
					<div id="slds-global-nav__header__profile__menu">
						<div className="slds-m-around--medium">
							<div className="slds-tile slds-tile--board slds-m-horizontal--small">
								<p className="tile__title slds-text-heading--small">{this.props.name}</p>
								<div className="slds-tile__detail">
									<p className="slds-truncate">
										<a className="slds-m-right--medium" href="#" onClick={this.handleSettingsClick}>{localization.GLOBAL_NAV_HEADER_MY_SETTINGS}</a>
										<a href="#" onClick={this.handleLogoutClick}>{localization.GLOBAL_NAV_HEADER_LOGOUT}</a>
									</p>
								</div>
							</div>
							<div id="slds-global-nav__header__profile__menu__separator" className="slds-m-vertical--small"></div>
							<div className="slds-m-horizontal--small">
								<a href="#" onClick={this.handleSwitchClick}>{localization.GLOBAL_NAV_HEADER_SWITCH}</a>
							</div>
						</div>
					</div>
				</Menu>
			</Dropdown>
		);
	}
});

export default ProfileMenu;
