import React from 'react';
import cloneDeep from 'lodash/lang/cloneDeep';
import Dropdown from './index';
import Menu from '../menu';
import MenuItems from '../menu/menu-items';
import Button from '../button';
import Trigger from './button-trigger';

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
		text: 'Navigate to Google',
		value: '3',
		href: 'http://google.com'
	}
];

const sampleDataWithIcons = cloneDeep(sampleData);
sampleDataWithIcons[0].iconCategory = 'utility';
sampleDataWithIcons[0].iconName = 'table';
sampleDataWithIcons[1].iconCategory = 'utility';
sampleDataWithIcons[1].iconName = 'kanban';
sampleDataWithIcons[2].iconCategory = 'utility';
sampleDataWithIcons[2].iconName = 'side_list';

const DropdownExample = React.createClass({
	displayName: 'DropdownExample',

	getInitialState () {
		return {
			selectionDefault: sampleData[0],
			selectionCheckmark: null,
			selectionDropdownTrigger: sampleData[0],
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
						collection={sampleDataWithIcons}
						id="nubbin-example"
						onChange={this.handleChangeNubbin}
						selection={this.state.selectionNubbin}
						position="top left"
					>
						<Trigger>
							<Button iconCategory="utility" iconName="settings" iconStyle="icon-container" assistiveText="Settings" />
						</Trigger>
						<Menu>
							<MenuItems checkmark />
						</Menu>
					</Dropdown>
				</div>

			</div>
		);
	},

	handleChangeDefault (selection) {
		this.setState({ selectionDefault: selection });
	},

	handleChangeNubbin (selection) {
		this.setState({ selectionNubbin: selection });
	}
});

// <-- SAMPLE CONTROL CODE

const DropdownDevExample = React.createClass({
	displayName: 'DropdownDevExample',

	getInitialState () {
		return {
			selectionDefault: sampleData[0],
			selectionCheckmark: null,
			selectionDropdownTrigger: sampleData[0],
			selectionCustomTrigger: sampleData[0]
		};
	},

	render () {
		return (
			<div className="slds-grid slds-grid--vertical">

				<div className="slds-col | slds-m-bottom--small">
					<Dropdown
						collection={sampleData}
						id="top-left-example"
						onChange={this.handleChangeDefault}
						selection={this.state.selectionDefault}
						position="top left"
					>
						<Trigger>
							<Button iconCategory="utility" iconName="settings" iconStyle="icon-container" assistiveText="Settings" />
						</Trigger>
					</Dropdown>
				</div>

				<div className="slds-col | slds-m-bottom--small">
					<Dropdown
						collection={sampleData}
						id="top-example"
						onChange={this.handleChangeDefault}
						selection={this.state.selectionDefault}
						position="top"
					>
						<Trigger>
							<Button iconCategory="utility" iconName="settings" iconStyle="icon-container" assistiveText="Settings" />
						</Trigger>
					</Dropdown>
				</div>

				<div className="slds-col | slds-m-bottom--small">
					<Dropdown
						collection={sampleData}
						id="top-right-example"
						onChange={this.handleChangeDefault}
						selection={this.state.selectionDefault}
						position="top right"
					>
						<Trigger>
							<Button iconCategory="utility" iconName="settings" iconStyle="icon-container" assistiveText="Settings" />
						</Trigger>
					</Dropdown>
				</div>

				<div className="slds-col | slds-m-bottom--small">
					<Dropdown
						collection={sampleData}
						id="bottom-left-example"
						onChange={this.handleChangeDefault}
						selection={this.state.selectionDefault}
						position="bottom left"
					>
						<Trigger>
							<Button iconCategory="utility" iconName="settings" iconStyle="icon-container" assistiveText="Settings" />
						</Trigger>
					</Dropdown>
				</div>

				<div className="slds-col | slds-m-bottom--small">
					<Dropdown
						collection={sampleData}
						id="bottom-example"
						onChange={this.handleChangeDefault}
						selection={this.state.selectionDefault}
						position="bottom"
					>
						<Trigger>
							<Button iconCategory="utility" iconName="settings" iconStyle="icon-container" assistiveText="Settings" />
						</Trigger>
					</Dropdown>
				</div>

				<div className="slds-col | slds-m-bottom--small">
					<Dropdown
						collection={sampleData}
						id="bottom-right-example"
						onChange={this.handleChangeDefault}
						selection={this.state.selectionDefault}
						position="bottom right"
					>
						<Trigger>
							<Button iconCategory="utility" iconName="settings" iconStyle="icon-container" assistiveText="Settings" />
						</Trigger>
					</Dropdown>
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

	handleChangeNubbin (selection) {
		this.setState({ selectionNubbin: selection });
	},

	handleChangeDropdownTrigger (selection) {
		this.setState({ selectionDropdownTrigger: selection });
	},

	handleChangeCustomTrigger (selection) {
		this.setState({ selectionCustomTrigger: selection });
	}
});

export { DropdownDevExample };
export default DropdownExample;
