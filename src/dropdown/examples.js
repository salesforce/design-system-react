import React from 'react';
import { cloneDeep } from 'lodash';
import Dropdown from './index';
import Button from '../button';
import ButtonTrigger from './button-trigger';
import CustomTrigger from './custom-trigger';

// SAMPLE CONTROL CODE -->

const sampleData = [
	{
		id: 0,
		text: 'Menu Item One',
		value: '1'
	}, {
		id: 1,
		text: 'Menu Item Two',
		value: '2'
	}, {
		id: 2,
		text: 'Menu Item Three',
		value: '3',
		href: 'http://google.com'
	}
];

const sampleDataWithIcons = cloneDeep(sampleData);
sampleDataWithIcons[0].icon = 'utility.table';
sampleDataWithIcons[1].icon = 'utility.kanban';
sampleDataWithIcons[2].icon = 'utility.side_list';

const DropdownExample = React.createClass({
	displayName: 'DropdownExample',

	getInitialState () {
		return {
			selectionDefault: sampleData[0],
			selectionCheckmark: sampleDataWithIcons[0],
			selectionButtonTrigger: sampleData[0],
			selectionCustomTrigger: sampleData[0]
		};
	},

	render () {
		return (
			<div className="slds-grid slds-grid--vertical">
				<div className="slds-col | slds-m-bottom--small">
					<Dropdown
						collection={sampleData}
						id="default-example"
						onChange={this.handleChangeDefault}
						selection={this.state.selectionDefault}
					/>
				</div>

				<div className="slds-col | slds-m-bottom--small">
					<Dropdown
						checkmark
						collection={sampleDataWithIcons}
						id="checkmark-example"
						onChange={this.handleChangeCheckmark}
						selection={this.state.selectionCheckmark}
						swapIcon
					/>
				</div>

				<div className="slds-col | slds-m-bottom--small">
					<Dropdown
						collection={sampleData}
						checkmark
						id="button-trigger-example"
						onChange={this.handleChangeButtonTrigger}
						selection={this.state.selectionButtonTrigger}
					>
						<ButtonTrigger>
							<Button theme="brand" text="Default Trigger, Custom Button" />
						</ButtonTrigger>
					</Dropdown>
				</div>

				<div className="slds-col | slds-m-bottom--small">
					<ul style={{ backgroundColor: 'rgb(255, 181, 94)' }}>
						<Dropdown
							checkmark
							collection={sampleData}
							id="custom-trigger-example"
							onChange={this.handleChangeCustomTrigger}
							selection={this.state.selectionCustomTrigger}
						>
							<CustomTrigger />
						</Dropdown>
					</ul>
				</div>
			</div>
		);
	},

	handleChangeDefault (selection) {
		this.setState({ selectionDefault: selection });
	},

	handleChangeCheckmark (selection) {
		this.setState({ selectionCheckmark: selection });
	},

	handleChangeButtonTrigger (selection) {
		this.setState({ selectionButtonTrigger: selection });
	},

	handleChangeCustomTrigger (selection) {
		this.setState({ selectionCustomTrigger: selection });
	}
});

// <-- SAMPLE CONTROL CODE

export default DropdownExample;
