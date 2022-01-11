import React from 'react';

import IconSettings from '~/components/icon-settings';
import Picklist from '~/components/menu-picklist'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'PicklistExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<Picklist
							label="Contacts"
							onSelect={(option, data) => {
								console.log('selected: ', data.option);
							}}
							options={[
								{ label: 'Option A', value: 'A0' },
								{ label: 'Option B', value: 'B0' },
								{ label: 'Option C', value: 'C0' },
								{ label: 'Option D', value: 'D0' },
								{ label: 'Option E', value: 'E0' },
								{ label: 'Option FGHIJKLMNOPQRSTUVWXYZ', value: 'F0' },
							]}
							placeholder="Select a contact"
							silenceDeprecationWarning
						/>
					</div>
					<div className="slds-col_padded">
						<Picklist
							label="Option selected"
							onSelect={(option, data) => {
								console.log('selected: ', data.option);
							}}
							options={[
								{ label: 'Option A', value: 'A0' },
								{ label: 'Option B', value: 'B0' },
								{ label: 'Option C', value: 'C0' },
								{ label: 'Option D', value: 'D0' },
								{ label: 'Option E', value: 'E0' },
								{ label: 'Option FGHIJKLMNOPQRSTUVWXYZ', value: 'F0' },
							]}
							placeholder="Select a contact"
							value="C0"
							silenceDeprecationWarning
						/>
					</div>
					<div className="slds-col_padded">
						<Picklist
							disabled
							label="Disabled"
							onSelect={(option, data) => {
								console.log('selected: ', data.option);
							}}
							options={[
								{ label: 'Option A', value: 'A0' },
								{ label: 'Option B', value: 'B0' },
								{ label: 'Option C', value: 'C0' },
								{ label: 'Option D', value: 'D0' },
								{ label: 'Option E', value: 'E0' },
								{ label: 'Option FGHIJKLMNOPQRSTUVWXYZ', value: 'F0' },
							]}
							placeholder="Select a contact"
							value="C0"
							silenceDeprecationWarning
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
