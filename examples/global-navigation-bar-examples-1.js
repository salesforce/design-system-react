const SLDSGlobalNavigationBarExample = React.createClass({
	displayName: 'SLDSGlobalNavigationBarExample',

	render () {
		const dropdownCollection = [{
			label: 'Menu Item One',
			value: '1',
			iconCategory: 'utility',
			iconName: 'table',
			href: 'http://www.google.com'
		}, {
			label: 'Menu Item Two',
			value: '2',
			iconCategory: 'utility',
			iconName: 'kanban',
			href: 'http://www.google.com'
		}, {
			label: 'Menu Item Three',
			value: '3',
			iconCategory: 'utility',
			iconName: 'side_list',
			href: 'http://www.google.com'
		}];

		return (
			<SLDSGlobalNavigationBar>
				<SLDSGlobalNavigationBarRegion
					region="primary"
				>
					<SLDSAppLauncher
						triggerName="App Name"
						onSearch={function (event) { console.log('Search term:', event.target.value); }}
						modalHeaderButton={<SLDSButton label="App Exchange" />}
					>
						<SLDSAppLauncherSection title="Tile Section">
							<SLDSAppLauncherTile
								title="Marketing Cloud"
								iconText="MC"
								description="Send emails, track emails, read emails! Emails!"
							/>
							<SLDSAppLauncherTile
								title="Call Center"
								description="The key to call center and contact center is not to use too many words!"
								descriptionHeading="Call Center"
								iconText="CC"
							/>
						</SLDSAppLauncherSection>
						<SLDSAppLauncherSection title="Small Tile Section">
							<SLDSAppLauncherTile
								title="Journey Builder"
								iconText="JB"
								size="small"
							/>
							<SLDSAppLauncherTile
								title="Sales Cloud"
								iconNode={<SLDSIcon name="campaign" category="standard" size="large" />}
								size="small"
							/>
						</SLDSAppLauncherSection>
					</SLDSAppLauncher>
				</SLDSGlobalNavigationBarRegion>
				<SLDSGlobalNavigationBarRegion region="secondary" navigation>
					<SLDSGlobalNavigationBarLink
						href="#"
						label="Home"
						id="home-link"
					/>
					<SLDSGlobalNavigationBarDropdown
						id="primaryDropdown"
						assistiveText="Context Menu Item 1"
						label="Context Menu Item"
						options={dropdownCollection}
					/>
					<SLDSGlobalNavigationBarLink
						href="#"
						label="Context Menu Item 2"
						active
					/>
				</SLDSGlobalNavigationBarRegion>
				<SLDSGlobalNavigationBarRegion region="tertiary">
					<SLDSGlobalNavigationBarLink
						href="#"
						label="Actions"
					/>
				</SLDSGlobalNavigationBarRegion>
			</SLDSGlobalNavigationBar>
		);
	}
});

ReactDOM.render(<SLDSGlobalNavigationBarExample />, mountNode);
