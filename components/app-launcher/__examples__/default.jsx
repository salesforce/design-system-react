import React from 'react';
import createReactClass from 'create-react-class';
import AppLauncher from '~/components/app-launcher'; // `~` is replaced with design-system-react at runtime
import AppLauncherTile from '~/components/app-launcher/tile';
import AppLauncherSection from '~/components/app-launcher/section';

import GlobalNavigationBar from '~/components/global-navigation-bar';
import GlobalNavigationBarRegion from '~/components/global-navigation-bar/region';

import Icon from '~/components/icon';
import Button from '~/components/button';
import Search from '~/components/input/search';
import IconSettings from '~/components/icon-settings';

const Example = createReactClass({
	displayName: 'AppLauncherExample',

	render () {
		const search = (
			<Search
				onChange={() => {
					console.log('Search term:', event.target.value);
				}}
				placeholder="Find an app"
				assistiveText="Find an app"
			/>
		);
		const headerButton = <Button label="App Exchange" />;

		return (
			<IconSettings iconPath="/assets/icons">
				<GlobalNavigationBar>
					<GlobalNavigationBarRegion region="primary">
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
									iconNode={
										<Icon name="campaign" category="standard" size="large" />
									}
									size="small"
								/>
							</AppLauncherSection>
						</AppLauncher>
					</GlobalNavigationBarRegion>
				</GlobalNavigationBar>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
