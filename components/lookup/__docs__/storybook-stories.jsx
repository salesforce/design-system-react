import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../icon-settings';
import { LOOKUP } from '../../../utilities/constants';
import Lookup from '../../lookup';
import Header from '../../lookup/header';
import Footer from '../../lookup/footer';
import SLDSButton from '../../button';

import Default from '../__examples__/default';
import Files from '../__examples__/files';
import WithSelection from '../__examples__/with-selection';
import DeprecatedWarning from '../../utilities/deprecated-warning';

class DemoLookup extends React.Component {
	static displayName = 'DemoLookup';

	state = {
		options: [
			{
				label: 'File 1',
			},
			{
				label: 'File 2',
			},
			{
				label: 'File 3',
			},
			{
				label: 'File 4',
			},
		],
	};

	clearSelected = () => {
		this.setState({
			currentSelected: -1,
		});
	};

	handleSelect = (selectedItem, ...rest) => {
		action('select')(selectedItem, ...rest);
		this.setState({
			currentSelected: this.state.options.indexOf(selectedItem),
		});
	};

	render() {
		return (
			<div>
				<div>
					<SLDSButton onClick={this.clearSelected}>Clear Selected</SLDSButton>
				</div>
				<Lookup
					{...this.props}
					onChange={action('change')}
					onSelect={this.handleSelect}
					options={this.state.options}
					selectedItem={this.state.currentSelected}
					silenceDeprecationWarning
				/>
			</div>
		);
	}
}

class DemoLookupAccounts extends React.Component {
	static displayName = 'DemoLookupAccounts';

	state = {
		options: [
			{
				label: "Paddy's Pub",
				subTitle: 'Boston, MA',
			},
			{
				label: 'Tyrell Corp',
				subTitle: 'San Francisco, CA',
			},
			{
				label: 'Paper St. Soap Company',
				subTitle: 'Beloit, WI',
			},
			{
				label: 'Nakatomi Investments',
				subTitle: 'Chicago, IL',
			},
			{
				label: 'Acme Landscaping',
			},
			{
				label: 'Acme Construction',
				subTitle: 'Grand Marais, MN',
			},
		],
	};

	handleSelect = (selectedItem, ...rest) => {
		action('select')(selectedItem, ...rest);
		this.setState({
			selectedItem,
		});
	};

	render() {
		return (
			<Lookup
				{...this.props}
				footerRenderer={Footer}
				headerRenderer={Header}
				onChange={action('change')}
				onSelect={this.handleSelect}
				options={this.state.options}
				silenceDeprecationWarning
			/>
		);
	}
}
storiesOf(LOOKUP, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">
				{<DeprecatedWarning />}
				{getStory()}
			</IconSettings>
		</div>
	))
	.add('Standard', () => (
		<DemoLookup
			emptyMessage="No Files found"
			hasError={false}
			iconCategory="utility"
			iconName="open_folder"
			isInline
			label="Files"
		/>
	))
	.add('Disabled', () => <DemoLookup disabled />)
	.add('Standard with Accounts', () => (
		<DemoLookupAccounts
			emptyMessage="No Accounts found"
			hasError={false}
			iconCategory="standard"
			iconName="account"
			isInline
			label="Account"
		/>
	))
	.add('Custom Empty Message Content', () => (
		<DemoLookup emptyMessage={<span>No matches.</span>} isInline />
	))
	.add('Docs site Default', () => <Default />)
	.add('Docs site Files', () => <Files />)
	.add('Docs site WithSelection', () => <WithSelection />);
