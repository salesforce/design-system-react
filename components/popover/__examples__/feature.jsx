import React from 'react';

import IconSettings from '~/components/icon-settings';
import Popover from '~/components/popover'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';
import Icon from '~/components/icon';
import log from '~/utilities/log';

class Example extends React.Component {
	static displayName = 'PopoverExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Popover
					align="top left"
					body={
						<div>
							<p className="slds-p-bottom_x-small">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
						</div>
					}
					footerWalkthroughActions={
						<Button
							onClick={(event) => {
								log({
									action: this.props.action,
									data: {},
									event,
									eventName: 'Learn More clicked!',
								});
							}}
							variant="neutral"
						>
							Learn More
						</Button>
					}
					heading="Title"
					id="popover-feature"
					icon={
						<Icon category="utility" name="description" size="small" inverse />
					}
					variant="feature"
					{...this.props}
				>
					<Button label="Trigger Popover" />
				</Popover>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
