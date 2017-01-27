import React from 'react';
import PopoverTooltip from '~/components/popover-tooltip'; // `~` is replaced with design-system-react at runtime
import Icon from '~/components/icon';

const Example = React.createClass({
	displayName: 'TooltipExample',
	
	render () {
		return (
			<PopoverTooltip
				align="top left"
				content="Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi."
			>
				<a href="javascript:void(0)">
					<Icon
						assistiveText="Tooltip with icon"
						category="utility"
						name="info"
						size="x-small"
					/>
				</a>
			</PopoverTooltip>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
