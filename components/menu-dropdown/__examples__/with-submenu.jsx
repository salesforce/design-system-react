import React from 'react';
import IconSettings from '~/components/icon-settings';
import Dropdown from '~/components/menu-dropdown'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'MediaObjectExample';

	render() {
		return (
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
						{
							label: 'Menu Item Three',
							value: 'C0',
							options: [
								{ label: 'Sub Menu Item One', value: 'C01' },
								{ label: 'Sub Menu Item Two', value: 'C02' },
								{ type: 'divider' },
								{ label: 'Sub Menu Item Three', value: 'C03' },
							],
						},
					]}
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
