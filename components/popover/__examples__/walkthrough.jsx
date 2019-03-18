import React from 'react';

import IconSettings from '~/components/icon-settings';
import Popover from '~/components/popover'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';

class Example extends React.Component {
	static displayName = 'PopoverExample';

	render() {
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
					footerActions={<Button variant="brand">Next</Button>}
					heading="Manage your channels"
					id="popover-walkthrough"
					stepText="Step 2 of 4"
					variant="walkthrough"
					{...this.props}
				>
					<Button label="Trigger Popover" />
				</Popover>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
