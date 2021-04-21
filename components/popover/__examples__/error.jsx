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
							<p className="slds-p-bottom_x-small">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
								in pretium leo. Praesent quis risus eget libero commodo mollis.
							</p>
							<p className="slds-p-bottom_x-small">
								Quisque tincidunt eleifend pharetra. Etiam condimentum neque nec
								neque interdum, vitae dapibus est accumsan. Vestibulum rhoncus
								consectetur mi, sit amet interdum purus. Suspendisse rhoncus,
								orci a mattis rhoncus, nulla lacus pharetra orci, in eleifend at
								tristique nisi tristique.
							</p>
							<p className="slds-p-bottom_x-small">
								Pellentesque magna tellus, dapibus vitae placerat nec, viverra
								vel mi.{' '}
								<a href="#" title="Learn More">
									Learn More
								</a>
							</p>
						</div>
					}
					heading="Resolve error"
					id="popover-error"
					variant="error"
					{...this.props}
				>
					<Button label="Trigger Popover" />
				</Popover>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
