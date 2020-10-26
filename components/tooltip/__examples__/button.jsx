import React from 'react';

import IconSettings from '~/components/icon-settings';
import Tooltip from '~/components/tooltip'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';

function Example() {
	return (
		<IconSettings iconPath="/assets/icons">
			<Tooltip
				id="tooltip"
				align="right"
				content="Tooltip with right alignment"
			>
				<Button id="button" label="Hover or focus to Open" />
			</Tooltip>
		</IconSettings>
	);
}

Example.displayName = 'TooltipExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
