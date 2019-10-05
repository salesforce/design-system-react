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
					isOpen
					id="combobox-unique-id"
					optionsSearchEntity={[
						{
							id: 'my-new-id',
							icon: (
								<Icon
									assistiveText={{ label: 'Search' }}
									size="x-small"
									category="utility"
									name="search"
								/>
							),
							label: 'salesforce',
							onClick: (event) => console.log('onClick', event),
						},
					]}
					optionsAddItem={[
						{
							id: 'my-new-id',
							icon: (
								<Icon
									assistiveText={{ label: 'Add' }}
									category="utility"
									size="x-small"
									name="add"
								/>
							),
							label: 'New Entity',
							onClick: (event) => console.log('onClick', event),
						},
					]}
					events={{
						onChange: (event, { value }) => {
							console.log('onChange', event, value);
							this.setState({ inputValue: value });
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
					options={comboboxFilterAndLimit({
						inputValue: this.state.inputValue,
						options: accountsWithIcon,
						selection: this.state.selection,
					})}
					selection={this.state.selection}
					value={
						this.state.selectedOption
							? this.state.selectedOption.label
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
