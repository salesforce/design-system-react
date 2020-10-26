import React from 'react';

import IconSettings from '~/components/icon-settings';
import Popover from '~/components/popover'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';
import log from '~/utilities/log';

function Example(props) {
	return (
		<IconSettings iconPath="/assets/icons">
			<Popover
				align="right"
				body={
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</p>
				}
				footerWalkthroughActions={
					<Button
						onClick={(event) => {
							log({
								action: props.action,
								data: {},
								event,
								eventName: 'Next clicked!',
							});
						}}
						variant="brand"
					>
						Next
					</Button>
				}
				heading="Manage your channels"
				id="popover-walkthrough"
				stepText="Step 2 of 4"
				variant="walkthrough"
				{...props}
			>
				<Button label="Trigger Popover" />
			</Popover>
		</IconSettings>
	);
}

Example.displayName = 'PopoverExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
