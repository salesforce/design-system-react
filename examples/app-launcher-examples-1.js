const SLDSAppLauncherExample = React.createClass({
	displayName: 'SLDSAppLauncherExample2',

	render () {
		const search = <SLDSSearch onChange={function (event) { console.log('Search term:', event.target.value); }} placeholder="Find an app" assistiveText="Find an app" />;
		const headerButton = <SLDSButton label="App Exchange" />;

		return (
			<SLDSGlobalNavigationBar>
				<SLDSGlobalNavigationBarRegion
					region="primary"
				>
					<SLDSAppLauncher
						triggerName="App Name"
						search={search}
						modalHeaderButton={headerButton}
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
			</SLDSGlobalNavigationBar>
		);
	}
});

ReactDOM.render(<SLDSAppLauncherExample />, mountNode);
