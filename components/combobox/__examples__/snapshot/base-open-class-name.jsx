/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Combobox from '~/components/combobox/combobox';
import Icon from '~/components/icon';
import IconSettings from '~/components/icon-settings';

const accounts = [
	{
		id: '0',
		label: 'Accounts',
		type: 'separator',
	},
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
					className="this-is-the-input"
					classNameContainer="this-is-the-container"
					classNameMenu="this-is-the-menu"
					classNameMenuSubHeader="this-is-the-menu-sub-header"
					id="combobox-unique-id"
					isOpen
					labels={{
						placeholder: 'Search Salesforce',
					}}
					menuPosition="relative"
					onChange={(event, { value }) => {
						console.log('onChange', value);
						this.setState({ inputValue: value });
					}}
					onRequestRemoveSelectedOption={(event, data) => {
						this.setState({
							inputValue: '',
							selection: [],
						});
					}}
					onSubmit={(event, { value }) => {
						console.log('onSubmit', value);
						this.setState({
							selection: [
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
					}}
					onSelect={(event, data) => {
						console.log('onSelect', data);
						this.setState({ selection: data.selection });
					}}
					options={accountsWithIcon}
					selection={this.state.selection}
					value={
						this.state.selectedOption
							? this.state.selectedOption.label
							: this.state.inputValue
					}
				/>
			</IconSettings>
		);
	}
}

Example.displayName = 'ComboboxExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
