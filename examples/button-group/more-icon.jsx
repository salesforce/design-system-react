import React from 'react';
import ButtonGroup from '~/components/button-group';
import Button from '~/components/button';
import Dropdown from '~/components/menu-dropdown';

const Example = React.createClass({
	displayName: 'ButtonGroupExample',

	render () {
		return (
			<ButtonGroup>
				<Button label="Refresh" />
				<Button label="Edit" />
				<Button label="Save" />
				<Dropdown
					id="ButtonGroupExampleDropdown"
					assistiveText="More Options"
					buttonVariant="icon"
					iconName="down"
					iconVariant="border-filled"
					onSelect={function (item) { console.log(item.label, 'selected'); }}
					openOn="click"
					options={[
						{ label: 'undo', value: 'A0' },
						{ label: 'redo', value: 'B0' },
						{ label: 'activate', value: 'C0' }
					]}
				/>
			</ButtonGroup>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
