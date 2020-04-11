import React from 'react';

import IconSettings from '~/components/icon-settings';
import Tooltip from '~/components/tooltip'; // `~` is replaced with design-system-react at runtime
import ButtonGroup from '~/components/button-group';
import Button from '~/components/button';
import Dropdown from '~/components/menu-dropdown';

class Example extends React.Component {
	static displayName = 'TooltipExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<ButtonGroup
					className="slds-p-bottom_medium"
					variant="list"
					id="button-group-tooltip"
				>
					<Tooltip
						id="refresh-tooltip"
						align="bottom"
						content="Buttonbar Tooltip"
						variant="list-item"
					>
						<Button id="refresh-button" label="Refresh" />
					</Tooltip>
					<Tooltip
						id="edit-tooltip"
						align="bottom right"
						content="Buttonbar Tooltip"
						variant="list-item"
					>
						<Button label="Edit" id="edit-button" />
					</Tooltip>
					<Tooltip
						id="drop-tooltip"
						align="bottom right"
						content="Buttonbar Tooltip"
						variant="list-item"
					>
						<Dropdown
							id="options"
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
					</Tooltip>
				</ButtonGroup>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
