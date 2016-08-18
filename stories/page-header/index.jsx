/* eslint-disable indent */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { PAGE_HEADER } from '../../utilities/constants';

import SLDSPageHeader from '../../components/page-header';
import SLDSButtonStateful from '../../components/button-stateful';
import SLDSButtonGroup from '../../components/button-group';
import SLDSButton from '../../components/button';
import SLDSMenuDropdown from '../../components/menu-dropdown';

const getPageHeader = props => (
	<SLDSPageHeader {...props} />
);

const recordHomeContentRight = (
	<div>
		<SLDSButtonStateful
			key="PageHeaderFollowButton"
			disabled={false}
			iconSize="medium"
			responsive={false}
			stateOne={{ iconName: 'add', label: 'Follow' }}
			stateTwo={{ iconName: 'check', label: 'Following' }}
			stateThree={{ iconName: 'close', label: 'Unfollow' }}
		/>
		<SLDSButtonGroup key="">
			<SLDSButton
				label="Edit"
			/>
			<SLDSButton
				label="Delete"
			/>
			<SLDSButton
				label="Clone"
			/>
			<SLDSMenuDropdown
				assistiveText="More Options"
				buttonVariant="icon"
				iconName="down"
				iconVariant="border-filled"
				onSelect={action('select')}
				openOn="click"
				align="right"
				options={[
					{ label: 'Disable', value: 'A0' },
					{ label: 'Promote', value: 'C0' }
				]}
			/>
		</SLDSButtonGroup>
	</div>
);

const recordHomeDetails = [
	{ label: 'Field 1', content: 'Description that demonstrates truncation with content.', flavor: '2-of-4', truncate: true },
	{ label: 'Field 2', content: 'Multiple Values' },
	{ label: 'Field 3', content: (<a href="#">Hyperlink</a>) },
	{ label: 'Field 4', content: 'Description (2-line truncation)' }
];


const objectHomeContentRight = (
	<div>
		<SLDSButton
			iconName="settings"
			variant="icon"
			iconVariant="more"
			className="slds-m-left--xx-small"
			assistiveText="Settings"
		/>
		<SLDSButton
			iconName="table"
			variant="icon"
			iconVariant="more"
			className="slds-m-left--xx-small"
			assistiveText="Table"
		/>
		<SLDSButtonGroup>
			<SLDSButton
				iconName="chart"
				variant="icon"
				iconVariant="border"
				assistiveText="Chart"
			/>
			<SLDSButton
				iconName="filterList"
				variant="icon"
				iconVariant="border"
				className="slds-m-left--xx-small"
				assistiveText="Filter List"
			/>
			<SLDSMenuDropdown
				assistiveText="Sort"
				buttonVariant="icon"
				iconName="sort"
				iconVariant="more"
				onSelect={action('select')}
				openOn="click"
				align="right"
				options={[
					{ label: 'Last Name (ascending)', value: 'LNA' },
					{ label: 'Last Name (descending)', value: 'LND' },
					{ label: 'Last Contacted (descending)', value: 'LCD' },
					{ label: 'Last Contacted (ascending)', value: 'LCA' }
				]}
			/>
		</SLDSButtonGroup>
	</div>
);

const objectHomeNavRight = (
	<SLDSButtonGroup>
		<SLDSButton
			label="New Lead"
			variant="neutral"
		/>
		<SLDSMenuDropdown
			assistiveText="More Options"
			buttonVariant="icon"
			iconName="down"
			iconVariant="border-filled"
			onSelect={action('select')}
			openOn="click"
			align="right"
			options={[
				{ label: 'Refresh List', value: 'A0' },
				{ label: 'Duplicate Selected Leads', value: 'B0' },
				{ label: 'Disabled Selected Leads', value: 'C0' }
			]}
		/>
	</SLDSButtonGroup>
);

const relatedListContentRight = (
	<div>
		<SLDSButton
			iconName="table"
			variant="icon"
			iconVariant="more"
			className="slds-m-left--xx-small"
			assistiveText="Table"
		/>
		<SLDSButtonGroup>
			<SLDSButton
				iconName="chart"
				variant="icon"
				iconVariant="border"
				className="slds-m-left--xx-small"
				assistiveText="Chart"
			/>
			<SLDSButton
				iconName="filterList"
				variant="icon"
				iconVariant="border"
				className="slds-m-left--xx-small"
				assistiveText="Filter List"
			/>
			<SLDSMenuDropdown
				assistiveText="Sort"
				buttonVariant="icon"
				iconName="sort"
				iconVariant="more"
				onSelect={action('select')}
				openOn="click"
				align="right"
				options={[
					{ label: 'Last Name (ascending)', value: 'LNA' },
					{ label: 'Last Name (descending)', value: 'LND' },
					{ label: 'Last Contacted (descending)', value: 'LCD' },
					{ label: 'Last Contacted (ascending)', value: 'LCA' }
				]}
			/>
		</SLDSButtonGroup>
	</div>
);

const relatedListNavRight = (
	<SLDSButtonGroup>
		<SLDSButton
			label="Add Contact"
			variant="neutral"
		/>
		<SLDSMenuDropdown
			assistiveText="More Options"
			buttonVariant="icon"
			iconName="down"
			iconVariant="border-filled"
			onSelect={action('select')}
			openOn="click"
			align="right"
			options={[
				{ label: 'Refresh List', value: 'A0' },
				{ label: 'Duplicate Selected Leads', value: 'B0' },
				{ label: 'Disabled Selected Leads', value: 'C0' }
			]}
		/>
	</SLDSButtonGroup>
);

const relatedListTrail = [
	(<a href="#">Accounts</a>),
	(<a href="#">Company One</a>)
];


storiesOf(PAGE_HEADER, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => getPageHeader({
		iconAssistiveText: 'Opportunity',
		iconCategory: 'standard',
		iconName: 'opportunity',
		title: 'Rohde Corp - 80,000 Widgets',
		info: 'Mark Jaeckal • Unlimited Customer • 11/13/15'
	}))
	.add('Record Home (truncates)', () => getPageHeader({
		iconAssistiveText: 'User',
		iconCategory: 'standard',
		iconName: 'user',
		label: 'Record Type',
		title: 'Record Title',
		variant: 'recordHome',
		contentRight: recordHomeContentRight,
		details: recordHomeDetails
	}))
	.add('Object Home', () => getPageHeader({
		label: 'Leads',
		title: 'My Leads',
		variant: 'objectHome',
		info: '10 items • sorted by name',
		contentRight: objectHomeContentRight,
		navRight: objectHomeNavRight
	}))
	.add('Related List', () => getPageHeader({
		title: 'Contacts',
		variant: 'objectHome',
		info: '10 items • sorted by name',
		contentRight: relatedListContentRight,
		navRight: relatedListNavRight,
		trail: relatedListTrail
	}))
;
