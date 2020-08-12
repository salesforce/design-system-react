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
					isOpen
					id="combobox-unique-id"
					events={{
						onChange: (event, { value }) => {
							this.props.action('onChange')(event, value);
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
							console.log('onChange', event, value);
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
							console.log('onSelect', event, data);
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
					options={
						this.state.isLoadingMenuItems
							? comboboxFilterAndLimit({
									inputValue: this.state.inputValue,
									options: accountsWithIcon.slice(0, 3),
									selection: this.state.selection,
							  })
							: comboboxFilterAndLimit({
									inputValue: this.state.inputValue,
									options: accountsWithIcon,
									selection: this.state.selection,
							  })
					}
					selection={this.state.selection}
					value={this.state.inputValue}
					variant="inline-listbox"
					hasMenuSpinner
				/>
			</IconSettings>
		);
	}
}

Example.displayName = 'ComboboxExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
