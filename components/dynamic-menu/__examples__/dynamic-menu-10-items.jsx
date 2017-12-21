/* eslint-disable no-console, react/prop-types */
import React from 'react';
import DynamicMenu from '~/components/dynamic-menu';


/* eslint-disable no-console, react/prop-types */
import Button from '~/components/button';
import Combobox from '~/components/combobox';
import Icon from '~/components/icon';
import comboboxFilterAndLimit from '~/components/combobox/filter';
import IconSettings from '~/components/icon-settings';


const accounts = [
	{ id: '1', label: 'Acme', subTitle: 'Account • San Francisco', type: 'account' },
	{ id: '2', label: 'Salesforce.com, Inc.', subTitle: 'Account • San Francisco', type: 'account' },
	{ id: '3', label: 'Paddy\'s Pub', subTitle: 'Account • Boston, MA', type: 'account' },
	{ id: '4', label: 'Tyrell Corp', subTitle: 'Account • San Francisco, CA', type: 'account' },
	{ id: '5', label: 'Paper St. Soap Company', subTitle: 'Account • Beloit, WI', type: 'account' },
	{ id: '6', label: 'Nakatomi Investments', subTitle: 'Account • Chicago, IL', type: 'account' },
	{ id: '7', label: 'Acme Landscaping', type: 'account' },
	{ id: '8', label: 'Acme Construction', subTitle: 'Account • Grand Marais, MN', type: 'account' }
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
			<IconSettings iconPath="/assets/icons">
				<DynamicMenu
					popoverOptions={[
						<Button
							key="1"
							label="Favorite this page"
							onClick={function () {}}
							icon={<Icon category="utility" name="add" />}
						/>,
						<Button
							key="2"
							label="Edit Favorites"
							onClick={function () {}}
							icon={<Icon category="utility" name="edit" />}
						/>
					]}
					popoverTriggerElement={
						<Button
							assistiveText="Icon Favorite"
							iconCategory="utility"
							iconName="favorite"
							iconVariant="border-filled"
							variant="icon"
						/>
					}
				>
					<Combobox
						id="combobox-unique-id"
						isOpen
						events={{
							onChange: (event, { value }) => {
								if (this.props.action) {
									this.props.action('onChange')(event, value);
								} else if (console) {
									console.log('onChange', event, value);
								}
								this.setState({	inputValue: value });
							},
							onRequestRemoveSelectedOption: (event, data) => {
								this.setState({
									inputValue: '',
									selection: data.selection
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
									selection: [...this.state.selection, {
										label: value,
										icon: <Icon
											assistiveText="Account"
											category="standard"
											name="account"
										/> }] });
							},
							onSelect: (event, data) => {
								if (this.props.action) {
									this.props.action('onSelect')(event, ...Object.keys(data).map((key) => data[key]));
								} else if (console) {
									console.log('onSelect', event, data);
								}
								this.setState({
									inputValue: ''
								// 	selection: data.selection
								});
							}
						}}
						labels={{
							label: 'Search',
							placeholder: 'Search Salesforce'
						}}
						options={comboboxFilterAndLimit({
							inputValue: this.state.inputValue,
							options: accountsWithIcon,
							selection: this.state.selection
						})}
						selection={this.state.selection}
						value={this.state.selectedOption ? this.state.selectedOption.label : this.state.inputValue}
						variant="inline-listbox"
					/>
					{/* <Button icon={<Icon category="standard" name="account" variant="icon" />} /> */}
				</DynamicMenu>
			</IconSettings>
		);
	}
}


Example.displayName = 'DynamicMenu10ItemsExample';
export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
