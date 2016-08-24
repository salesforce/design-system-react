import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { LOOKUP } from '../../utilities/constants';
import Lookup from '../../components/lookup';
import SLDSButton from '../../components/button';

const DemoLookup = React.createClass({
	displayName: 'DemoLookup',

	getInitialState () {
		return {
			currentSelected: 2,
			options: [
				{ label: 'File 1' },
				{ label: 'File 2' },
				{ label: 'File 3' },
				{ label: 'File 4' }
			]
		};
	},

	clearSelected() {
		this.setState({ currentSelected: -1 });
	},

	render () {
		return (
			<div>
				<SLDSButton onClick={this.clearSelected}>Clear Selected</SLDSButton>
			<Lookup
				{...this.props}
				modal={false}
				onChange={action('change')}
				onSelect={this.handleSelect}
				options={this.state.options}
				selectedItem={this.state.currentSelected}
			/>
			</div>
		);
	},

	handleSelect (selectedItem, ...rest) {
		action('select')(selectedItem, ...rest);
		this.setState({ currentSelected: this.state.options.indexOf(selectedItem) });
	}
});

const DemoLookupAccounts = React.createClass({
	displayName: 'DemoLookupAccounts',

	getInitialState () {
		return {
			options: [
        {label: "Paddy\"s Pub", subTitle: "Boston, MA"},
        {label: "Tyrell Corp", subTitle: "San Francisco, CA"},
        {label: "Paper St. Soap Company", subTitle: "Beloit, WI"},
        {label: "Nakatomi Investments", subTitle: "Chicago, IL"},
        {label: "Acme Landscaping"},
        {label: "Acme Construction", subTitle: "Grand Marais, MN"}
      ]
		};
	},

	render () {
		return (
      <Lookup
        {...this.props}
        onChange={action('change')}
        onSelect={this.handleSelect}
        options={this.state.options}
        footerRenderer={Lookup.DefaultFooter}
        headerRenderer={Lookup.DefaultHeader}
      />
		);
	},

	handleSelect (selectedItem, ...rest) {
		action('select')(selectedItem, ...rest);
		this.setState({ selectedItem });
	}
});

storiesOf(LOOKUP, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Standard', () => <DemoLookup
		emptyMessage="No Files found"
		hasError={false}
		iconCategory="utility"
		iconName="open_folder"
		label="Files"
	/>)
	.add('Standard with Accounts', () => <DemoLookupAccounts
		emptyMessage="No Accounts found"
		hasError={false}
		iconCategory="standard"
		iconName="account"
		label="Account"
	/>);
