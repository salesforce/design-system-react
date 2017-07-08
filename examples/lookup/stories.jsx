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
			<Lookup
				{...this.props}
				footerRenderer={Lookup.DefaultFooter}
				onChange={action('change')}
				onSelect={this.handleSelect}
				options={this.state.options}
			/>
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

	selectFile2 () {
		this.setState({ selectedItem: 1 });
		this.handleSelect(this.state.options[1]);
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
				<SLDSButton onClick={this.selectFile2}>Select File 2</SLDSButton>
				<Lookup
					{...this.props}
					onChange={action('change')}
					onSelect={this.handleSelect}
					options={this.state.options}
					selectedItem={this.state.selectedItem}
				/>
			</div>
		);
	},

	handleSelect (selectedItem, ...rest) {
		action('select')(selectedItem, ...rest);
	}
});

const DemoLookupMultipleSelected = React.createClass({
	displayName: 'DemoLookupAccounts',

	clearSelected () {
		this.setState({ selectedItems: [] });
	},

	select2and3 () {
		this.setState({ selectedItems: [2, 3] });
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
				<SLDSButton onClick={this.select2and3}>Select index 2 and 3</SLDSButton>
				<Lookup
					{...this.props}
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
		action('select')(selectedItem, ...rest);
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
	.add('Base > Single Select (preselected item & no icon)', () => <DemoLookupSingleSelected
		emptyMessage="No Files found"
		hasError={false}
		isInline
		label="Files"
	/>)
	.add('Base > multiselect', () => <DemoLookup
		emptyMessage="No Acounts found"
		hasError={false}
		iconCategory="standard"
		iconName="account"
		isInline
		labels={{
			label: 'Accounts'
		}}
		multiple
	/>)
	.add('Base > multiselect (preselected items & no icon)', () => <DemoLookupMultipleSelected
		emptyMessage="No Files found"
		hasError={false}
		isInline
		label="Files"
		placeholder="Search files"
		multiple
	/>)
	.add('Disabled', () => <DemoLookup
		disabled
	/>);
