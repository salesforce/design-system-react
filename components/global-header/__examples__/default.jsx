import React from 'react';

import Dropdown from '~/components/menu-dropdown';
import GlobalHeader from '~/components/global-header'; // `~` is replaced with design-system-react at runtime
import GlobalHeaderFavorites from '~/components/global-header/favorites';
import GlobalHeaderHelp from '~/components/global-header/help';
import GlobalHeaderNotifications from '~/components/global-header/notifications';
import GlobalHeaderProfile from '~/components/global-header/profile';
import GlobalHeaderSearch from '~/components/global-header/search';
import GlobalHeaderSetup from '~/components/global-header/setup';
import GlobalHeaderTask from '~/components/global-header/task';
import IconSettings from '~/components/icon-settings';
import Popover from '~/components/popover';

const HeaderProfileCustomContent = (props) => (
	<div id="custom-popover-content">
		<div className="slds-m-around_medium">
			<div className="slds-tile slds-tile_board slds-m-horizontal_small">
				<p className="tile__title slds-text-heading_small">Art Vandelay</p>
				<div className="slds-tile__detail">
					<p className="slds-truncate">
						<a
							className="slds-m-right_medium"
							href="javascript:void(0)"
							onClick={props.onClick}
						>
							Settings
						</a>
						<a href="javascript:void(0)" onClick={props.onClick}>
							Log Out
						</a>
					</p>
				</div>
			</div>
		</div>
	</div>
);

class Example extends React.Component {
	static displayName = 'GlobalHeaderExample';

	constructor(props) {
		super(props);
		this.state = {
			favoritesActionSelected: false,
		};
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<GlobalHeader
					logoSrc="/images/logo.svg"
					onSkipToContent={() => {
						console.log('>>> Skip to Content Clicked');
					}}
					onSkipToNav={() => {
						console.log('>>> Skip to Nav Clicked');
					}}
				>
					<GlobalHeaderSearch
						id="header-search-custom-id"
						labels={{ placeholder: 'Search Salesforce' }}
						onSelect={() => {
							console.log('>>> onSelect');
						}}
						options={[
							{ id: 'email', label: 'Email' },
							{ id: 'mobile', label: 'Mobile' },
						]}
					/>
					<GlobalHeaderFavorites
						actionSelected={this.state.favoritesActionSelected}
						onToggleActionSelected={(event, data) => {
							this.setState({ favoritesActionSelected: !data.actionSelected });
						}}
						popover={<Popover id="header-favorites-popover-id"/>}
					/>
					<GlobalHeaderTask
						dropdown={
							<Dropdown id="header-task-dropdown-id">
								<ul className="slds-dropdown__list" role="menu">
									<li className="slds-dropdown__item" role="presentation">
										<a href="javascript:void(0);" role="menuitem" tabIndex="0">
											<span className="slds-truncate" title="New Event">
												Settings One
											</span>
										</a>
									</li>
									<li className="slds-dropdown__item" role="presentation">
										<a href="javascript:void(0);" role="menuitem" tabIndex="0">
											<span className="slds-truncate" title="New Note">
												Settings Two
											</span>
										</a>
									</li>
								</ul>
							</Dropdown>
						}
					/>
					<GlobalHeaderHelp popover={<Popover id="header-help-popover-id"/>} />
					<GlobalHeaderSetup
						dropdown={
							<Dropdown id="header-setup-dropdown-id">
								<ul className="slds-dropdown__list" role="menu">
									<li className="slds-dropdown__item" role="presentation">
										<a href="javascript:void(0);" role="menuitem" tabIndex="0">
											<span className="slds-truncate" title="New Event">
												New Event
											</span>
										</a>
									</li>
									<li className="slds-dropdown__item" role="presentation">
										<a href="javascript:void(0);" role="menuitem" tabIndex="0">
											<span className="slds-truncate" title="New Note">
												New Note
											</span>
										</a>
									</li>
								</ul>
							</Dropdown>
						}
					/>
					<GlobalHeaderNotifications
						notificationCount={5}
						popover={<Popover id="header-notifications-popover-id" />}
					/>
					<GlobalHeaderProfile
						popover={<Popover body={<HeaderProfileCustomContent />} id="header-profile-popover-id" />}
						userName="Art Vandelay"
					/>
				</GlobalHeader>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
