import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import PageHeader from '~/components/page-header'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';
import ButtonGroup from '~/components/button-group';
import Dropdown from '~/components/menu-dropdown';
import DropdownTrigger from '~/components/menu-dropdown/button-trigger';

const Example = createReactClass({
	displayName: 'PageHeaderExample',

	render () {
		const navRight = (
			<div>
				<ButtonGroup>
					<Button label="New Lead" />
					<Button label="Import Leads" />
					<Dropdown
						align="right"
						assistiveText="More Options"
						iconName="down"
						iconVariant="border-filled"
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

		const contentRight = (
			<div>
				<Dropdown
					align="right"
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
							assistiveText="List View Controls"
							className="slds-m-right--xx-small"
							iconName="settings"
							iconVariant="more"
						/>
					</DropdownTrigger>
				</Dropdown>
				<Dropdown
					align="right"
					assistiveText="Change view"
					iconName="settings"
					iconVariant="more"
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
							assistiveText="Change view"
							className="slds-m-right--xx-small"
							iconName="table"
							iconVariant="more"
							variant="icon"
						/>
					</DropdownTrigger>
				</Dropdown>
				<Button
					assistiveText="Edit List"
					iconName="edit"
					iconVariant="border"
					variant="icon"
				/>
				<Button
					assistiveText="Refresh"
					iconName="refresh"
					iconVariant="border"
					variant="icon"
				/>
				<div>
					<ButtonGroup>
						<Button
							assistiveText="Charts"
							iconName="chart"
							iconVariant="border"
							variant="icon"
						/>
						<Button
							assistiveText="Filters"
							iconName="filterList"
							iconVariant="border"
							variant="icon"
						/>
					</ButtonGroup>
				</div>
			</div>
		);

		return (
			<IconSettings iconPath="/assets/icons">
				<PageHeader
					contentRight={contentRight}
					iconAssistiveText="User"
					iconCategory="standard"
					iconName="lead"
					info="10 items • sorted by name"
					label="Leads"
					navRight={navRight}
					title={
						<h1 className="slds-page-header__title slds-p-right--x-small">
							<Dropdown
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
										className="slds-button--reset slds-type-focus"
										iconName="down"
										iconPosition="right"
										label="Dropdown"
										responsive
										variant="base"
									/>
								</DropdownTrigger>
							</Dropdown>
						</h1>
					}
					truncate
					variant="objectHome"
				/>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
