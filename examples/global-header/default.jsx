import React from 'react';
import createReactClass from 'create-react-class';
import GlobalHeader from '~/components/global-header'; // `~` is replaced with design-system-react at runtime
import GlobalHeaderButton from '~/components/global-header/button';
import GlobalHeaderDropdown from '~/components/global-header/dropdown';
import GlobalHeaderProfile from '~/components/global-header/profile';
import GlobalHeaderSearch from '~/components/global-header/search';

const Example = createReactClass({
	displayName: 'GlobalHeaderExample',

	render () {
		return (
			<GlobalHeader
				logoSrc="/images/logo.svg"
				onSkipToContent={function () { console.log('>>> Skip to Content Clicked'); }}
				onSkipToNav={function () { console.log('>>> Skip to Nav Clicked'); }}
			>
				<GlobalHeaderSearch
					placeholder="Search Salesforce"
					onSelect={function () { console.log('>>> onSelect'); }}
					options={[
						{ label: 'Email' },
						{ label: 'Mobile' }
					]}
				/>
				<GlobalHeaderButton
					className="slds-m-right--small"
					iconVariant={null}
					label="Feedback"
					onClick={function () { console.log('>>> onClick'); }}
					variant="neutral"
				/>
				<GlobalHeaderDropdown
					assistiveText="Global Actions"
					iconCategory="utility"
					iconName="add"
					onSelect={function () { console.log('>>> onSelect'); }}
					options={[
						{ label: 'New Note' },
						{ label: 'Log a Call' }
					]}
				/>
				<GlobalHeaderButton
					assistiveText="Help and Training"
					iconName="question"
					onClick={function () { console.log('>>> onClick'); }}
				/>
				<GlobalHeaderButton
					assistiveText="Setup"
					iconName="settings"
					onClick={function () { console.log('>>> onClick'); }}
				/>
				<GlobalHeaderProfile
					avatar="/images/avatar2.jpg"
					onClick={function () { console.log('>>> onClick'); }}
					onSelect={function () { console.log('>>> onSelect'); }}
					options={[
						{ label: 'Profile Menu' }
					]}
				/>
			</GlobalHeader>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
