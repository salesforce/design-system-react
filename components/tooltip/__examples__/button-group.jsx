import React from 'react';
import IconSettings from '~/components/icon-settings';
import PopoverTooltip from '~/components/popover-tooltip'; // `~` is replaced with design-system-react at runtime
import ButtonGroup from '~/components/button-group';
import Button from '~/components/button';
import Dropdown from '~/components/menu-dropdown';

class Example extends React.Component {
	static displayName = 'TooltipExample';

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<ButtonGroup className="slds-p-bottom--medium">
					<PopoverTooltip align="bottom" content="Buttonbar Tooltip">
						<Button label="Refresh" />
					</PopoverTooltip>
					<PopoverTooltip align="bottom right" content="Buttonbar Tooltip">
						<Button label="Edit" />
					</PopoverTooltip>
					<Dropdown
						assistiveText="More Options"
						buttonVariant="icon"
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
