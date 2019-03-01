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
		const navRight = (
			<div className="slds-button-group" role="group">
				<button className="slds-button slds-button_neutral">Add Contact</button>
				<div className="slds-button_last">
					<Button
						iconCategory="utility"
						iconName="down"
						variant="icon"
						iconVariant="border-filled"
						assistiveText={{ icon: 'More Actions' }}
					/>
				</div>
			</div>
		);

		const contentRight = (
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
