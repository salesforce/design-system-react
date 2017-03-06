import React from 'react';
import Picklist from '~/components/menu-picklist'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'PicklistExample',
	
	render () {
		return (
			<div className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center">
				<div className="slds-col--padded">
					<Picklist
						label="Contacts"
						onSelect={(value) => { console.log('selected: ', value); }}
						options={[
							{ label: 'Option A', value: 'A0' },
							{ label: 'Option B', value: 'B0' },
							{ label: 'Option C', value: 'C0' },
							{ label: 'Option D', value: 'D0' },
							{ label: 'Option E', value: 'E0' },
							{ label: 'Option FGHIJKLMNOPQRSTUVWXYZ', value: 'F0' }
						]}
						placeholder="Select a contact"
					/>
				</div>
				<div className="slds-col--padded">
					<Picklist
						label="Option selected"
						onSelect={(value) => { console.log('selected: ', value); }}
						options={[
							{ label: 'Option A', value: 'A0' },
							{ label: 'Option B', value: 'B0' },
							{ label: 'Option C', value: 'C0' },
							{ label: 'Option D', value: 'D0' },
							{ label: 'Option E', value: 'E0' },
							{ label: 'Option FGHIJKLMNOPQRSTUVWXYZ', value: 'F0' }
						]}
						placeholder="Select a contact"
						value="C0"
					/>
				</div>
				<div className="slds-col--padded">
					<Picklist
						disabled
						label="Disabled"
						onSelect={(value) => { console.log('selected: ', value); }}
						options={[
							{ label: 'Option A', value: 'A0' },
							{ label: 'Option B', value: 'B0' },
							{ label: 'Option C', value: 'C0' },
							{ label: 'Option D', value: 'D0' },
							{ label: 'Option E', value: 'E0' },
							{ label: 'Option FGHIJKLMNOPQRSTUVWXYZ', value: 'F0' }
						]}
						placeholder="Select a contact"
						value="C0"
					/>
				</div>
			</div>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
