import React from 'react';

import IconSettings from '~/components/icon-settings';
import Dropdown from '~/components/menu-dropdown'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'MediaObjectExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<span>Checkmark </span>
						<Dropdown
							assistiveText={{ icon: 'Checkmark' }}
							checkmark
							iconCategory="utility"
							iconName="down"
							iconVariant="border-filled"
							onSelect={(value) => {
								console.log('selected: ', value);
							}}
							options={[
								{ label: 'Menu Item One', value: 'A0' },
								{ label: 'Menu Item Two', value: 'B0' },
								{ label: 'Menu Item Three', value: 'C0' },
							]}
							value="A0"
						/>
					</div>
					<div className="slds-col_padded">
						<span>Checkmark with right icon </span>
						<Dropdown
							assistiveText={{ icon: 'Checkmark with right icon' }}
							buttonVariant="icon"
							checkmark
							iconName="settings"
							iconSize="large"
							iconVariant="more"
							onSelect={(value) => {
								console.log('selected: ', value);
							}}
							options={[
								{
									label: 'Table View',
									value: 'A0',
									rightIcon: {
										category: 'utility',
										name: 'table',
									},
								},
								{
									label: 'Kanban Board',
									value: 'A0',
									rightIcon: {
										category: 'utility',
										name: 'kanban',
									},
								},
								{
									label: 'List View',
									value: 'A0',
									rightIcon: {
										category: 'utility',
										name: 'side_list',
									},
								},
							]}
							value="A0"
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
