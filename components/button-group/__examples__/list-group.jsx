import React from 'react';

import ButtonGroup from '~/components/button-group';
import Button from '~/components/button';
import Dropdown from '~/components/menu-dropdown';

class Example extends React.Component {
	static displayName = 'ButtonGroupExample';

	render() {
		return (
			<ButtonGroup variant="list">
				<ul>
					<Button label="Refresh" />
				</ul>
				<ul>
					<Button label="Edit" />
				</ul>
				<ul>
					<Dropdown
						id="ButtonGroupExampleDropdown"
						assistiveText={{ icon: 'More Options' }}
						buttonVariant="icon"
						iconCategory="utility"
						iconName="down"
						iconVariant="border-filled"
						onSelect={(item) => {
							console.log(item.label, 'selected');
						}}
						openOn="click"
						options={[
							{ label: 'undo', value: 'A0' },
							{ label: 'redo', value: 'B0' },
							{ label: 'activate', value: 'C0' },
						]}
					/>
				</ul>
			</ButtonGroup>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
