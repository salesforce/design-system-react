/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Combobox from '~/components/combobox/combobox';
import Icon from '~/components/icon';
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
			selection: [accountsWithIcon[1]],
		};
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Combobox
					assistiveText={{ label: 'Search' }}
					id="combobox-unique-id"
					labels={{
						placeholder: 'Search Salesforce',
					}}
					menuPosition="relative"
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
