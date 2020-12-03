import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../icon-settings';

import { GLOBAL_NAVIGATION_BAR } from '../../../utilities/constants';

import { propSets } from '../../../utilities/sample-data/global-navigation-bar';

import GlobalNavigationBar from '../../global-navigation-bar';
import GlobalNavigationBarRegion from '../../global-navigation-bar/region';
import GlobalNavigationBarDropdown from '../../global-navigation-bar/dropdown';
import GlobalNavigationBarLink from '../../global-navigation-bar/link';
import GlobalNavigationBarLabel from '../../global-navigation-bar/label';
import GlobalNavigationBarButton from '../../global-navigation-bar/button';

import AppLauncher from '../../app-launcher';
import AppLauncherExpandableSection from '../../app-launcher/expandable-section';
import AppLauncherTile from '../../app-launcher/tile';

import Default from '../__examples__/default';

// aliased to allow copy and paste from component tests
const buttonClicked = action;
const dropdownItemClicked = action;
const linkClicked = action;
const searchClicked = action;

const dropdownCollection = [
	{
		label: 'Main action',
		value: '0',
		leftIcon: {
			category: 'utility',
			name: 'add',
		},
		href: 'http://www.google.com',
	},
	{
		label: 'Menu Header',
		type: 'header',
		divider: 'top',
	},
	{
		label: 'Menu Item One',
		value: '1',
		href: 'http://www.google.com',
	},
	{
		label: 'Menu Item Two',
		value: '2',
		href: 'http://www.google.com',
	},
	{
		label: 'Menu Item Three',
		value: '3',
		href: 'http://www.google.com',
	},
];

/* eslint-disable react/display-name */
const getGlobalNavigationBar = (props, primaryRegionProps) => (
	<GlobalNavigationBar {...props}>
		<GlobalNavigationBarRegion region="primary" {...primaryRegionProps}>
			<AppLauncher
				onSearch={searchClicked('App Launcher searched')}
				assistiveText={{ trigger: 'Open App Launcher' }}
				id="app-launcher-trigger"
				triggerName="App Name"
			>
				<AppLauncherExpandableSection title="All Items">
					<AppLauncherTile
						title="Marketing Cloud"
						iconText="MC"
						description="Send emails, track emails, read emails! Emails!"
						onClick={action('Tile clicked!')}
					/>
				</AppLauncherExpandableSection>
			</AppLauncher>
		</GlobalNavigationBarRegion>
		<GlobalNavigationBarRegion region="secondary" navigation>
			<GlobalNavigationBarLink
				active={props.homeActive !== false}
				href="https://www.lightningdesignsystem.com/"
				label="Home"
				id="home-link"
				onClick={linkClicked(
					'Home link clicked. Actual href should be ignored'
				)}
				onKeyDown={(e) => {
					console.log(e.target);
				}}
			/>
			<GlobalNavigationBarDropdown
				assistiveText={{ icon: 'Open menu item submenu' }}
				id="primaryDropdown"
				label="Menu Item"
				openOn={props.openOn || undefined}
				onSelect={dropdownItemClicked('Dropdown Menu Item clicked')}
				options={dropdownCollection}
			/>
			<GlobalNavigationBarLink
				// will actually go to website
				active
				href="https://www.lightningdesignsystem.com/"
				label="Menu Item"
			/>
			<GlobalNavigationBarLink
				active={props.homeActive === false}
				label="Menu Item"
				onClick={linkClicked('Link clicked')}
			/>
			<GlobalNavigationBarLink
				label="Menu Item"
				onClick={linkClicked('Link clicked')}
			/>
		</GlobalNavigationBarRegion>
	</GlobalNavigationBar>
);

