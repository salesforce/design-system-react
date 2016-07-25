import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import logo from './logo.svg';

import GlobalHeader from '../../components/global-header';
import GlobalHeaderButton from '../../components/global-header/button';
import GlobalHeaderDropdown from '../../components/global-header/dropdown';
import GlobalHeaderProfile from '../../components/global-header/profile';
import GlobalHeaderSearch from '../../components/global-header/search';

import { GLOBAL_HEADER } from '../../utilities/constants';

storiesOf(GLOBAL_HEADER, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('w/ Search', () => (
		<GlobalHeader logoSrc={logo} onSkipToContent={action('Skip to Main Content')} onSkipToNav={action('Skip to Navigation')}>
			<GlobalHeaderSearch
				onSelect={action('Search Selected')}
				options={[
					{ label: 'Email' },
					{ label: 'Mobile' }
				]}
			/>
			<GlobalHeaderButton
				className="slds-m-right--small"
				iconVariant={null}
				label="Feedback"
				onClick={action('Feedback Clicked')}
				variant="neutral"
			/>
			<GlobalHeaderDropdown
				assistiveText="Global Actions"
				iconCategory="utility"
				iconName="add"
				onSelect={action('Action Selected')}
				options={[
					{ label: 'Setup', type: 'header' },
					{ label: 'New Note', rightIcon: { category: 'standard', name: 'note', size: 'small' } },
					{ label: 'Log a Call', rightIcon: { category: 'standard', name: 'log_a_call', size: 'small' } }
				]}
			/>
			<GlobalHeaderButton
				assistiveText="Help and Training"
				iconName="question"
				onClick={action('Help Clicked')}
			/>
			<GlobalHeaderButton
				assistiveText="Setup"
				iconName="settings"
				onClick={action('Setup Clicked')}
			/>
			<GlobalHeaderProfile
				onClick={action('Profile Clicked')}
				onSelect={action('Profile Selected')}
			>
				<div id="custom-dropdown-menu-content">
					<div className="slds-m-around--medium">
						<div className="slds-tile slds-tile--board slds-m-horizontal--small">
							<p className="tile__title slds-text-heading--small">Art Vandelay</p>
							<div className="slds-tile__detail">
								<p className="slds-truncate">
									<a className="slds-m-right--medium" href="#">Settings</a>
									<a href="#" >Log Out</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</GlobalHeaderProfile>
		</GlobalHeader>
	))
	.add('w/ Fewer Elements', () => (
		<GlobalHeader logoSrc={logo}>
			<GlobalHeaderDropdown
				iconCategory="utility"
				iconName="add"
				onSelect={action('Action Selected')}
				options={[
					{ label: 'New Note' },
					{ label: 'Log a Call' }
				]}
			/>
			<GlobalHeaderProfile
				onClick={action('Profile Clicked')}
				onSelect={action('Profile Selected')}
				options={[
					{ label: 'Profile Menu' }
				]}
			/>
		</GlobalHeader>
	));
