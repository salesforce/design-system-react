
import React from 'react';
import createReactClass from 'create-react-class';
import PopoverTooltip from '~/components/popover-tooltip'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';

const Example = createReactClass({
	displayName: 'TooltipExample',
	
	render () {
		return (
			<PopoverTooltip
				align="right"
				content="Tooltip with right alignment"
			>
				<Button label="Hover or focus to Open" />
			</PopoverTooltip>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