const getGlobalNavigationBarCustomCloud = (props, primaryRegionProps) => (
	<GlobalNavigationBar {...props}>
		<GlobalNavigationBarRegion region="primary" {...primaryRegionProps}>
			<AppLauncher
				onSearch={searchClicked('App Launcher searched')}
				{...primaryRegionProps.appLauncher}
			>
				<AppLauncherExpandableSection title="All Items">
					<AppLauncherTile
						title="Marketing Cloud"
						iconText="MC"
						description="Send emails, track emails, read emails! Emails!"
						onClick={action('Tile clicked!')}
					/>
				</AppLauncherExpandableSection>
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
		</GlobalNavigationBarRegion>
		<GlobalNavigationBarRegion region="tertiary">
			<GlobalNavigationBarButton
				label="Button"
				onClick={buttonClicked('Button clicked')}
			/>
			<GlobalNavigationBarLink
				label="Actions"
				onClick={linkClicked('Link clicked')}
			/>
			<GlobalNavigationBarLabel
				dividerPosition="left"
				label="Vandelay Enterprises"
			/>
		</GlobalNavigationBarRegion>
	</GlobalNavigationBar>
);

const getGlobalNavigationBarCustomCloudOverviewActive = (
	props,
	primaryRegionProps
) => (
	<GlobalNavigationBar {...props}>
		<GlobalNavigationBarRegion region="primary">
			<AppLauncher
				onSearch={searchClicked('App Launcher searched')}
				{...primaryRegionProps.appLauncher}
			>
				<AppLauncherExpandableSection title="All Items">
					<AppLauncherTile
						title="Marketing Cloud"
						iconText="MC"
						description="Send emails, track emails, read emails! Emails!"
						onClick={action('Tile clicked!')}
					/>
				</AppLauncherExpandableSection>
			</AppLauncher>
		</GlobalNavigationBarRegion>
		<GlobalNavigationBarRegion region="secondary" navigation>
			<GlobalNavigationBarLink
				label="Overview"
				id="overview-link"
				active
				activeBackgroundColor="#ffffff"
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
				active
				activeBackgroundColor="#ffffff"
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
		</GlobalNavigationBarRegion>
		<GlobalNavigationBarRegion region="tertiary">
			<GlobalNavigationBarButton
				label="Button"
				onClick={buttonClicked('Button clicked')}
			/>
			<GlobalNavigationBarLink
				label="Actions"
				onClick={linkClicked('Link clicked')}
			/>
			<GlobalNavigationBarLabel
				dividerPosition="left"
				label="Vandelay Enterprises"
			/>
		</GlobalNavigationBarRegion>
	</GlobalNavigationBar>
);

const getGlobalNavigationBarNoNav = (props, primaryRegionProps) => (
	<GlobalNavigationBar {...props}>
		<GlobalNavigationBarRegion region="primary" {...primaryRegionProps}>
			<AppLauncher
				onSearch={searchClicked('App Launcher searched')}
				assistiveText={{ trigger: 'Open App Launcher' }}
				id="app-launcher-trigger"
				triggerName="App Name"
			>
				<AppLauncherExpandableSection title="All Items">
					<AppLauncherTile
						title="Marketing Cloud"
						iconText="MC"
						description="Send emails, track emails, read emails! Emails!"
						onClick={action('Tile clicked!')}
					/>
				</AppLauncherExpandableSection>
			</AppLauncher>
		</GlobalNavigationBarRegion>
	</GlobalNavigationBar>
);

storiesOf(GLOBAL_NAVIGATION_BAR, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () =>
		getGlobalNavigationBar(
			propSets.base.props,
			propSets.base.primaryRegionProps
		)
	)
	.add('Custom Cloud', () =>
		getGlobalNavigationBarCustomCloud(
			propSets.customCloud.props,
			propSets.customCloud.primaryRegionProps
		)
	)
	.add('Custom Cloud (Multiple active and white)', () =>
		getGlobalNavigationBarCustomCloudOverviewActive(
			propSets.customCloud.props,
			propSets.customCloud.primaryRegionProps
		)
	)
	.add('No Secondary Navigation', () =>
		getGlobalNavigationBarNoNav(
			propSets.noNav.props,
			propSets.noNav.primaryRegionProps
		)
	)
	.add('Hybrid Dropdown', () =>
		getGlobalNavigationBar(
			propSets.hybrid.props,
			propSets.base.primaryRegionProps
		)
	)
	.add('Doc site Default', () => <Default />);
