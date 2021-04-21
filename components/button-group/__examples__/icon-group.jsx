import React from 'react';

import ButtonGroup from '~/components/button-group';
import ButtonStateful from '~/components/button-stateful';
import Dropdown from '~/components/menu-dropdown';
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	static displayName = 'ButtonGroupExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<ButtonGroup id="button-group-icon-group-1">
					<ButtonStateful
						assistiveText={{ icon: 'Show Chart' }}
						buttonVariant="icon"
						iconName="chart"
						iconVariant="border"
						variant="icon"
					/>
					<ButtonStateful
						assistiveText={{ icon: 'Filter List' }}
						iconName="filterList"
						iconVariant="border"
						variant="icon"
					/>
					<Dropdown
						assistiveText={{ icon: 'Settings' }}
						checkmark
						iconCategory="utility"
						iconName="settings"
						iconVariant="more"
						id="icon-dropdown-example-1"
						onSelect={(item) => {
							console.log(item.label, 'selected');
						}}
						openOn="click"
						options={[
							{ label: 'Bring left panel to front', value: 'A0' },
							{ label: 'Bring right panel to front', value: 'B0' },
						]}
						value="A0"
						variant="icon"
					/>
				</ButtonGroup>
				<br />
				<br />
				<ButtonGroup
					id="button-group-icon-group-2"
					labels={{ label: 'Actions' }}
				>
					<ButtonStateful
						assistiveText={{ icon: 'Show Chart' }}
						buttonVariant="icon"
						iconName="chart"
						iconVariant="border"
						variant="icon"
					/>
					<ButtonStateful
						assistiveText={{ icon: 'Filter List' }}
						iconName="filterList"
						iconVariant="border"
						variant="icon"
					/>
					<Dropdown
						assistiveText={{ icon: 'Settings' }}
						checkmark
						iconCategory="utility"
						iconName="settings"
						iconVariant="more"
						id="icon-dropdown-example-2"
						onSelect={(item) => {
							console.log(item.label, 'selected');
						}}
						openOn="click"
						options={[
							{ label: 'Bring left panel to front', value: 'A0' },
							{ label: 'Bring right panel to front', value: 'B0' },
						]}
						value="A0"
						variant="icon"
					/>
				</ButtonGroup>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
