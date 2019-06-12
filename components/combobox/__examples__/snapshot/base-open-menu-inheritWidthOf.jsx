/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Combobox from '~/components/combobox';
import Icon from '~/components/icon';
import IconSettings from '~/components/icon-settings';

const accounts = [
	{
		id: '1',
		label: 'Accounts',
		type: 'separator',
	},
	{
		id: '2',
		label: 'Salesforce.com, Inc.',
		subTitle: 'Account • San Francisco',
		type: 'account',
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
					isOpen
					labels={{
						label: 'Search',
						placeholder: 'Search Salesforce',
					}}
					menuPosition="relative"
					events={{
						onChange: (event, { value }) => {
							console.log('onChange', value);
							this.setState({ inputValue: value });
						},
						onRequestRemoveSelectedOption: (event, data) => {
							this.setState({
								inputValue: '',
								selection: [],
							});
						},
						onSubmit: (event, { value }) => {
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
						},
						onSelect: (event, data) => {
							console.log('onSelect', data);
							this.setState({ selection: data.selection });
						},
					}}
					inheritWidthOf="menu"
					menuMaxWidth="500px"
					options={accounts}
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
