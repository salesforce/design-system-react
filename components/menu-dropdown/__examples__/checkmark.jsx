import React from 'react';

import IconSettings from '~/components/icon-settings';
import Dropdown from '~/components/menu-dropdown'; // `~` is replaced with design-system-react at runtime

const options = [
	{
		label: 'Table View',
		value: 'table',
		rightIcon: {
			category: 'utility',
			name: 'table',
		},
	},
	{
		label: 'Kanban Board',
		value: 'kanban',
		rightIcon: {
			category: 'utility',
			name: 'kanban',
		},
	},
	{
		label: 'List View',
		value: 'list',
		rightIcon: {
			category: 'utility',
			name: 'side_list',
		},
	},
];
class Example extends React.Component {
	static displayName = 'MediaObjectExample';

	constructor(props) {
		super(props);
		this.state = {
			selectedOptionIndex: 0,
			value: 'A0',
		};
	}

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
							id="checkmark-menu-dropdown"
							iconVariant="border-filled"
							onSelect={(event, { option, value }) => {
								console.log('selected: ', option);
								this.setState({ value });
							}}
							options={[
								{ label: 'Menu Item One', value: 'A0' },
								{ label: 'Menu Item Two', value: 'B0' },
								{ label: 'Menu Item Three', value: 'C0' },
							]}
							value={this.state.value}
							{...this.props}
						/>
					</div>
					<div className="slds-col_padded">
						<span>Checkmark with right icon </span>
						<Dropdown
							assistiveText={{ icon: 'Checkmark with right icon' }}
							buttonVariant="icon"
							checkmark
							iconCategory={
								options[this.state.selectedOptionIndex].rightIcon.category
							}
							iconName={options[this.state.selectedOptionIndex].rightIcon.name}
							iconSize="large"
							iconVariant="more"
							id="checkmark-menu-dropdown-right-icon"
							onSelect={(event, { optionIndex }) => {
								this.setState({ selectedOptionIndex: optionIndex });
							}}
							options={options}
							value={options[this.state.selectedOptionIndex].value}
							{...this.props}
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
