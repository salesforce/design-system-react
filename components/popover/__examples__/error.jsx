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
					align="top left"
					body={
						<div>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
								eiusmod tempor incididunt ut labore et dolore.{' '}
								<a href="javascript:void(0);" title="Learn More">
									Learn More
								</a>
							</p>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
								eiusmod tempor incididunt ut labore et dolore.{' '}
								<a href="javascript:void(0);" title="Learn More">
									Learn More
								</a>
							</p>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
								eiusmod tempor incididunt ut labore et dolore.{' '}
								<a href="javascript:void(0);" title="Learn More">
									Learn More
								</a>
							</p>
						</div>
					}
					heading="Resolve error"
					id="popover-error"
					isOpen
					variant="error"
				>
					<Button label="Trigger Popover" />
				</Popover>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
