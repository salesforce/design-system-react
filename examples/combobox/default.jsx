/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Combobox from '~/components/combobox';
import Icon from '~/components/icon';

const accounts = [
	{ label: 'Acme', subTitle: 'Account • San Francisco', type: 'account' },
	{ label: 'Salesforce.com, Inc.', subTitle: 'Account • San Francisco', type: 'account' },
	{ label: 'Paddy\'s Pub', subTitle: 'Account • Boston, MA', type: 'account' },
	{ label: 'Tyrell Corp', subTitle: 'Account • San Francisco, CA', type: 'account' },
	{ label: 'Paper St. Soap Company', subTitle: 'Account • Beloit, WI', type: 'account' },
	{ label: 'Nakatomi Investments', subTitle: 'Account • Chicago, IL', type: 'account' },
	{ label: 'Acme Landscaping', type: 'account' },
	{ label: 'Acme Construction', subTitle: 'Account • Grand Marais, MN', type: 'account' }
];

const accountsWithIcon = accounts.map((elem) => Object.assign(elem, {
	icon: <Icon
		assistiveText="Account"
		category="standard"
		name={elem.type}
	/> })
);

class Example extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			inputValue: '',
			selection: []
		};
	}

	render () {
		return (
			<Combobox
				onChange={(event, { value }) => {
					console.log('onChange', value);
					this.setState({	inputValue: value });
				}}
				onRequestRemoveSelectedOption={(event, data) => {
					this.setState({
						inputValue: '',
						selection: []
					});
				}}
				onSelect={(event, data) => {
					this.setState({ selection: data.selection });
				}}
				options={accountsWithIcon}
				selection={this.state.selection}
				value={this.state.selectedOption ? this.state.selectedOption.label : this.state.inputValue}
			/>
		);
	}
}

Example.displayName = 'ComboboxExample';
export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
