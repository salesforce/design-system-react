import React from 'react';

import IconSettings from '~/components/icon-settings';
import ButtonGroup from '~/components/button-group';
import Button from '~/components/button';
import Dropdown from '~/components/menu-dropdown';

class Example extends React.Component {
	static displayName = 'ListVariantExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<ButtonGroup id="button-group-list-1" variant="list">
					<Button id="refresh-button-1" label="Refresh" />
					<Button label="Edit" id="edit-button-1" />
					<Dropdown
						id="options-1"
						assistiveText={{ icon: 'More Options' }}
						buttonVariant="icon"
						iconCategory="utility"
						iconName="down"
						iconVariant="border-filled"
						onSelect={(item) => console.log('selected', item)}
						options={[
							{ label: 'A Option', value: 'A0' },
							{ label: 'B Option', value: 'B0' },
							{ label: 'C Option', value: 'C0' },
						]}
					/>
				</ButtonGroup>
				<br />
				<br />
				<ButtonGroup
					classNameContainer="custom-container-class"
					id="button-group-list-2"
					labels={{ label: 'Actions' }}
					variant="list"
				>
					<Button id="refresh-button-2" label="Refresh" />
					<Button label="Edit" id="edit-button-2" />
					<Dropdown
						id="options-2"
						assistiveText={{ icon: 'More Options' }}
						buttonVariant="icon"
						iconCategory="utility"
						iconName="down"
						iconVariant="border-filled"
						onSelect={(item) => console.log('selected', item)}
						options={[
							{ label: 'A Option', value: 'A0' },
							{ label: 'B Option', value: 'B0' },
							{ label: 'C Option', value: 'C0' },
						]}
					/>
				</ButtonGroup>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
