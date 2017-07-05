import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { LOOKUP } from '../../utilities/constants';
import Lookup from '../../components/lookup';
import SLDSButton from '../../components/button';

const DemoLookup = React.createClass({
	displayName: 'DemoLookup',

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
			<div>
				<Lookup
					{...this.props}
					onChange={action('change')}
					onSelect={this.handleSelect}
					options={this.state.options}
				/>
			</div>
		);
	},

	handleSelect (selectedItem, ...rest) {
		action('select')(selectedItem, ...rest);
		this.setState({ currentSelected: this.state.options.indexOf(selectedItem) });
	}
});

const DemoLookupSingleSelected = React.createClass({
	clearSelected () {
		this.setState({ selectedItem: -1 });
	},

	getInitialState () {
		return {
			selectedItem: 0,
			options: [
				{ label: 'File 1' },
				{ label: 'File 2' },
				{ label: 'File 3' },
				{ label: 'File 4' }
			]
		};
	},

	render () {
		return (
			<div>
				<SLDSButton onClick={this.clearSelected}>Clear Selected</SLDSButton>
				<Lookup
					{...this.props}
					onChange={action('change')}
					onSelect={this.handleSelect}
					options={this.state.options}
					selectedItem={this.state.selectedItem}
				/>
			</div>
		);
	}

});

const DemoLookupMultipleSelected = React.createClass({
	displayName: 'DemoLookupAccounts',

	clearSelected () {
		this.setState({ selectedItems: [] });
	},

	getInitialState () {
		return {
			selectedItems: [0, 1],
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
			<div>
				<SLDSButton onClick={this.clearSelected}>Clear Selected</SLDSButton>
				<Lookup
					{...this.props}
					footerRenderer={Lookup.DefaultFooter}
					headerRenderer={Lookup.DefaultHeader}
					onChange={action('change')}
					onSelect={this.handleSelect}
					options={this.state.options}
					multiple
					selectedItems={this.state.selectedItems}
				/>
			</div>
		);
	},

	handleSelect (selectedItem, ...rest) {
		action('select')(selectedItems, ...rest);
		this.setState({ selectedItems });
	}
});

storiesOf(LOOKUP, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base > singleselect', () => <DemoLookup
		emptyMessage="No accounts found"
		hasError={false}
		iconCategory="standard"
		iconName="account"
		isInline
		label="Accounts"
	/>)
	.add('Base > Single Select (preselected item)', () => <DemoLookupSingleSelected
		emptyMessage="No Files found"
		hasError={false}
		iconCategory="utility"
		iconName="open_folder"
		isInline
		label="Files"
	/>)
	.add('Base > multiselect', () => <DemoLookup
		emptyMessage="No Acounts found"
		hasError={false}
		iconCategory="standard"
		iconName="account"
		isInline
		label="Accounts"
		multiple
	/>)
	.add('Base > multiselect (preselected items)', () => <DemoLookupMultipleSelected
		emptyMessage="No Files found"
		hasError={false}
		iconCategory="utility"
		iconName="open_folder"
		isInline
		label="Files"
		placeholder="Search files"
		multiple
	/>)
	.add('Disabled', () => <DemoLookup
		disabled
	/>);
