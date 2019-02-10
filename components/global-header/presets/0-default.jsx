/* eslint-disable filenames/match-regex */
import * as React from 'react';

import GlobalHeader from '../global-header';
import GlobalHeaderButton from '../global-header-button/global-header-button';
import GlobalHeaderDropdown from '../global-header-dropdown/global-header-dropdown';
import GlobalHeaderProfile from '../global-header-profile/global-header-profile';
import GlobalHeaderSearch from '../global-header-search/global-header-search';

export default (
	<GlobalHeader uxpId="0">
		<GlobalHeaderSearch
			uxpId="01"
			placeholder="Search Salesforce"
			options={[{ label: 'Email' }, { label: 'Mobile' }]}
		/>
		<GlobalHeaderButton
			uxpId="1"
			className="slds-m-right_small"
			iconVariant={null}
			label="Feedback"
			variant="neutral"
		/>
		<GlobalHeaderDropdown
			uxpId="2"
			assistiveText="Global Actions"
			iconCategory="utility"
			iconName="add"
			options={[{ label: 'New Note' }, { label: 'Log a Call' }]}
		/>
		<GlobalHeaderButton
			uxpId="3"
			assistiveText={{ icon: 'Help and Training' }}
			iconName="question"
		/>
		<GlobalHeaderButton
			uxpId="4"
			assistiveText={{ icon: 'Setup' }}
			iconName="settings"
		/>
		<GlobalHeaderProfile
			uxpId="5"
			options={[{ label: 'Profile Menu' }]}
		/>
	</GlobalHeader>
);
