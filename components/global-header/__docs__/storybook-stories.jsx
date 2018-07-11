import React from 'react';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../icon-settings';

import logo from '../__examples__/logo.svg';

import GlobalHeader from '../../global-header';
import GlobalHeaderButton from '../../global-header/button';
import GlobalHeaderDropdown from '../../global-header/dropdown';
import GlobalHeaderProfile from '../../global-header/profile';
import GlobalHeaderSearch from '../../global-header/search';

import { GLOBAL_HEADER } from '../../../utilities/constants';

import globalNavigationBar from '../../global-navigation-bar/__docs__/storybook-stories';

/* eslint-disable react/prop-types */
/* eslint-disable no-script-url */
/* eslint-disable react/display-name */

const HeaderProfileCustomContent = (props) => (
	<div id="custom-dropdown-menu-content">
		<div className="slds-m-around--medium">
			<div className="slds-tile slds-tile--board slds-m-horizontal--small">
				<p className="tile__title slds-text-heading--small">Art Vandelay</p>
				<div className="slds-tile__detail">
					<p className="slds-truncate">
						<a
							className="slds-m-right--medium"
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

/* eslint-disable react/display-name */
const GlobalHeaderDemo = (props) => (
	<GlobalHeader
		onSkipToContent={action('Skip to Main Content')}
		onSkipToNav={action('Skip to Navigation')}
		navigation={globalNavigationBar(props)}
		assistiveText={{
			skipToContent: 'Skip to Main Content',
			skipToNavAssistiveText: 'Skip to Navigation',
		}}
	>
		<GlobalHeaderSearch
			onSelect={action('Search Selected')}
			placeholder="Search Salesforce"
			options={[{ label: 'Email' }, { label: 'Mobile' }]}
		/>
		<GlobalHeaderButton
			className="slds-m-right--small"
			iconVariant={null}
			label="Feedback"
			onClick={action('Feedback Clicked')}
			variant="neutral"
		/>
		<GlobalHeaderDropdown
			openOn={props.openOn}
			assistiveText={{ icon: 'Global Actions' }}
			globalAction
			iconCategory="utility"
			iconName="add"
			onSelect={action('Action Selected')}
			options={[
				{
					label: 'New Note',
					rightIcon: { category: 'standard', name: 'note', size: 'small' },
				},
				{
					label: 'Log a Call',
					rightIcon: {
						category: 'standard',
						name: 'log_a_call',
						size: 'small',
					},
				},
			]}
		/>
		<GlobalHeaderButton
			assistiveText={{ icon: 'Help and Training' }}
			iconName="question"
			onClick={action('Help Clicked')}
		/>
		<GlobalHeaderDropdown
			openOn={props.openOn}
			assistiveText={{ icon: 'Setup' }}
			iconName="setup"
			onSelect={action('Action Selected')}
			options={[{ label: 'Global Setup' }, { label: 'Permissions' }]}
		/>
		<GlobalHeaderButton
			assistiveText={{ icon: 'Notifications' }}
			iconName="Notification"
			onClick={action('Notifications Clicked')}
		/>
		<GlobalHeaderProfile
			openOn={props.openOn}
			onClick={action('Profile Clicked')}
			onSelect={action('Profile Selected')}
		>
			<HeaderProfileCustomContent />
		</GlobalHeaderProfile>
	</GlobalHeader>
);

storiesOf(GLOBAL_HEADER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Search + Navigation', () => <GlobalHeaderDemo />)
	.add('Open on Hybrid', () => <GlobalHeaderDemo openOn="hybrid" />)
	.add('Fewer Elements', () => (
		<GlobalHeader logoSrc={logo}>
			<GlobalHeaderDropdown
				assistiveText={{ icon: 'Setup' }}
				iconName="setup"
				onSelect={action('Action Selected')}
				options={[{ label: 'Global Setup' }, { label: 'Permissions' }]}
			/>
			<GlobalHeaderProfile
				onClick={action('Profile Clicked')}
				onSelect={action('Profile Selected')}
				options={[{ label: 'Profile Menu' }]}
			/>
		</GlobalHeader>
	));
