import React from 'react';

import IconSettings from '~/components/icon-settings';
import Breadcrumb from '~/components/breadcrumb'; // `~` is replaced with design-system-react at runtime
import Dropdown from '~/components/menu-dropdown';

class Example extends React.Component {
	static displayName = 'BreadCrumbExample';

	render() {
		const trail = [
			<a href="#entity">Parent Entity</a>,
			<a href="#record">Parent Record Name</a>,
		];

		return (
			<IconSettings iconPath="/assets/icons">
				<Breadcrumb
					id="ADFA34_"
					assistiveText={{ label: 'Breadcrumb with overflow menu' }}
					overflowDropdownMenu={
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
								{ label: 'Menu Item Four', value: 'D0' },
							]}
						/>
					}
					trail={trail}
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
