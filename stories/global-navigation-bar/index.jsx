import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { GLOBAL_NAVIGATION_BAR } from '../../utilities/constants';

import { dropdownCollection, propSets } from '../../utilities/sample-data/global-navigation-bar';

import GlobalNavigationBar from '../../components/global-navigation-bar';
import GlobalNavigationBarRegion from '../../components/global-navigation-bar/region';
import GlobalNavigationBarAppLauncher from '../../components/global-navigation-bar/app-launcher';
import GlobalNavigationBarDropdown from '../../components/global-navigation-bar/dropdown';
import GlobalNavigationBarLink from '../../components/global-navigation-bar/link';
import GlobalNavigationBarButton from '../../components/global-navigation-bar/button';

// aliased to allow copy and paste from component tests
const appLauncherClicked = action;
const linkClicked = action;
const dropdownItemClicked = action;
const buttonClicked = action;

/* eslint-disable react/display-name */
const getGlobalNavigationBar = (props, primaryRegionProps) => (
	<GlobalNavigationBar {...props}>
		<GlobalNavigationBarRegion
			region="primary"
		>
			<GlobalNavigationBarAppLauncher
				onClick={appLauncherClicked('Application name clicked (Open App Launcher).')}
				{...primaryRegionProps.appLauncher}
			>
				{primaryRegionProps.appLauncher.customChild ? primaryRegionProps.appLauncher.customChild() : null}
			</GlobalNavigationBarAppLauncher>
		</GlobalNavigationBarRegion>
		<GlobalNavigationBarRegion region="secondary" navigation>
			<GlobalNavigationBarLink
				href="#"
				label="Home"
				id="home-link"
				onClick={linkClicked('Home link clicked')}
			/>
			<GlobalNavigationBarDropdown
				id="primaryDropdown"
				label="Menu Item 1"
				onSelect={dropdownItemClicked('Dropdown Menu Item clicked')}
				options={dropdownCollection}
			/>
			<GlobalNavigationBarLink
				href="#"
				label="Menu Item 2"
				onClick={linkClicked('Link clicked')}
			/>
			<GlobalNavigationBarLink
				active
				href="#"
				label="Menu Item 3"
				onClick={linkClicked('Link clicked')}
			/>
			<GlobalNavigationBarLink
				href="#"
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
			<GlobalNavigationBarAppLauncher
				onClick={appLauncherClicked('Application name clicked (Open App Launcher).')}
				{...primaryRegionProps.appLauncher}
			>
				{primaryRegionProps.appLauncher.customChild ? primaryRegionProps.appLauncher.customChild() : null}
			</GlobalNavigationBarAppLauncher>
		</GlobalNavigationBarRegion>
		<GlobalNavigationBarRegion region="secondary" navigation>
			<GlobalNavigationBarLink
				href="#"
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
				href="#"
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
				href="#"
				label="Admin"
				onClick={linkClicked('Admin Link clicked')}
			/>
			<GlobalNavigationBarLink
				href="#"
				label="Audience Builder"
				onClick={linkClicked('Audience Builder Link clicked')}
			/>
		</GlobalNavigationBarRegion>
		<GlobalNavigationBarRegion region="tertiary">
			<GlobalNavigationBarLink
				href="#"
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
			<GlobalNavigationBarAppLauncher
				onClick={appLauncherClicked('Application name clicked (Open App Launcher).')}
				{...primaryRegionProps.appLauncher}
			>
				{primaryRegionProps.appLauncher.customChild ? primaryRegionProps.appLauncher.customChild() : null}
			</GlobalNavigationBarAppLauncher>
		</GlobalNavigationBarRegion>
		<GlobalNavigationBarRegion region="secondary" navigation>
			<GlobalNavigationBarLink
				href="#"
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
				href="#"
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
				href="#"
				label="Admin"
				onClick={linkClicked('Admin Link clicked')}
			/>
			<GlobalNavigationBarLink
				href="#"
				label="Audience Builder"
				onClick={linkClicked('Audience Builder Link clicked')}
			/>
		</GlobalNavigationBarRegion>
		<GlobalNavigationBarRegion region="tertiary">
			<GlobalNavigationBarLink
				href="#"
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

