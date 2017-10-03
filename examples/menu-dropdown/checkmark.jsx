import React from 'react';
import createReactClass from 'create-react-class';
import Dropdown from '~/components/menu-dropdown'; // `~` is replaced with design-system-react at runtime

const Example = createReactClass({
	displayName: 'MediaObjectExample',

	render () {
		return (
			<div className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center">
				<div className="slds-col--padded">
					<span>Checkmark </span>
					<Dropdown
						assistiveText="Checkmark"
						checkmark
						iconName="down"
						iconVariant="border-filled"
						onSelect={(value) => { console.log('selected: ', value); }}
						options={[
							{ label: 'Menu Item One', value: 'A0' },
							{ label: 'Menu Item Two', value: 'B0' },
							{ label: 'Menu Item Three', value: 'C0' }
						]}
						value="A0"
					/>
				</div>
				<div className="slds-col--padded">
					<span>Checkmark with right icon </span>
					<Dropdown
						assistiveText="Checkmark with right icon"
						buttonVariant="icon"
						checkmark
						iconName="settings"
						iconSize="large"
						iconVariant="more"
						onSelect={(value) => { console.log('selected: ', value); }}
						options={[
							{ label: 'Table View',
								value: 'A0',
								rightIcon: {
									category: 'utility',
									name: 'table'
								}
							},
							{ label: 'Kanban Board',
								value: 'A0',
								rightIcon: {
									category: 'utility',
									name: 'kanban'
								}
							},
							{ label: 'List View',
								value: 'A0',
								rightIcon: {
									category: 'utility',
									name: 'side_list'
								}
							}
						]}
						value="A0"
					/>
				</div>
			</div>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
