import React from 'react';

import Button from '~/components/button';
import ButtonGroup from '~/components/button-group';
import Dropdown from '~/components/menu-dropdown';
import DropdownTrigger from '~/components/menu-dropdown/button-trigger';
import Icon from '~/components/icon';
import IconSettings from '~/components/icon-settings';
import PageHeader from '~/components/page-header';
import PageHeaderControl from '~/components/page-header/control';

class Example extends React.Component {
	static displayName = 'ObjectHomePageHeaderExample';

	render() {
		const actions = () => (
			<PageHeaderControl>
				<ButtonGroup variant="list" id="button-group-page-header-actions">
					<Button label="New" />
					<Dropdown
						align="right"
						assistiveText={{ icon: 'More Options' }}
						iconCategory="utility"
						iconName="down"
						iconVariant="border-filled"
						id="page-header-dropdown-object-home-nav-right"
						options={[
							{ label: 'Menu Item One', value: 'A0' },
							{ label: 'Menu Item Two', value: 'B0' },
							{ label: 'Menu Item Three', value: 'C0' },
							{ type: 'divider' },
							{ label: 'Menu Item Four', value: 'D0' },
						]}
					/>
				</ButtonGroup>
			</PageHeaderControl>
		);

		const controls = () => (
			<React.Fragment>
				<PageHeaderControl>
					<Dropdown
						align="right"
						id="page-header-dropdown-object-home-content-right"
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
								assistiveText={{ icon: 'List View Controls' }}
								iconCategory="utility"
								iconName="settings"
								iconVariant="more"
							/>
						</DropdownTrigger>
					</Dropdown>
				</PageHeaderControl>
				<PageHeaderControl>
					<Dropdown
						align="right"
						assistiveText={{ icon: 'Change view' }}
						iconCategory="utility"
						iconName="settings"
						iconVariant="more"
						id="page-header-dropdown-object-home-content-right-2"
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
								iconCategory="utility"
								iconName="table"
								iconVariant="more"
								variant="icon"
							/>
						</DropdownTrigger>
					</Dropdown>
				</PageHeaderControl>
				<PageHeaderControl>
					<Button
						assistiveText={{ icon: 'Edit List' }}
						iconCategory="utility"
						iconName="edit"
						iconVariant="border-filled"
						variant="icon"
					/>
				</PageHeaderControl>
				<PageHeaderControl>
					<Button
						assistiveText={{ icon: 'Refresh' }}
						iconCategory="utility"
						iconName="refresh"
						iconVariant="border-filled"
						variant="icon"
					/>
				</PageHeaderControl>
				<PageHeaderControl>
					<ButtonGroup variant="list" id="button-group-page-header-controls">
						<Button
							assistiveText={{ icon: 'Charts' }}
							iconCategory="utility"
							iconName="chart"
							iconVariant="border-filled"
							variant="icon"
						/>
						<Button
							assistiveText={{ icon: 'Filters' }}
							iconCategory="utility"
							iconName="filterList"
							iconVariant="border-filled"
							variant="icon"
						/>
					</ButtonGroup>
				</PageHeaderControl>
			</React.Fragment>
		);

		return (
			<IconSettings iconPath="/assets/icons">
				<PageHeader
					icon={
						<Icon
							assistiveText={{ label: 'Opportunity' }}
							category="standard"
							name="opportunity"
						/>
					}
					info="10 items • Updated 13 minutes ago"
					label="Opportunities"
					nameSwitcherDropdown={
						<Dropdown
							assistiveText={{ icon: 'Name Switcher' }}
							buttonClassName="slds-button_icon-small"
							buttonVariant="icon"
							iconCategory="utility"
							iconName="down"
							id="page-header-name-switcher-dropdown"
							options={[
								{ label: 'Menu Item One', value: 'A0' },
								{ label: 'Menu Item Two', value: 'B0' },
								{ label: 'Menu Item Three', value: 'C0' },
								{ label: 'Menu Item Four', value: 'D0' },
							]}
						/>
					}
					onRenderActions={actions}
					onRenderControls={controls}
					title="Recently Viewed"
					truncate
					variant="object-home"
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
