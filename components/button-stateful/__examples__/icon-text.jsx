import React from 'react';

import IconSettings from '~/components/icon-settings';
import ButtonIcon from '~/components/icon/button-icon';
import ButtonStateful from '~/components/button-stateful'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'ButtonStatefulExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-x-small-buttons_horizontal">
					<ButtonStateful />

					<div
						style={{
							backgroundColor: '#ededed',
							padding: '10px',
							display: 'inline-block',
						}}
						className="slds-m-horizontal_small"
					>
						<ButtonStateful
							inverse
							stateOne={{ icon: <ButtonIcon name="add" />, label: 'Join' }}
							stateTwo={{ icon: <ButtonIcon name="check" />, label: 'Member' }}
							stateThree={{ icon: <ButtonIcon name="close" />, label: 'Leave' }}
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
