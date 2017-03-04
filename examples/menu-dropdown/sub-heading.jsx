import React from 'react';
import Dropdown from '~/components/menu-dropdown'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'MediaObjectExample',

	render () {
		return (
			<Dropdown
				assistiveText="More Options"
				iconName="down"
				iconVariant="border-filled"
				onSelect={(value) => { console.log('selected: ', value); }}
				options={[
					{ label: 'Menu Sub Heading', type: 'header' },
					{ label: 'Menu Item One', value: 'A0' },
					{ label: 'Menu Item Two', value: 'B0' },
					{ label: 'Menu Sub Heading', type: 'header' },
					{ label: 'Menu Item One', value: 'A0' },
					{ label: 'Menu Item Two', value: 'B0' }
				]}
			/>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
