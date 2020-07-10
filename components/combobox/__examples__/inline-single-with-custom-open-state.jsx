/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Combobox from '~/components/combobox';
import Icon from '~/components/icon';
import comboboxFilterAndLimit from '~/components/combobox/filter';
import IconSettings from '~/components/icon-settings';

const accounts = [
	{
		id: '1',
		label: 'Acme',
		subTitle: 'Account • San Francisco',
		type: 'account',
	},
	{
		id: '2',
		label: 'Salesforce.com, Inc.',
		subTitle: 'Account • San Francisco',
		type: 'account',
	},
	{
		id: '3',
		label: "Paddy's Pub",
		subTitle: 'Account • Boston, MA',
		type: 'account',
	},
	{
		id: '4',
		label: 'Tyrell Corp',
		subTitle: 'Account • San Francisco, CA',
		type: 'account',
	},
	{
		id: '5',
		label: 'Paper St. Soap Company',
		subTitle: 'Account • Beloit, WI',
		type: 'account',
	},
	{
		id: '6',
		label: 'Nakatomi Investments',
		subTitle: 'Account • Chicago, IL',
		type: 'account',
	},
	{ id: '7', label: 'Acme Landscaping', type: 'account' },
	{
		id: '8',
		label: 'Acme Construction',
		subTitle: 'Account • Grand Marais, MN',
		type: 'account',
	},
];

const accountsWithIcon = accounts.map((elem) => ({
	...elem,
	...{
		icon: (
			<Icon
				assistiveText={{ label: 'Account' }}
				category="standard"
				name={elem.type}
			/>
		),
	},
}));

class Example extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inputValue: '',
			selection: [],
			isOpen: false,
		};
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Combobox
					id="combobox-inline-single"
					events={{
						onChange: (event, { value }) => {
							if (this.props.action) {
								this.props.action('onChange')(event, value);
							} else if (console) {
								console.log('onChange', event, value);
							}
							this.setState({ inputValue: value });
						},
						onRequestClose: () => {
							this.setState((prevState) => ({
								...prevState,
								isOpen: false,
								inputValue: '',
							}));
						},
						onRequestOpen: () => {
							this.setState((prevState) => ({ ...prevState, isOpen: true }));
						},
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
								isOpen: false,
							});
						},
					}}
					labels={{
						label: 'Search',
						placeholder: 'Search Salesforce',
					}}
					options={comboboxFilterAndLimit({
						inputValue: this.state.inputValue,
						options: accountsWithIcon,
						selection: this.state.selection,
					})}
					predefinedOptionsOnly
					selection={this.state.selection}
					isOpen={this.state.isOpen}
					value={
						this.state.selection.length > 0
							? this.state.selection[0].label
							: this.state.inputValue
					}
					variant="inline-listbox"
				/>
			</IconSettings>
		);
	}
}

Example.displayName = 'ComboboxExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
