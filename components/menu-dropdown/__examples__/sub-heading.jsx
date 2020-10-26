import React from 'react';

import IconSettings from '~/components/icon-settings';
import Dropdown from '~/components/menu-dropdown'; // `~` is replaced with design-system-react at runtime

function Example() {
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
					{ label: 'Menu Sub Heading', type: 'header' },
					{ label: 'Menu Item One', value: 'A0' },
					{ label: 'Menu Item Two', value: 'B0' },
					{ label: 'Menu Sub Heading', type: 'header' },
					{ label: 'Menu Item One', value: 'A0' },
					{ label: 'Menu Item Two', value: 'B0' },
				]}
			/>
		</IconSettings>
	);
}

Example.displayName = 'MediaObjectExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
