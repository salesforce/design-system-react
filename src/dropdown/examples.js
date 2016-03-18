import React from 'react';
import * as Lib from 'slds-for-js-core/lib';
import Dropdown from './index';

// SAMPLE CONTROL CODE -->

const dropdownSampleData = [
	{
		id: 0,
		text: 'Menu Item One',
		value: '1',
		icon: 'utility.table'
	}, {
		id: 1,
		text: 'Menu Item Two',
		value: '2',
		icon: 'utility.kanban'
	}, {
		id: 2,
		text: 'Menu Item Three',
		value: '3',
		icon: 'utility.side_list'
	}
];

const DropdownExample = React.createClass({
	displayName: 'DropdownExample',

	propTypes: {
		models: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	getInitialState () {
		return {
			selectionOne: dropdownSampleData[0]
		};
	},

	render () {
		return (
			<div>
				<Dropdown
					checkmark
					collection={dropdownSampleData}
					selection={this.state.selectionOne}
					el="li"
					onChange={this.handleOneChange}
				/>
				<Dropdown
					checkmark
					collection={dropdownSampleData}
					selection={this.state.selectionTwo}
					el="li"
					onChange={this.handleTwoChange}
				/>
			</div>
		);
	},

	handleOneChange (selectionOne) {
		this.setState({ selectionOne });
	},

	handleTwoChange (selectionTwo) {
		this.setState({ selectionTwo });
	}
});

// <-- SAMPLE CONTROL CODE

export default DropdownExample;
