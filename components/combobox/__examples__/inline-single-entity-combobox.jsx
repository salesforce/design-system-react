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
const entities = [
	{
		id: '0',
		label: 'Suggested for you',
		type: 'separator',
	},
	{
		id: '1',
		label: 'All',
	},
	{
		id: '2',
		label: 'Accounts',
	},
	{
		id: '3',
		label: 'Analytics',
	},
	{
		id: '4',
		label: 'Approvals',
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
const entityWithIcon = entities.map((elem) => ({
	...elem,
	...{
		icon: (
			<Icon
				assistiveText={{ label: 'Socialshare' }}
				category="utility"
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
			entityInputValue: '',
			selection: [],
			entitySelection: [entities[1]],
		};
	}

	entityCombobox = () => (
		<Combobox
			assistiveText={{ label: 'Filter Search by:' }}
			id="combobox-new-unique-id"
			events={{
				onChange: (event, { value }) => {
					this.props.action('onChange')(event, value);
					this.setState({ entityInputValue: value });
				},
				onRequestRemoveSelectedOption: (event, data) => {
					this.setState({
						entityInputValue: '',
						entitySelection: data.selection,
					});
				},
				onSubmit: (event, { value }) => {
					if (this.props.action) {
						this.props.action('onChange')(event, value);
					} else if (console) {
						console.log('onChange', event, value);
					}
					this.setState({
						entityInputValue: '',
						entitySelection: [
							...this.state.entitySelection,
							{
								label: value,
								icon: (
									<Icon
										assistiveText="Account"
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
						entityInputValue: '',
						entitySelection: data.selection,
					});
				},
			}}
			options={comboboxFilterAndLimit({
				inputValue: this.state.entityInputValue,
				options: entityWithIcon,
				selection: this.state.entitySelection,
			})}
			selection={this.state.entitySelection}
			value={this.state.entityInputValue}
			variant="readonly"
		/>
	);

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Combobox
					id="combobox-unique-id"
					events={{
						onChange: (event, { value }) => {
							this.props.action('onChange')(event, value);
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
												assistiveText="Account"
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
					options={comboboxFilterAndLimit({
						inputValue: this.state.inputValue,
						options: accountsWithIcon,
						selection: this.state.selection,
					})}
					selection={this.state.selection}
					value={this.state.inputValue}
					variant="inline-listbox"
					entityCombobox={this.entityCombobox()}
				/>
			</IconSettings>
		);
	}
}

Example.displayName = 'ComboboxExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
