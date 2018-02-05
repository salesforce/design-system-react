import React from 'react';
import IconSettings from '~/components/icon-settings';
import PageHeader from '~/components/page-header'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';
import ButtonGroup from '~/components/button-group';
import Dropdown from '~/components/dropdown';
import DropdownTrigger from '~/components/menu-dropdown/button-trigger';

class Example extends React.Component {
	static displayName = 'PageHeaderExample';

	render () {
		const navRight = (
			<div className="slds-button-group" role="group">
				<button className="slds-button slds-button--neutral">
					Add Contact
				</button>
				<div className="slds-button--last">
					<Button
						iconName="down"
						variant="icon"
						iconVariant="border-filled"
						assistiveText="More Actions"
					/>
				</div>
			</div>
		);

		const contentRight = (
			<div>
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
				<ButtonGroup>
					<Button
						iconName="chart"
						variant="icon"
						iconVariant="border"
						className="slds-m-left--xx-small"
						assistiveText="Chart"
					/>
					<Button
						iconName="filterList"
						variant="icon"
						iconVariant="border"
						className="slds-m-left--xx-small"
						assistiveText="Filter List"
					/>
					<Dropdown
						triggerClassname
						align="right"
						assistiveText="List View Controls"
						iconName="sort"
						iconVariant="more"
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
					title="Contacts (will truncate)"
					navRight={navRight}
					contentRight={contentRight}
					variant="objectHome"
					truncate
					trail={trail}
					info="10 items • sorted by name"
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
