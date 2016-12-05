import Icon from 'design-system-react/components/icon';

<div className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center">
	<div className="slds-col--padded">
		<Icon
			assistiveText="Favorite"
			category="custom"
			name="custom1"
			size="small"
		/>
	</div>
	<div className="slds-col--padded">
		<Icon
			assistiveText="Accounts"
			category="standard"
			name="account"
		/>
	</div>
	<div className="slds-col--padded">
		<Icon
			assistiveText="Announcements"
			category="action"
			className="slds-m-around--x-small"
			name="announcement"
		/>
	</div>
	<div className="slds-col--padded">
		<Icon
			assistiveText="Approval"
			category="action"
			className="slds-m-around--x-small"
			name="approval"
			size="large"
		/>
	</div>
	<div className="slds-col--padded">
		<Icon
			assistiveText=""
			category="utility"
			inverse={false}
			name="open_folder"
			size="large"
		/>
		<span className="slds-m-left--x-small">Documents Folder</span>
	</div>
</div>
