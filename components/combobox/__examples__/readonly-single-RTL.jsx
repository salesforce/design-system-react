/* eslint-disable no-console, react/prop-types, react/jsx-pascal-case */
import React from 'react';
import Combobox from '~/components/combobox';
// eslint-disable-next-line camelcase
import UNSAFE_DirectionSettings from '~/components/utilities/UNSAFE_direction';
import IconSettings from '~/components/icon-settings';

const accounts = [
	{
		id: '1',
		label: 'Acme',
		subTitle: 'Account • San Francisco',
	},
	{
		id: '2',
		label: 'Salesforce.com, Inc.',
		subTitle: 'Account • San Francisco',
	},
	{
		id: '3',
		label: "Paddy's Pub",
		subTitle: 'Account • Boston, MA',
	},
	{
		id: '4',
		label: 'Tyrell Corp',
		subTitle: 'Account • San Francisco, CA',
	},
	{
		id: '5',
		label: 'Paper St. Soap Company',
		subTitle: 'Account • Beloit, WI',
	},
	{
		id: '6',
		label: 'Nakatomi Investments',
		subTitle: 'Account • Chicago, IL',
	},
	{ id: '7', label: 'Acme Landscaping' },
	{
		id: '8',
		label: 'Acme Construction',
		subTitle: 'Account • Grand Marais, MN',
	},
];

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
			<IconSettings iconPath="/assets/icons">
				<h1>1. Combobox in RTL mode.</h1>
				<h2 style={{ fontSize: '10px' }}>
					Note that <i>design-system.css</i> styles are in LTR. See example code
					for more info.
				</h2>
				<UNSAFE_DirectionSettings.Provider value="rtl">
					<div dir="rtl" style={{ width: '300px' }}>
						<Combobox
							id="combobox-readonly-single"
							events={{
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
							options={accounts}
							selection={this.state.selection}
							value={this.state.inputValue}
							variant="readonly"
						/>
					</div>
				</UNSAFE_DirectionSettings.Provider>
			</IconSettings>
		);
	}
}

Example.displayName = 'ComboboxExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
