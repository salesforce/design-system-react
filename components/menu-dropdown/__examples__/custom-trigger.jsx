import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import Dropdown from '~/components/menu-dropdown'; // `~` is replaced with design-system-react at runtime
import DropdownTrigger from '~/components/menu-dropdown/button-trigger'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button/'; // `~` is replaced with design-system-react at runtime

const Example = createReactClass({
	displayName: 'DropdownExample',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<Dropdown
					tabIndex="-1"
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
							iconCategory="utility"
							iconName="down"
							iconPosition="right"
							label="Dropdown"
						/>
					</DropdownTrigger>
				</Dropdown>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
