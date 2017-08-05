/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Combobox from '~/components/combobox';
import Icon from '~/components/icon';
import escapeRegExp from 'lodash.escaperegexp';

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

const defaultFilter = (term, item) => {
	if (!term) return true;
	return (item.data && item.data.type === 'section') || item.label.match(new RegExp(escapeRegExp(term), 'ig'));
};

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

	filter = (options, inputValue) => {
		return options.filter((item) => {
			if (!inputValue) return true;
			return (item.data && item.data.type === 'section')
				|| item.label.match(new RegExp(escapeRegExp(inputValue), 'ig'));
		});
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
				onSubmit={(event, { value }) => {
					console.log('onSubmit', value);
					this.setState({ selection: [{
						label: value,
						icon: <Icon
							assistiveText="Account"
							category="standard"
							name="account"
						/> }] });
				}}
				onSelect={(event, data) => {
					console.log('onSelect', data);
					this.setState({ selection: data.selection });
				}}
				options={this.filter(accountsWithIcon, this.state.inputValue)}
				selection={this.state.selection}
				value={this.state.selectedOption ? this.state.selectedOption.label : this.state.inputValue}
			/>
		);
	}
}

Example.displayName = 'ComboboxExample';
export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
