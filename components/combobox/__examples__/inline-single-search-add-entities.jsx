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
			isLoadingMenuItems: false,
			selection: [],
		};
	}

	delayOptionsLoad = () => {
		// A promise should be used here for asynchronous callbacks
		setTimeout(() => {
			this.setState({ isLoadingMenuItems: false });
		}, 1000);
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Combobox
					id="combobox-unique-id"
					hasInputSpinner={this.state.isLoadingMenuItems}
					optionsSearchEntity={[
						{
							id: 'options-search-id-1',
							icon: (
								<Icon
									assistiveText={{ label: 'Search' }}
									size="x-small"
									category="utility"
									name="search"
								/>
							),
							label: 'Search in Salesforce',
						},
						{
							id: 'search-in-account-id',
							icon: (
								<Icon
									assistiveText={{ label: 'Search in Accounts' }}
									size="x-small"
									category="utility"
									name="search"
								/>
							),
							label: (searchTerm) => [
								searchTerm && searchTerm.length > 0 ? (
									<span className="slds-text-title_bold">{`"${searchTerm}" `}</span>
								) : (
									'Search '
								),
								'in Accounts',
							],
						},
					]}
					optionsAddItem={[
						{
							id: 'options-add-id-1',
							icon: (
								<Icon
									assistiveText={{ label: 'Add' }}
									category="utility"
									size="x-small"
									name="add"
								/>
							),
							label: 'New Entity',
						},
					]}
					events={{
						onChange: (event, { value }) => {
							if (this.props.action) {
								this.props.action('onChange')(event, value);
							} else if (console) {
								console.log('onChange', event, value);
							}
							this.setState({ inputValue: value, isLoadingMenuItems: true });
							this.delayOptionsLoad();
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
							});
						},
					}}
					labels={{
						label: 'Search',
						placeholder: 'Search Salesforce',
					}}
					options={
						this.state.isLoadingMenuItems
							? []
							: comboboxFilterAndLimit({
									inputValue: this.state.inputValue,
									options: accountsWithIcon,
									selection: this.state.selection,
							  })
					}
					selection={this.state.selection}
					value={
						this.state.selectedOption
							? this.state.selectedOption.label
							: this.state.inputValue
					}
					variant="inline-listbox"
					{...this.props}
				/>
			</IconSettings>
		);
	}
}

Example.displayName = 'ComboboxExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
