import React from 'react';
import createReactClass from 'create-react-class';
import ButtonGroup from '~/components/button-group';
import Button from '~/components/button';
import Dropdown from '~/components/menu-dropdown';
import IconSettings from '~/components/iconSettings';

const Example = createReactClass({
	displayName: 'ButtonGroupExample',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
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
			</IconSettings>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
