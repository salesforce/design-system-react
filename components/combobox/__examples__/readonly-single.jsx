/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Combobox from '~/components/combobox';
import IconSettings from '~/components/icon-settings';

const accounts = [
	{
		id: '1',
		label: 'Acme',
	},
	{
		id: '2',
		label: 'Salesforce.com, Inc.',
	},
	{
		id: '3',
		label: "Paddy's Pub",
	},
	{
		id: '4',
		label: 'Tyrell Corp',
	},
	{
		id: '5',
		label: 'Paper St. Soap Company',
	},
	{
		id: '6',
		label: 'Nakatomi Investments',
	},
	{ id: '7', label: 'Acme Landscaping' },
	{
		id: '8',
		label: 'Acme Construction',
	},
];

class Example extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inputValue: '',
			selection: [],
		};
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Combobox
					id="combobox-readonly-single"
					events={{
						onSelect: (event, data) => {
							if (this.props.action) {
								this.props.action('onSelect')(
									event,
									...Object.keys(data).map((key) => data[key])
								);
							} else if (console) {
								console.log('onSelect', event, data);
							}
							this.setState({
								inputValue: '',
								selection: data.selection,
							});
						},
					}}
					labels={{
						label: 'Search',
						placeholder: 'Search Salesforce',
					}}
					options={accounts}
					selection={this.state.selection}
					value={this.state.inputValue}
					variant="readonly"
				/>
			</IconSettings>
		);
	}
}

Example.displayName = 'ComboboxExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
