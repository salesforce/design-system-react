import React from 'react';
import ButtonStateful from '~/components/button-stateful'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	static displayName = 'ButtonStatefulExample';

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-x-small-buttons--horizontal">
					<ButtonStateful />

					<div
						style={{
							backgroundColor: '#16325c',
							padding: '10px',
							display: 'inline-block',
						}}
						className="slds-m-horizontal--small"
					>
						<ButtonStateful
							inverse
							stateOne={{ iconName: 'add', label: 'Join' }}
							stateTwo={{ iconName: 'check', label: 'Member' }}
							stateThree={{ iconName: 'close', label: 'Leave' }}
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
