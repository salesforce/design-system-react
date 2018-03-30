import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import Picklist from '~/components/menu-picklist'; // `~` is replaced with design-system-react at runtime
import PopoverTooltip from '~/components/popover-tooltip';

const ListItemRenderer = (props) => (
	<PopoverTooltip
		openByDefault={props.isHighlighted}
		align="bottom left"
		content={`${props.label} tooltip on bottom left`}
	>
		<p className="slds-truncate">{props.label} (Hover for tooltip)</p>
	</PopoverTooltip>
);

const Example = createReactClass({
	displayName: 'PicklistExample',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<Picklist
					listItemRenderer={ListItemRenderer}
					label="Contacts"
					onSelect={(value) => {
						console.log('selected: ', value);
					}}
					options={[
						{ label: 'Option A', value: 'A0' },
						{ label: 'Option B', value: 'B0' },
						{ label: 'Option C', value: 'C0' },
						{ label: 'Option D', value: 'D0' },
						{ label: 'Option E', value: 'E0' },
						{ label: 'Option FGHIJKLMNOPQRSTUVWXYZ', value: 'F0' },
					]}
					placeholder="Select a contact"
					value="C0"
				/>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
