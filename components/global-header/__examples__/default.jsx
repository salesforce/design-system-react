import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import GlobalHeader from '~/components/global-header'; // `~` is replaced with design-system-react at runtime
import GlobalHeaderButton from '~/components/global-header/button';
import GlobalHeaderDropdown from '~/components/global-header/dropdown';
import GlobalHeaderProfile from '~/components/global-header/profile';
import GlobalHeaderSearch from '~/components/global-header/search';

const Example = createReactClass({
	displayName: 'GlobalHeaderExample',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<GlobalHeader
					logoSrc="/images/logo.svg"
					onSkipToContent={() => {
						console.log('>>> Skip to Content Clicked');
					}}
					onSkipToNav={() => {
						console.log('>>> Skip to Nav Clicked');
					}}
				>
					<GlobalHeaderSearch
						placeholder="Search Salesforce"
						onSelect={() => {
							console.log('>>> onSelect');
						}}
						options={[{ label: 'Email' }, { label: 'Mobile' }]}
					/>
					<GlobalHeaderButton
						className="slds-m-right--small"
						iconVariant={null}
						label="Feedback"
						onClick={() => {
							console.log('>>> onClick');
						}}
						variant="neutral"
					/>
					<GlobalHeaderDropdown
						assistiveText="Global Actions"
						iconCategory="utility"
						iconName="add"
						onSelect={() => {
							console.log('>>> onSelect');
						}}
						options={[{ label: 'New Note' }, { label: 'Log a Call' }]}
					/>
					<GlobalHeaderButton
						assistiveText={{ icon: 'Help and Training' }}
						iconName="question"
						onClick={() => {
							console.log('>>> onClick');
						}}
					/>
					<GlobalHeaderButton
						assistiveText={{ icon: 'Setup' }}
						iconName="settings"
						onClick={() => {
							console.log('>>> onClick');
						}}
					/>
					<GlobalHeaderProfile
						avatar="/images/avatar2.jpg"
						onClick={() => {
							console.log('>>> onClick');
						}}
						onSelect={() => {
							console.log('>>> onSelect');
						}}
						options={[{ label: 'Profile Menu' }]}
					/>
				</GlobalHeader>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
