import React from 'react';

import IconSettings from '~/components/icon-settings';
import Dropdown from '~/components/menu-dropdown'; // `~` is replaced with design-system-react at runtime
// eslint-disable-next-line camelcase
import UNSAFE_DirectionSettings from '~/components/utilities/direction';

class Example extends React.Component {
	static displayName = 'MediaObjectExample';

	render() {
		return (
			// eslint-disable-next-line
			<UNSAFE_DirectionSettings.Provider value="rtl">
				<div dir="rtl">
					<IconSettings iconPath="/assets/icons">
						<Dropdown
							assistiveText={{ icon: 'More Options' }}
							iconCategory="utility"
							iconName="down"
							iconVariant="border-filled"
							onSelect={(value) => {
								console.log('selected: ', value);
							}}
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
				</div>
			</UNSAFE_DirectionSettings.Provider>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
