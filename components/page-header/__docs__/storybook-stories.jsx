/* eslint-disable indent, jsx-a11y/no-noninteractive-tabindex */ import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { PAGE_HEADER } from '../../../utilities/constants';
import IconSettings from '../../icon-settings';
import SLDSPageHeader from '../../page-header';
import SLDSButtonStateful from '../../button-stateful';
import SLDSButtonGroup from '../../button-group';
import SLDSButton from '../../button';
import SLDSMenuDropdown from '../../menu-dropdown';
import Tooltip from '../../tooltip';
import ObjectHome from '../__examples__/object-home';
import RecordHome from '../__examples__/record-home';
import RelatedList from '../__examples__/related-list';

const recordHomeDetails1 = [
	{
		label: 'Field 1',
		content:
			'Description that demonstrates truncation with content. Description that demonstrates truncation with content.',
		flavor: '1-of-4',
		truncate: true,
	},
	{
		label: 'Field 2',
		content: 'Multiple Values',
	},
	{
		label: 'Field 3',
		content: 'Description (2-line truncation)',
	},
];

const recordHomeDetails2 = [
	{
		label: 'Field 1',
		content: 'hi',
		flavor: '1-of-4',
		truncate: true,
	},
	{
		label: 'Field 2',
		content: 'Multiple Values',
	},
	{
		label: 'Field 3',
		content: 'Description (2-line truncation)',
	},
];

class DemoPageHeader extends React.Component {
	static displayName = 'DemoPageHeader';
	state = {
		recordHomeDetails: recordHomeDetails2,
	};
	changeDescription = () => {
		if (this.state.recordHomeDetails[0].content === 'hi') {
			this.setState({
				recordHomeDetails: recordHomeDetails1,
			});
		} else {
			this.setState({
				recordHomeDetails: recordHomeDetails2,
			});
		}
	};
	handleSelect = (selectedItem, ...rest) => {
		action('select')(selectedItem, ...rest);
		this.setState({
			currentSelected: this.state.options.indexOf(selectedItem),
		});
	};

	render() {
		const defaultProps = {
			iconAssistiveText: 'User',
			iconCategory: 'standard',
			iconName: 'user',
			label: 'Record Type',
			title: 'Record Title',
			variant: 'record-home',
			details: this.state.recordHomeDetails,
		};
		return (
			<div>
				<SLDSButton onClick={this.changeDescription}>
					Change Description
				</SLDSButton>
				<SLDSPageHeader {...defaultProps} />
			</div>
		);
	}
}

const getPageHeader = (props) => <SLDSPageHeader {...props} />;

const recordHomeActions = () => (
	<div>
		<SLDSButtonStateful
			key="PageHeaderFollowButton"
			disabled={false}
			iconSize="medium"
			responsive={false}
			stateOne={{
				iconName: 'add',
				label: 'Follow',
			}}
			stateTwo={{
				iconCategory: 'utility',
				iconName: 'check',
				label: 'Following',
			}}
			stateThree={{
				iconCategory: 'utility',
				iconName: 'close',
				label: 'Unfollow',
			}}
		/>
		<SLDSButtonGroup key="">
			<SLDSButton label="Edit" />
			<SLDSButton label="Delete" />
			<SLDSButton label="Clone" />
			<SLDSMenuDropdown
				assistiveText={{
					icon: 'More Options',
				}}
				buttonVariant="icon"
				iconCategory="utility"
				iconName="down"
				iconVariant="border-filled"
				id="page-header-dropdown-record-home-content-right"
				onSelect={action('select')}
				openOn="click"
				align="right"
				options={[
					{
						label: 'Disable',
						value: 'A0',
					},
					{
						label: 'Promote',
						value: 'C0',
					},
				]}
			/>
		</SLDSButtonGroup>
	</div>
);

const customTooltip = () => {
	const content =
		'here is a super long description that will truncate and the rest of it will show in the tooltip.';
	return (
		<Tooltip
			align="top"
			content={content}
			id="page-header-truncate-tooltip"
			triggerStyle={{
				display: 'inline',
			}}
		>
			<p tabIndex="0" className="slds-truncate">
				{content}
			</p>
		</Tooltip>
	);
};

