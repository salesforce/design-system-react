import React from 'react';

import IconSettings from '~/components/icon-settings';
import Popover from '~/components/popover'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';

class Example extends React.Component {
	static displayName = 'PopoverExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div style={{ display: 'flex' }}>
					<Popover
						align="right"
						body={
							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
						}
						heading="Custom Target"
						id="popover-custom-target"
						onRequestTargetElement={() => this.customTarget}
						{...this.props}
					>
						<Button label="Trigger Popover" />
					</Popover>
					<div
						ref={(component) => {
							this.customTarget = component;
						}}
						style={{
							background: '#706e6b',
							borderRadius: '4px',
							color: '#fff',
							height: '32px',
							margin: '0 0 0 30px',
							padding: '6px',
							textAlign: 'center',
							width: '132px',
						}}
					>
						Popover Target
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
