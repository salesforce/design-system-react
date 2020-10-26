import React from 'react';

import IconSettings from '~/components/icon-settings';
import Popover from '~/components/popover'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';

function Example() {
	return (
		<IconSettings iconPath="/assets/icons">
			<div>
				<Popover
					body="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
					heading="Header Title"
					id="popover-heading"
				>
					<Button label="Trigger Popover" />
				</Popover>
			</div>
		</IconSettings>
	);
}

Example.displayName = 'PopoverExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
