import React from 'react';

import IconSettings from '~/components/icon-settings';
import PageHeader from '~/components/page-header'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';
import ButtonGroup from '~/components/button-group';
import Dropdown from '~/components/menu-dropdown';
import DropdownTrigger from '~/components/menu-dropdown/button-trigger';

class Example extends React.Component {
	static displayName = 'RelatedListPageHeaderExample';

	render() {
		const actions = () => (
			<div>
				<ButtonGroup>
					<Button label="Add Contact" variant="neutral" />
					<Dropdown
						assistiveText={{
							icon: 'More Options',
						}}
						buttonVariant="icon"
						iconCategory="utility"
						iconName="down"
						iconVariant="border-filled"
						id="page-header-related-list-add-contact-dropdown"
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
				</ButtonGroup>
			</div>
		);

		const controls = () => (
			<div>
				<Dropdown
					align="right"
					assistiveText={{ icon: 'Change view' }}
					iconCategory="utility"
					iconName="settings"
					iconVariant="more"
					id="content-right-dropdown"
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
							assistiveText={{ icon: 'Change view' }}
							className="slds-m-right_xx-small"
							iconCategory="utility"
							iconName="table"
							iconVariant="more"
							variant="icon"
						/>
					</DropdownTrigger>
				</Dropdown>
				<ButtonGroup>
					<Button
						iconCategory="utility"
						iconName="chart"
						variant="icon"
						iconVariant="border"
						className="slds-m-left_xx-small"
						assistiveText={{ icon: 'Chart' }}
					/>
					<Button
						iconCategory="utility"
						iconName="filterList"
						variant="icon"
						iconVariant="border"
						className="slds-m-left_xx-small"
						assistiveText={{ icon: 'Filter List' }}
					/>
					<Dropdown
						triggerClassname
						align="right"
						assistiveText={{ icon: 'List View Controls' }}
						iconCategory="utility"
						iconName="sort"
						iconVariant="more"
						id="content-right-dropdown-2"
						options={[
							{ label: 'Menu Item One', value: 'A0' },
							{ label: 'Menu Item Two', value: 'B0' },
							{ label: 'Menu Item Three', value: 'C0' },
							{ type: 'divider' },
							{ label: 'Menu Item Four', value: 'D0' },
						]}
					/>
				</ButtonGroup>
			</div>
		);

		const trail = [
			<a href="javascript:void(0);">Accounts</a>,
			<a href="javascript:void(0);">Company One</a>,
		];

		return (
			<IconSettings iconPath="/assets/icons">
				<PageHeader
					info="10 items • sorted by name"
					onRenderActions={actions}
					onRenderControls={controls}
					title="Contacts (will truncate)"
					trail={trail}
					truncate
					variant="related-list"
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
