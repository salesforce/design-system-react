<SLDSGlobalHeader
	logoSrc="/images/logo.svg"
	onSkipToContent={function () { console.log('>>> Skip to Content Clicked'); }}
	onSkipToNav={function () { console.log('>>> Skip to Nav Clicked'); }}
>
	<SLDSGlobalHeaderSearch
		onSelect={function () { console.log('>>> onSelect'); }}
		options={[
			{ label: 'Email' },
			{ label: 'Mobile' }
		]}
	/>
	<SLDSGlobalHeaderButton
		className="slds-m-right--small"
		iconVariant={null}
		label="Feedback"
		onClick={function () { console.log('>>> onClick'); }}
		variant="neutral"
	/>
	<SLDSGlobalHeaderDropdown
		assistiveText="Global Actions"
		iconCategory="utility"
		iconName="add"
		onSelect={function () { console.log('>>> onSelect'); }}
		options={[
			{ label: 'New Note' },
			{ label: 'Log a Call' }
		]}
	/>
	<SLDSGlobalHeaderButton
		assistiveText="Help and Training"
		iconName="question"
		onClick={function () { console.log('>>> onClick'); }}
	/>
	<SLDSGlobalHeaderButton
		assistiveText="Setup"
		iconName="settings"
		onClick={function () { console.log('>>> onClick'); }}
	/>
	<SLDSGlobalHeaderProfile
		avatar="/images/avatar2.jpg"
		onClick={function () { console.log('>>> onClick'); }}
		onSelect={function () { console.log('>>> onSelect'); }}
		options={[
			{ label: 'Profile Menu' }
		]}
	/>
</SLDSGlobalHeader>
