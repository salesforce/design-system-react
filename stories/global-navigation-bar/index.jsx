import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { GLOBAL_NAVIGATION_BAR } from '../../utilities/constants';

import { dropdownCollection, propSets } from '../../utilities/sample-data/global-navigation-bar';

import GlobalNavigationBar from '../../components/global-navigation-bar';
import GlobalNavigationBarRegion from '../../components/global-navigation-bar/region';
import GlobalNavigationBarDropdown from '../../components/global-navigation-bar/dropdown';
import GlobalNavigationBarLink from '../../components/global-navigation-bar/link';
import GlobalNavigationBarButton from '../../components/global-navigation-bar/button';

import AppLauncher from '../../components/app-launcher';
import AppLauncherSection from '../../components/app-launcher/section';
import AppLauncherTile from '../../components/app-launcher/tile';

// aliased to allow copy and paste from component tests
const buttonClicked = action;
const dropdownItemClicked = action;
const linkClicked = action;
const searchClicked = action;

/* eslint-disable react/display-name */
const getGlobalNavigationBar = (props, primaryRegionProps) => (
	<GlobalNavigationBar {...props}>
		<GlobalNavigationBarRegion
			region="primary"
		>
			<AppLauncher
				onSearch={searchClicked('App Launcher searched')}
				{...primaryRegionProps.appLauncher}
			>
				<AppLauncherSection title="All Items">
					<AppLauncherTile
						title="Marketing Cloud"
						iconText="MC"
						description="Send emails, track emails, read emails! Emails!"
						onClick={action('Tile clicked!')}
					/>
				</AppLauncherSection>
			</AppLauncher>
		</GlobalNavigationBarRegion>
		<GlobalNavigationBarRegion region="secondary" navigation>
			<GlobalNavigationBarLink
				href="https://www.lightningdesignsystem.com/"
				label="Home"
				id="home-link"
				onClick={linkClicked('Home link clicked. Actual href should be ignored')}
			/>
			<GlobalNavigationBarDropdown
				assistiveText="Open Menu Item 1"
				id="primaryDropdown"
				label="Menu Item 1"
				onSelect={dropdownItemClicked('Dropdown Menu Item clicked')}
				options={dropdownCollection}
			/>
			<GlobalNavigationBarLink
				// will actually go to website
				href="https://www.lightningdesignsystem.com/"
				label="Menu Item 2"
			/>
			<GlobalNavigationBarLink
				active
				label="Menu Item 3"
				onClick={linkClicked('Link clicked')}
			/>
			<GlobalNavigationBarLink
				label="Menu Item 4"
				onClick={linkClicked('Link clicked')}
			/>
		</GlobalNavigationBarRegion>
		<GlobalNavigationBarRegion region="tertiary">
			<GlobalNavigationBarButton
				label="Button"
				onClick={buttonClicked('Button clicked')}
			/>
			<GlobalNavigationBarLink
				label="Actions"
				onClick={buttonClicked('Link clicked')}
			/>
		</GlobalNavigationBarRegion>
	</GlobalNavigationBar>
);

