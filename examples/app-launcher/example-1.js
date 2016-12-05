import AppLauncher from 'design-system-react/components/app-launcher';
import AppLauncherTile from 'design-system-react/components/app-launcher/tile';
import AppLauncherSection from 'design-system-react/components/app-launcher/section';

import Icon from 'design-system-react/components/icon';
import Button from 'design-system-react/components/button';
import Search from 'design-system-react/components/forms/input/search';

const AppLauncherExample = React.createClass({
	displayName: 'AppLauncherExample',

	render () {
		const search = <Search onChange={function (event) { console.log('Search term:', event.target.value); }} placeholder="Find an app" assistiveText="Find an app" />;
		const headerButton = <Button label="App Exchange" />;

		return (
			<GlobalNavigationBar>
				<GlobalNavigationBarRegion
					region="primary"
				>
					<AppLauncher
						triggerName="App Name"
						search={search}
						modalHeaderButton={headerButton}
					>
						<AppLauncherSection title="Tile Section">
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
						</AppLauncherSection>
						<AppLauncherSection title="Small Tile Section">
							<AppLauncherTile
								title="Journey Builder"
								iconText="JB"
								size="small"
							/>
							<AppLauncherTile
								title="Sales Cloud"
								iconNode={<Icon name="campaign" category="standard" size="large" />}
								size="small"
							/>
						</AppLauncherSection>
					</AppLauncher>
				</GlobalNavigationBarRegion>
			</GlobalNavigationBar>
		);
	}
});

ReactDOM.render(<AppLauncherExample />, mountNode);
