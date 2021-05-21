import React from 'react';

import IconSettings from '~/components/icon-settings';
import Dropdown from '~/components/menu-dropdown'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'DropdownExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Dropdown
					align="right"
					iconCategory="utility"
					iconName="down"
					iconPosition="right"
					label="Dropdown"
					options={[
						{ label: 'Menu Item One', value: 'A0' },
						{ label: 'Menu Item Two', value: 'B0' },
						{ label: 'Menu Item Three', value: 'C0' },
						{ type: 'divider' },
						{ label: 'Menu Item Four', value: 'D0' },
						{ label: 'Menu Item Five', value: 'E0' },
						{ label: 'Menu Item Six', value: 'F0' },
						{ type: 'divider' },
						{ label: 'Menu Item Seven', value: 'G0' },
					]}
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
