import React from 'react';

import IconSettings from '~/components/icon-settings';
import Dropdown from '~/components/menu-dropdown'; // `~` is replaced with design-system-react at runtime
import Tooltip from '~/components/tooltip';

class Example extends React.Component {
	static displayName = 'DropdownWithTooltipsExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Dropdown
					assistiveText={{ icon: 'More Options' }}
					iconCategory="utility"
					iconName="down"
					iconVariant="border-filled"
					id="dropdown-with-tooltips"
					options={[
						{ label: 'Header', type: 'header' },
						{ label: 'Menu Item One', value: 'A0' },
						{
							label: 'Menu Item Two',
							value: 'B0',
							tooltipContent: 'Just a friendly tooltip',
						},
						{ label: 'Menu Item Three', value: 'C0' },
						{ type: 'divider' },
						{ label: 'Menu Item Four', value: 'D0' },
						{ label: 'Menu Item Five', value: 'E0' },
						{
							label: 'Menu Item Six',
							value: 'F0',
							tooltipContent: 'Another friendly tooltip',
						},
						{ type: 'divider' },
						{ label: 'Menu Item Seven', value: 'G0' },
					]}
					tooltipMenuItem={<Tooltip />}
					{...this.props}
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
