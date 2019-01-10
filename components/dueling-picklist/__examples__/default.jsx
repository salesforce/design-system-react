/* eslint-disable no-console, react/prop-types */
import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import DuelingPicklist from '~/components/dueling-picklist';
import duelingPicklistFilter from '~/components/dueling-picklist/filter';

const Example = createReactClass({
	displayName: 'DuelingPicklistExample',
	
	getInitialState() {
		return {
			options: [
				{
					id: '1',
					label: 'Banana',
				},
				{
					id: '2',
					label: 'Orange',
				},
			],
			selected: [
				{
					id: '3',
					label: 'Apple'
				}
			],
		}
	},
	
	handleChange(selected) {
		this.setState({
			selected
		})
	},

	render () {
		const { selected } = this.state;
		const options = duelingPicklistFilter({
			options: this.state.options,
			selected,
		});
		return (
			<IconSettings iconPath="/assets/icons">
				<DuelingPicklist
					options={options}
					selected={selected}
					events={{
						onChange: this.handleChange
					}}
				/>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
