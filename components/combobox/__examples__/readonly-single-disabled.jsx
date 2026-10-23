/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Combobox from '~/components/combobox';
import IconSettings from '~/components/icon-settings';

const accounts = [
	{
		id: '1',
		label: 'Acme',
		subTitle: 'Account • San Francisco',
		category: 'account',
	},
	{
		id: '2',
		label: 'Salesforce.com, Inc.',
		subTitle: 'Account • San Francisco',
		category: 'account',
	},
	{
		id: '3',
		label: "Paddy's Pub",
		subTitle: 'Account • Boston, MA',
		category: 'account',
	},
	{
		id: '4',
		label: 'Tyrell Corp',
		subTitle: 'Account • San Francisco, CA',
		category: 'account',
	},
	{
		id: '5',
		label: 'Paper St. Soap Company',
		subTitle: 'Account • Beloit, WI',
		category: 'account',
	},
	{
		id: '6',
		label: 'Nakatomi Investments',
		subTitle: 'Account • Chicago, IL',
		category: 'account',
	},
	{ id: '7', label: 'Acme Landscaping', category: 'account' },
	{
		id: '8',
		label: 'Acme Construction',
		subTitle: 'Account • Grand Marais, MN',
		category: 'account',
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
					id="combobox-unique-id"
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
					singleInputDisabled
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
