import PopoverTooltip from '~/components/popover-tooltip';
import Button from '~/components/button';

<PopoverTooltip
	align="right"
	content={<span>Tooltip with right alignment</span>}
	key="tooltipDemo">
		<Button variant="brand" label="Hover to Open" />
</PopoverTooltip>