const getGlobalNavigationBarCustomCloud = (props, primaryRegionProps) => (
	<GlobalNavigationBar {...props}>
		<GlobalNavigationBarRegion
			region="primary"
		>
			<AppLauncher
				onSearch={searchClicked('App Launcher searched')}
				{...primaryRegionProps.appLauncher}
			>
				<AppLauncherSection title="All Items">
					<AppLauncherTile
						title="Marketing Cloud"
						iconText="MC"
						description="Send emails, track emails, read emails! Emails!"
						onClick={action('Tile clicked!')}
					/>
				</AppLauncherSection>
			</AppLauncher>
		</GlobalNavigationBarRegion>
		<GlobalNavigationBarRegion region="secondary" navigation>
			<GlobalNavigationBarLink
				label="Overview"
				id="overview-link"
				onClick={linkClicked('Overview link clicked')}
			/>
			<GlobalNavigationBarDropdown
				id="contentDropdown"
				label="Content"
				onSelect={dropdownItemClicked('Content Menu Item clicked')}
				options={dropdownCollection}
			/>
			<GlobalNavigationBarDropdown
				id="subscribersDropdown"
				label="Subscribers"
				onSelect={dropdownItemClicked('Subscribers Menu Item clicked')}
				options={dropdownCollection}
			/>
			<GlobalNavigationBarDropdown
				id="interactionDropdown"
				label="Interaction"
				onSelect={dropdownItemClicked('Interaction Menu Item clicked')}
				options={dropdownCollection}
			/>
			<GlobalNavigationBarLink
				label="A/B Testing"
				onClick={linkClicked('A/B Testing Link clicked')}
			/>
			<GlobalNavigationBarDropdown
				id="trackingDropdown"
				label="Tracking"
				onSelect={dropdownItemClicked('Tracking Menu Item clicked')}
				options={dropdownCollection}
			/>
			<GlobalNavigationBarLink
				label="Admin"
				onClick={linkClicked('Admin Link clicked')}
			/>
			<GlobalNavigationBarLink
				label="Audience Builder"
				onClick={linkClicked('Audience Builder Link clicked')}
			/>
		</GlobalNavigationBarRegion>
		<GlobalNavigationBarRegion region="tertiary">
			<GlobalNavigationBarLink
				label="Actions"
				onClick={linkClicked('Link clicked')}
			/>
		</GlobalNavigationBarRegion>
	</GlobalNavigationBar>
);
const getGlobalNavigationBarCustomCloudOverviewAcive = (props, primaryRegionProps) => (
	<GlobalNavigationBar {...props}>
		<GlobalNavigationBarRegion
			region="primary"
		>
			<AppLauncher
				onSearch={searchClicked('App Launcher searched')}
				{...primaryRegionProps.appLauncher}
			>
				<AppLauncherSection title="All Items">
					<AppLauncherTile
						title="Marketing Cloud"
						iconText="MC"
						description="Send emails, track emails, read emails! Emails!"
						onClick={action('Tile clicked!')}
					/>
				</AppLauncherSection>
			</AppLauncher>
		</GlobalNavigationBarRegion>
		<GlobalNavigationBarRegion region="secondary" navigation>
			<GlobalNavigationBarLink
				label="Overview"
				id="overview-link"
				active
				onClick={linkClicked('Overview link clicked')}
			/>
			<GlobalNavigationBarDropdown
				id="contentDropdown"
				label="Content"
				onSelect={dropdownItemClicked('Content Menu Item clicked')}
				options={dropdownCollection}
			/>
			<GlobalNavigationBarDropdown
				id="subscribersDropdown"
				label="Subscribers"
				onSelect={dropdownItemClicked('Subscribers Menu Item clicked')}
				options={dropdownCollection}
			/>
			<GlobalNavigationBarDropdown
				id="interactionDropdown"
				label="Interaction"
				onSelect={dropdownItemClicked('Interaction Menu Item clicked')}
				options={dropdownCollection}
			/>
			<GlobalNavigationBarLink
				label="A/B Testing"
				onClick={linkClicked('A/B Testing Link clicked')}
			/>
			<GlobalNavigationBarDropdown
				id="trackingDropdown"
				label="Tracking"
				onSelect={dropdownItemClicked('Tracking Menu Item clicked')}
				options={dropdownCollection}
			/>
			<GlobalNavigationBarLink
				label="Admin"
				onClick={linkClicked('Admin Link clicked')}
			/>
			<GlobalNavigationBarLink
				label="Audience Builder"
				onClick={linkClicked('Audience Builder Link clicked')}
			/>
		</GlobalNavigationBarRegion>
		<GlobalNavigationBarRegion region="tertiary">
			<GlobalNavigationBarLink
				label="Actions"
				onClick={linkClicked('Link clicked')}
			/>
		</GlobalNavigationBarRegion>
	</GlobalNavigationBar>
);

storiesOf(GLOBAL_NAVIGATION_BAR, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => getGlobalNavigationBar(propSets.base.props, propSets.base.primaryRegionProps))
	.add('Custom Cloud', () => getGlobalNavigationBarCustomCloud(propSets.customCloud.props, propSets.customCloud.primaryRegionProps))
	.add('Custom Cloud (Overview active)', () => getGlobalNavigationBarCustomCloudOverviewAcive(propSets.customCloud.props, propSets.customCloud.primaryRegionProps))
	.add('Light Theme', () => getGlobalNavigationBar(propSets.lightTheme.props, propSets.lightTheme.primaryRegionProps));
