/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Combobox from '~/components/combobox';
import IconSettings from '~/components/icon-settings';

const accounts = [
	{
		id: '1',
		label: 'Acme',
		subTitle: 'Account • San Francisco',
	},
	{
		id: '2',
		label: 'Salesforce.com, Inc.',
		subTitle: 'Account • San Francisco',
	},
	{
		id: '3',
		label: "Paddy's Pub",
		subTitle: 'Account • Boston, MA',
	},
	{
		id: '4',
		label: 'Tyrell Corp',
		subTitle: 'Account • San Francisco, CA',
	},
	{
		id: '5',
		label: 'Paper St. Soap Company',
		subTitle: 'Account • Beloit, WI',
	},
	{
		id: '6',
		label: 'Nakatomi Investments',
		subTitle: 'Account • Chicago, IL',
	},
	{ id: '7', label: 'Acme Landscaping' },
	{
		id: '8',
		label: 'Acme Construction',
		subTitle: 'Account • Grand Marais, MN',
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
					id="combobox-readonly-multiple"
					events={{
						onRequestRemoveSelectedOption: (event, data) => {
							this.setState({
								inputValue: '',
								selection: data.selection,
							});
						},
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
					hasDeselect
					labels={{
						label: 'Search',
						placeholder: 'Search Salesforce',
					}}
					multiple
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
