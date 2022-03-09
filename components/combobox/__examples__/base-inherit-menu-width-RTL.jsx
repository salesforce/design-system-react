/* eslint-disable no-console, react/prop-types, react/jsx-pascal-case */
import React from 'react';
import Combobox from '~/components/combobox';
import Icon from '~/components/icon';
import comboboxFilterAndLimit from '~/components/combobox/filter';
import IconSettings from '~/components/icon-settings';
// eslint-disable-next-line camelcase
import UNSAFE_DirectionSettings from '~/components/utilities/UNSAFE_direction';

const accounts = [
	{
		id: '1',
		label:
			'A very very very very very very very very very very very long title to show how menu width will behave',
		subTitle: 'Account • San Francisco ',
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
		label: 'Opportunities',
		subTitle: 'Opportunity • San Francisco, CA',
		type: 'account',
	},
	{
		id: '5',
		label: 'Nakatomi Investments',
		subTitle: 'Opportunity • Chicago, IL',
		type: 'opportunity',
	},
	{ id: '6', label: 'Acme Landscaping', subTitle: '\u00A0', type: 'account' },
	{
		id: '7',
		label: 'Acme Construction',
		subTitle: 'Opportunity • Grand Marais, MN',
		type: 'opportunity',
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

/**
 * Combobox rendered in RTL mode. Note that styles might look broken since `salesforce-lightning-design-system.css` styles are loaded in LTR mode.
 * SLDS doesn't ship a static version of their css in RTL at the moment.
 */
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
			<div dir="rtl">
				<IconSettings iconPath="/assets/icons">
					<h1>1. Combobox in RTL mode.</h1>
					<h2 style={{ fontSize: '10px' }}>
						Note that <i>design-system.css</i> styles are in LTR. See example
						code for more info.
					</h2>
					<UNSAFE_DirectionSettings.Provider value="rtl">
						<Combobox
							isOpen
							id="combobox-base-inherit-menu-width"
							disabled={this.props.disabled}
							inheritWidthOf="menu"
							events={{
								onChange: (event, { value }) => {
									if (this.props.action) {
										this.props.action('onChange')(event, value);
									} else if (console) {
										console.log('onChange', event, value);
									}
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
							menuMaxWidth="500px"
							multiple
							options={comboboxFilterAndLimit({
								inputValue: this.state.inputValue,
								limit: 10,
								options: accountsWithIcon,
								selection: this.state.selection,
							})}
							selection={this.state.selection}
							value={this.state.inputValue}
						/>
					</UNSAFE_DirectionSettings.Provider>
				</IconSettings>
			</div>
		);
	}
}

Example.displayName = 'ComboboxExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
