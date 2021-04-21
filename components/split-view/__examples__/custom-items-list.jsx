import React from 'react';
import PropTypes from 'prop-types';

import Button from '~/components/button';
import Dropdown from '~/components/menu-dropdown';
import DropdownTrigger from '~/components/menu-dropdown/button-trigger';
import Icon from '~/components/icon';
import IconSettings from '~/components/icon-settings';
import PageHeaderControl from '~/components/page-header/control';
import SplitView from '~/components/split-view/index';
import SplitViewHeader from '~/components/split-view/header';
import SplitViewListbox from '~/components/split-view/listbox';

const SORT_OPTIONS = {
	UP: 'up',
	DOWN: 'down',
};

const listOptions = [
	{
		id: '001',
		name: 'Riley Shultz',
		ranking: '99',
		company: 'Biotech, Inc.',
		status: 'Nurturing',
	},
	{
		id: '002',
		name: 'Jason A. - VP of Sales',
		ranking: '92',
		company: 'Case Management Solutions',
		status: 'Contacted',
	},
	{
		id: '003',
		name: 'Josh Smith',
		ranking: '90',
		company: 'Acme, Inc.',
		status: 'Contacted',
	},
	{
		id: '004',
		name: 'Bobby Tree',
		ranking: '89',
		company: 'Salesforce, Inc.',
		status: 'Closing',
	},
	{
		id: '005',
		name: 'Riley Shultz',
		ranking: '74',
		company: 'Tesla',
		status: 'Contacted',
	},
];

const headerActions = () => (
	<PageHeaderControl>
		<Dropdown
			id="header-nav-right-more"
			align="right"
			assistiveText={{ icon: 'More Options' }}
			iconCategory="utility"
			iconName="down"
			iconVariant="border-filled"
			options={[
				{ label: 'Menu Item One', value: 'A0' },
				{ label: 'Menu Item Two', value: 'B0' },
			]}
		/>
	</PageHeaderControl>
);

const headerControls = () => (
	<React.Fragment>
		<PageHeaderControl>
			<Dropdown
				id="header-right-refresh"
				assistiveText={{ icon: 'Checkmark with right icon' }}
				buttonVariant="icon"
				checkmark
				iconCategory="utility"
				iconName="side_list"
				iconSize="large"
				iconVariant="more"
				align="right"
				onSelect={(value) => {
					console.log('selected: ', value);
				}}
				options={[
					{ label: 'Display As', type: 'header' },
					{
						label: 'Table View',
						value: 'A0',
						rightIcon: {
							category: 'utility',
							name: 'table',
						},
					},
					{
						label: 'List View',
						value: 'B0',
						rightIcon: {
							category: 'utility',
							name: 'side_list',
						},
					},
				]}
				value="B0"
			/>
		</PageHeaderControl>
		<PageHeaderControl>
			<Button
				assistiveText={{ icon: 'Refresh' }}
				iconCategory="utility"
				iconName="refresh"
				iconVariant="border"
				variant="icon"
			/>
		</PageHeaderControl>
	</React.Fragment>
);

const headerTitle = (
	<div className="slds-media__body">
		<h1 className="slds-text-heading_small slds-text-color_default slds-p-right_x-small">
			<Dropdown
				id="header-title-leads"
				options={[
					{ label: 'Menu Item One', value: 'A0' },
					{ label: 'Menu Item Two', value: 'B0' },
					{ label: 'Menu Item Three', value: 'C0' },
					{ type: 'divider' },
					{ label: 'Menu Item Four', value: 'D0' },
				]}
			>
				<DropdownTrigger>
					<Button
						className="slds-button_reset slds-type-focus"
						iconCategory="utility"
						iconName="down"
						iconPosition="right"
						label="My Leads"
						responsive
						variant="base"
					/>
				</DropdownTrigger>
			</Dropdown>
		</h1>
	</div>
);

/**
 * Custom list item
 * @param props
 */
const CustomListItem = (props) => (
	<div>
		<Icon
			category="action"
			name={props.item.status === 'Contacted' ? 'check' : 'call'}
			size="x-small"
		/>
		<span className="slds-text-heading_small slds-m-left_medium">
			{props.item.name}
		</span>
	</div>
);

CustomListItem.propsTypes = {
	item: PropTypes.shape({
		status: PropTypes.string,
		name: PropTypes.string,
	}),
};

CustomListItem.displayName = 'CustomListItem';

class Example extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			options: listOptions,
			selected: [listOptions[listOptions.length - 2]],
			unread: [listOptions[0], listOptions[2]],
			sortDirection: SORT_OPTIONS.DOWN,
		};

		this.sortList = this.sortList.bind(this);
	}

	sortList() {
		const sortDirection =
			this.state.sortDirection === SORT_OPTIONS.DOWN
				? SORT_OPTIONS.UP
				: SORT_OPTIONS.DOWN;

		this.setState({
			options: this.state.options.sort((a, b) =>
				sortDirection === SORT_OPTIONS.DOWN ? a.name > b.name : b.name > a.name
			),
			sortDirection,
		});
	}

	// For multiple elements you need to pass an array in order for the scrolling to in the SplitViewList to work.
	// React also requires a key prop on each items [React Lists and Keys](https://reactjs.org/docs/lists-and-keys.html#keys).
	masterView() {
		return [
			<SplitViewHeader
				key="1"
				onRenderActions={headerActions}
				onRenderControls={headerControls}
				icon={
					<Icon
						assistiveText={{ label: 'User' }}
						category="standard"
						name="lead"
					/>
				}
				info="42 items • Updated just now"
				title={headerTitle}
				truncate
				variant="object-home"
			/>,
			<SplitViewListbox
				key="2"
				labels={{
					header: 'Lead Score',
				}}
				sortDirection={this.state.sortDirection}
				options={this.state.options}
				events={{
					onSort: this.sortList,
					onSelect: (event, { selectedItems, item }) => {
						this.setState({
							unread: this.state.unread.filter((i) => i !== item),
							selected: selectedItems,
						});
					},
				}}
				selection={this.state.selected}
				unread={this.state.unread}
				listItem={CustomListItem}
			/>,
		];
	}

	detailView() {
		return this.state.selected.length ? (
			this.state.selected.map((item) => (
				<dl
					key={item.id}
					className="slds-box slds-m-left_medium slds-m-bottom_medium slds-list_horizontal slds-wrap"
				>
					<dt
						className="slds-item_label slds-text-color_weak slds-truncate"
						title="Name"
					>
						Name:
					</dt>
					<dd className="slds-item_detail slds-truncate" title={item.name}>
						{item.name}
					</dd>
					<dt
						className="slds-item_label slds-text-color_weak slds-truncate"
						title="Value"
					>
						Value:
					</dt>
					<dd className="slds-item_detail slds-truncate" title={item.ranking}>
						{item.ranking}
					</dd>
					<dt
						className="slds-item_label slds-text-color_weak slds-truncate"
						title="Company"
					>
						Company:
					</dt>
					<dd className="slds-item_detail slds-truncate" title={item.company}>
						{item.company}
					</dd>
					<dt
						className="slds-item_label slds-text-color_weak slds-truncate"
						title="Status"
					>
						Status:
					</dt>
					<dd className="slds-item_detail slds-truncate" title={item.status}>
						{item.status}
					</dd>
				</dl>
			))
		) : (
			<div />
		);
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div style={{ height: '90vh' }}>
					<SplitView
						id="custom-example"
						master={this.masterView()}
						detail={this.detailView()}
					/>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'SplitViewCustomListItem';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
