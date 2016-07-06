import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { GLOBAL_NAVIGATION_BAR } from '../../utilities/constants';

import { dropdownCollection, propSets } from '../../utilities/sample-data/global-navigation-bar';

import GlobalNavigationBar from '../../components/global-navigation-bar';
import GlobalNavigationBarRegion from '../../components/global-navigation-bar/region';
import GlobalNavigationBarAppLauncher from '../../components/global-navigation-bar/app-launcher';
import GlobalNavigationBarDropdown from '../../components/global-navigation-bar/dropdown';
import GlobalNavigationBarLink from '../../components/global-navigation-bar/link';

// aliased to allow copy and paste from component tests
const appLauncherClicked = action;
const linkClicked = action;
const dropdownItemClicked = action;

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
	.add('Custom Cloud', () => getGlobalNavigationBar(propSets.customCloud.props, propSets.customCloud.primaryRegionProps
))
	.add('Light Theme', () => getGlobalNavigationBar(propSets.lightTheme.props, propSets.lightTheme.primaryRegionProps));

