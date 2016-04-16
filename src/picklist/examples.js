import React from 'react';
import Picklist from './index';
import Menu from '../menu';
import MenuItems from '../menu/items';

// SAMPLE COMPONENT CODE -->

const sampleData = [
	{
		type: 'header',
		text: 'One thing'
	}, {
		id: 0,
		text: 'One',
		value: '1',
		iconCategory: 'utility',
		iconName: 'apps'
	}, {
		type: 'divider'
	}, {
		type: 'header',
		text: 'All the things'
	}, {
		id: 1,
		text: 'Two',
		value: '2',
		iconCategory: 'utility',
		iconName: 'email'
	}, {
		id: 2,
		text: 'Three',
		value: '3'
	}, {
		id: 3,
		text: 'Buzz',
		value: '4'
	}, {
		id: 4,
		text: 'Item Five',
		value: 'Item Five',
		fizz: 'buzz',
		foo: 'bar'
	}, {
		id: 5,
		text: 'A Disabled Item',
		disabled: true,
		value: 'disabled'
	}
];

const PicklistExample = React.createClass({
	displayName: 'PicklistExample',

	propTypes: {
		modal: React.PropTypes.bool
	},

	getInitialState () {
		return {
			selectionDefault: sampleData[1],
			selectionCustom: sampleData[1]
		};
	},

	render () {
		return (
			<div className="slds-grid slds-grid--vertical">

				<div className="slds-col | slds-m-bottom--small">
					<Picklist
						collection={sampleData}
						id="default-picklist-example"
						modalMenu={this.props.modal}
						onChange={this.handleChangeDefault}
						selection={this.state.selectionDefault}
					/>
				</div>

				<div className="slds-col | slds-m-bottom--small">
					<Picklist
						collection={sampleData}
						id="default-picklist-example"
						modalMenu={this.props.modal}
						onChange={this.handleChangeCustom}
						selection={this.state.selectionCustom}
					>
						<Menu>
							<MenuItems checkmark />
						</Menu>
					</Picklist>
				</div>

			</div>
		);
	},

	handleChangeDefault (selection) {
		this.setState({ selectionDefault: selection });
	},

	handleChangeCustom (selection) {
		this.setState({ selectionCustom: selection });
	}
});

// <-- SAMPLE COMPONENT CODE

export default PicklistExample;
