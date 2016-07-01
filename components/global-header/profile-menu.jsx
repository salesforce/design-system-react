import Dropdown from 'slds-for-react/dropdown';
import DropdownTrigger from 'slds-for-react/dropdown/button-trigger';
import functionBinder from '../utilities/function-binder.js';
import ProfileButton from './profile-button';
import Menu from 'slds-for-react/menu';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import React from 'react';
import reactMixin from 'react-mixin';

class ProfileMenu extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};

		functionBinder(this, [
			'handleLogoutClick',
			'handleSettingsClick',
			'handleSwitchClick'
		]);
	}

	handleLogoutClick (e) {
		e.preventDefault();
		if (this.props.onLogoutSelect) {
			this.props.onLogoutSelect(e);
		}
	}

	handleSettingsClick (e) {
		e.preventDefault();
		if (this.props.onSettingsSelect) {
			this.props.onSettingsSelect(e);
		}
	}

	handleSwitchClick (e) {
		e.preventDefault();
		if (this.props.onSwitchSelect) {
			this.props.onSwitchSelect(e);
		}
	}

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
}

ProfileMenu.propTypes = {
	name: React.PropTypes.string,
	logoutHref: React.PropTypes.string,
	onSwitchSelect: React.PropTypes.func,
	settingsHref: React.PropTypes.string,
	switchHref: React.PropTypes.string
};

ProfileMenu.displayName = 'ProfileMenu';

reactMixin(ProfileMenu.prototype, PureRenderMixin);

export default ProfileMenu;
