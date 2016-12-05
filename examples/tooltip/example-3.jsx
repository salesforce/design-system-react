import PopoverTooltip from 'design-system-react/components/popover-tooltip';
import ButtonGroup from 'design-system-react/components/button-group';
import Button from 'design-system-react/components/button';

<ButtonGroup className="slds-p-bottom--medium">
	<PopoverTooltip
		align="bottom"
		content="Buttonbar Tooltip"
		openByDefault={false} />
	>
		<Button
			label="Refresh"
		/>
	</PopoverTooltip>
	<Button
		label="Refresh"
		tooltip={
			<PopoverTooltip
		}
	/>
	<PopoverTooltip
		align="bottom right"
		content="Buttonbar Tooltip"
		openByDefault={false}
	>
		<Button
			label="Edit"
		/>
	</PopoverTooltip>
	<MenuDropdown
		assistiveText="More Options"
		buttonVariant="icon"
		iconName="down"
		iconVariant="border-filled"
		onSelect={(i) => console.log("selected", i)}
		openOn="hover"
		options={[
			{label: 'A Option', value: 'A0'},
			{label: 'B Option', value: 'B0'},
			{label: 'C Option', value: 'C0'}
		]}
		tooltip={
			<PopoverTooltip
				align="top right"
				content="Dropdown Tooltip"
				openByDefault={false}
			/>
		}
	/>
</ButtonGroup>
