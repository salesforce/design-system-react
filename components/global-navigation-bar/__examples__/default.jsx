import React from 'react';

import IconSettings from '~/components/icon-settings';
import GlobalNavigationBar from '~/components/global-navigation-bar'; // `~` is replaced with design-system-react at runtime
import GlobalNavigationBarRegion from '~/components/global-navigation-bar/region';
import GlobalNavigationBarDropdown from '~/components/global-navigation-bar/dropdown';
import GlobalNavigationBarLink from '~/components/global-navigation-bar/link';

import Button from '~/components/button';
import Icon from '~/components/icon';

import AppLauncher from '~/components/app-launcher';
import AppLauncherExpandableSection from '~/components/app-launcher/expandable-section';
import AppLauncherTile from '~/components/app-launcher/tile';

class Example extends React.Component {
	static displayName = 'GlobalNavigationBarExample';

	render() {
		const dropdownCollection = [
			{
				label: 'Menu Item One',
				value: '1',
				iconCategory: 'utility',
				iconName: 'table',
				href: 'http://www.google.com',
			},
			{
				label: 'Menu Item Two',
				value: '2',
				iconCategory: 'utility',
				iconName: 'kanban',
				href: 'http://www.google.com',
			},
			{
				label: 'Menu Item Three',
				value: '3',
				iconCategory: 'utility',
				iconName: 'side_list',
				href: 'http://www.google.com',
			},
		];

		return (
			<IconSettings iconPath="/assets/icons">
				<GlobalNavigationBar>
					<GlobalNavigationBarRegion region="primary">
						<AppLauncher
							id="app-launcher-trigger"
							triggerName="App Name"
							onSearch={() => {
								console.log('Search term:', event.target.value);
							}}
							modalHeaderButton={<Button label="App Exchange" />}
						>
							<AppLauncherExpandableSection title="Tile Section">
								<AppLauncherTile
									title="Marketing Cloud"
									iconText="MC"
									description="Send emails, track emails, read emails! Emails!"
								/>
								<AppLauncherTile
									title="Call Center"
									description="The key to call center and contact center is not to use too many words!"
									descriptionHeading="Call Center"
									iconText="CC"
								/>
							</AppLauncherExpandableSection>
							<AppLauncherExpandableSection title="Small Tile Section">
								<AppLauncherTile
									title="Journey Builder"
									iconText="JB"
									size="small"
								/>
								<AppLauncherTile
									title="Sales Cloud"
									iconNode={
										<Icon name="campaign" category="standard" size="large" />
									}
									size="small"
								/>
							</AppLauncherExpandableSection>
						</AppLauncher>
					</GlobalNavigationBarRegion>
					<GlobalNavigationBarRegion region="secondary" navigation>
						<GlobalNavigationBarLink active label="Home" id="home-link" />
						<GlobalNavigationBarDropdown
							assistiveText={{ icon: 'Open menu item submenu' }}
							id="primaryDropdown"
							label="Menu Item"
							options={dropdownCollection}
						/>
						<GlobalNavigationBarLink label="Menu Item" />
						<GlobalNavigationBarLink label="Menu Item" />
						<GlobalNavigationBarLink label="Menu Item" />
					</GlobalNavigationBarRegion>
				</GlobalNavigationBar>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
