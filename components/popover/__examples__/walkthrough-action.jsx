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
					body={<p>Text that describes the action</p>}
					heading="Title"
					id="popover-walkthrough"
					stepText="Step 3 of 4"
					variant="walkthrough-action"
					{...this.props}
				>
					<Button label="Trigger Popover" />
				</Popover>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
