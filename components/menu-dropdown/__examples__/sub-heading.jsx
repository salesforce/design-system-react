import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import Dropdown from '~/components/menu-dropdown'; // `~` is replaced with design-system-react at runtime

const Example = createReactClass({
	displayName: 'MediaObjectExample',

	render () {
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
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