const recordHomeDetails = [
	{
		label: 'Field 1',
		content:
			'Description that demonstrates truncation with content. Description that demonstrates truncation with content.',
		flavor: '1-of-4',
		truncate: true,
	},
	{
		label: 'Field 2',
		content: 'Multiple Values',
	},
	{
		label: 'Field 3',
		content: customTooltip(),
		flavor: '1-of-4',
	},
	{
		label: 'Field 4',
		content: 'Description (2-line truncation)',
	},
];
const objectHomeActions = () => (
	<div>
		<SLDSButton
			iconCategory="utility"
			iconName="settings"
			variant="icon"
			iconVariant="more"
			className="slds-m-left_xx-small"
			assistiveText={{
				icon: 'Settings',
			}}
		/>
		<SLDSButton
			iconCategory="utility"
			iconName="table"
			variant="icon"
			iconVariant="more"
			className="slds-m-left_xx-small"
			assistiveText={{
				icon: 'Table',
			}}
		/>
		<SLDSButtonGroup>
			<SLDSButton
				iconCategory="utility"
				iconName="chart"
				variant="icon"
				iconVariant="border"
				assistiveText={{
					icon: 'Chart',
				}}
			/>
			<SLDSButton
				iconCategory="utility"
				iconName="filterList"
				variant="icon"
				iconVariant="border"
				className="slds-m-left_xx-small"
				assistiveText={{
					icon: 'Filter List',
				}}
			/>
			<SLDSMenuDropdown
				assistiveText={{
					icon: 'Sort',
				}}
				buttonVariant="icon"
				iconCategory="utility"
				iconName="sort"
				iconVariant="more"
				id="page-header-dropdown-object-home-content-right"
				onSelect={action('select')}
				openOn="click"
				align="right"
				options={[
					{
						label: 'Last Name (ascending)',
						value: 'LNA',
					},
					{
						label: 'Last Name (descending)',
						value: 'LND',
					},
					{
						label: 'Last Contacted (descending)',
						value: 'LCD',
					},
					{
						label: 'Last Contacted (ascending)',
						value: 'LCA',
					},
				]}
			/>
		</SLDSButtonGroup>
	</div>
);
const relatedListActions = () => (
	<div>
		<SLDSButton
			iconCategory="utility"
			iconName="table"
			variant="icon"
			iconVariant="more"
			className="slds-m-left_xx-small"
			assistiveText={{
				icon: 'Table',
			}}
		/>
		<SLDSButtonGroup>
			<SLDSButton
				iconCategory="utility"
				iconName="chart"
				variant="icon"
				iconVariant="border"
				className="slds-m-left_xx-small"
				assistiveText={{
					icon: 'Chart',
				}}
			/>
			<SLDSButton
				iconCategory="utility"
				iconName="filterList"
				variant="icon"
				iconVariant="border"
				className="slds-m-left_xx-small"
				assistiveText={{
					icon: 'Filter List',
				}}
			/>
			<SLDSMenuDropdown
				assistiveText={{
					icon: 'Sort',
				}}
				buttonVariant="icon"
				iconCategory="utility"
				iconName="sort"
				iconVariant="more"
				id="page-header-dropdown-related-list-content-right"
				onSelect={action('select')}
				openOn="click"
				align="right"
				options={[
					{
						label: 'Last Name (ascending)',
						value: 'LNA',
					},
					{
						label: 'Last Name (descending)',
						value: 'LND',
					},
					{
						label: 'Last Contacted (descending)',
						value: 'LCD',
					},
					{
						label: 'Last Contacted (ascending)',
						value: 'LCA',
					},
				]}
			/>
		</SLDSButtonGroup>
	</div>
);
const relatedListControls = () => (
	<SLDSButtonGroup>
		<SLDSButton label="Add Contact" variant="neutral" />
		<SLDSMenuDropdown
			assistiveText={{
				icon: 'More Options',
			}}
			buttonVariant="icon"
			iconCategory="utility"
			iconName="down"
			iconVariant="border-filled"
			id="page-header-dropdown-related-list-nav-right"
			onSelect={action('select')}
			openOn="click"
			align="right"
			options={[
				{
					label: 'Refresh List',
					value: 'A0',
				},
				{
					label: 'Duplicate Selected Leads',
					value: 'B0',
				},
				{
					label: 'Disabled Selected Leads',
					value: 'C0',
				},
			]}
		/>
	</SLDSButtonGroup>
);
const relatedListTrail = [
	<a href="javascript:void(0);">Accounts</a>,
	<a href="javascript:void(0);">Company One</a>,
];
storiesOf(PAGE_HEADER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () =>
		getPageHeader({
			iconAssistiveText: 'Opportunity',
			iconCategory: 'standard',
			iconName: 'opportunity',
			title: 'Rohde Corp - 80,000 Widgets',
			info: 'Mark Jaeckal • Unlimited Customer • 11/13/15',
		})
	)
	.add('Base with actions', () =>
		getPageHeader({
			iconAssistiveText: 'Opportunity',
			iconCategory: 'standard',
			iconName: 'opportunity',
			title: 'Rohde Corp - 80,000 Widgets',
			info: 'Mark Jaeckal • Unlimited Customer • 11/13/15',
			onRenderControls: objectHomeActions,
		})
	)
	.add('Record Home (truncates)', () =>
		getPageHeader({
			iconAssistiveText: 'User',
			iconCategory: 'standard',
			iconName: 'user',
			label: 'Record Type',
			title: 'Record Title',
			variant: 'record-home',
			onRenderActions: recordHomeActions,
			details: recordHomeDetails,
		})
	)
	.add('Object Home', () => <ObjectHome />)
	.add('Related List', () =>
		getPageHeader({
			title: 'Contacts',
			variant: 'object-home',
			info: '10 items • sorted by name',
			onRenderActions: relatedListActions,
			onRenderControls: relatedListControls,
			trail: relatedListTrail,
		})
	)
	.add('Record Home (field updates)', () => <DemoPageHeader />)
	.add('Docs site RecordHome', () => <RecordHome />)
	.add('Docs site RelatedList', () => <RelatedList />);
