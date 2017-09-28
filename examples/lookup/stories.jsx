import React from 'react';
import createReactClass from 'create-react-class';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../components/iconSettings';

import { LOOKUP } from '../../utilities/constants';
import Lookup from '../../components/lookup';
import Header from '../../components/lookup/header';
import Footer from '../../components/lookup/footer';

import SLDSButton from '../../components/button';

const DemoLookup = createReactClass({
	displayName: 'DemoLookup',

	getInitialState () {
		return {
			options: [
				{ label: 'File 1' },
				{ label: 'File 2' },
				{ label: 'File 3' },
				{ label: 'File 4' }
			]
		};
	},

	clearSelected () {
		this.setState({ currentSelected: -1 });
	},

	render () {
		return (
			<div>
				<div><SLDSButton onClick={this.clearSelected}>Clear Selected</SLDSButton></div>
				<Lookup
					{...this.props}
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

const DemoLookupAccounts = createReactClass({
	displayName: 'DemoLookupAccounts',

	getInitialState () {
		return {
			options: [
				{ label: 'Paddy\'s Pub', subTitle: 'Boston, MA' },
				{ label: 'Tyrell Corp', subTitle: 'San Francisco, CA' },
				{ label: 'Paper St. Soap Company', subTitle: 'Beloit, WI' },
				{ label: 'Nakatomi Investments', subTitle: 'Chicago, IL' },
				{ label: 'Acme Landscaping' },
				{ label: 'Acme Construction', subTitle: 'Grand Marais, MN' }
			]
		};
	},

	render () {
		return (
			<Lookup
				{...this.props}
				footerRenderer={DefaultFooter}
				headerRenderer={DefaultHeader}
				onChange={action('change')}
				onSelect={this.handleSelect}
				options={this.state.options}
			/>
		);
	},

	handleSelect (selectedItem, ...rest) {
		action('select')(selectedItem, ...rest);
		this.setState({ selectedItem });
	}
});

storiesOf(LOOKUP, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium"><IconSettings iconPath="/assets/icons">{getStory()}</IconSettings></div>)
	.add('Standard', () => (<DemoLookup
		emptyMessage="No Files found"
		hasError={false}
		iconCategory="utility"
		iconName="open_folder"
		isInline
		label="Files"
	/>))
	.add('Disabled', () => (<DemoLookup
		disabled
	/>))
	.add('Standard with Accounts', () => (<DemoLookupAccounts
		emptyMessage="No Accounts found"
		hasError={false}
		iconCategory="standard"
		iconName="account"
		isInline
		label="Account"
	/>))
	.add('Custom Empty Message Content', () => (<DemoLookup
		emptyMessage={<span>No matches.</span>}
		isInline
	/>));
