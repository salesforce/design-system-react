/* eslint-disable no-console, react/prop-types */
import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import DuelingPicklist from '~/components/dueling-picklist';

const Example = createReactClass({
	displayName: 'DuelingPicklistExample',
	
	handleChange() {
		console.log(arguments)
	},

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<DuelingPicklist
					options={[
						{
							id: 1,
							label: 'Banana',
						},
						{
							id: 2,
							label: 'Orange',
						},
					]}
					selected={[
						{
							id: 3,
							label: 'Apple'
						}
					]}
					events={{
						onChange: this.handleChange.bind(this)
					}}
				/>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
