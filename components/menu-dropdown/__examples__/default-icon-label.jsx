import React from 'react';
import Dropdown from '~/components/menu-dropdown'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'DropdownExample';

	render () {
		return (
			<Dropdown
				align="right"
				iconName="down"
				iconPosition="right"
				label="Dropdown"
				options={[
					{ label: 'Menu Item One', value: 'A0' },
					{ label: 'Menu Item Two', value: 'B0' },
					{ label: 'Menu Item Three', value: 'C0' },
					{ type: 'divider' },
					{ label: 'Menu Item Four', value: 'D0' },
				]}
			/>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
