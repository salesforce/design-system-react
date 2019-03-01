/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Combobox from '~/components/combobox';
import Icon from '~/components/icon';
import comboboxFilterAndLimit from '~/components/combobox/filter';
import comboboxAddSubheadings from '~/components/combobox/add-subheadings';
import IconSettings from '~/components/icon-settings';

const subheadings = [
	{
		id: 'account',
		label: 'Accounts',
		type: 'separator',
	},
	{
		id: 'opportunity',
		label: 'Opportunities',
		type: 'separator',
	},
];

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
		label: 'Vandelay Industries',
		subTitle: 'Account • San Francisco, CA',
		type: 'account',
	},
	{
		id: '6',
		label: 'Nakatomi Investments',
		subTitle: 'Opportunity • Chicago, IL',
		type: 'opportunity',
	},
	{ id: '7', label: 'Acme Landscaping', subTitle: '\u00A0', type: 'account' },
	{
		id: '8',
		label: 'Acme Construction',
		subTitle: 'Opportunity • Grand Marais, MN',
		type: 'opportunity',
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
		};
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Combobox
					id="combobox-base-menu-subheader"
					disabled={this.props.disabled}
					events={{
						onChange: (event, { value }) => {
							if (this.props.action) {
								this.props.action('onChange')(event, value);
							} else if (console) {
								console.log('onChange', event, value);
							}
							this.setState({ inputValue: value });
						},
						onRequestRemoveSelectedOption: (event, data) => {
							this.setState({
								inputValue: '',
								selection: data.selection,
							});
						},
						onSubmit: (event, { value }) => {
							if (this.props.action) {
								this.props.action('onChange')(event, value);
							} else if (console) {
								console.log('onChange', event, value);
							}
							this.setState({
								inputValue: '',
								selection: [
									...this.state.selection,
									{
										label: value,
										icon: (
											<Icon
												assistiveText={{ label: 'Account' }}
												category="standard"
												name="account"
											/>
										),
									},
								],
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
					labels={{
						label: 'Search',
						placeholder: 'Search Salesforce',
					}}
					multiple
					options={comboboxAddSubheadings({
						subheadings,
						filteredOptions: comboboxFilterAndLimit({
							inputValue: this.state.inputValue,
							limit: 10,
							options: accountsWithIcon,
							selection: this.state.selection,
						}),
					})}
					selection={this.state.selection}
					value={this.state.inputValue}
				/>
			</IconSettings>
		);
	}
}

Example.displayName = 'ComboboxExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
