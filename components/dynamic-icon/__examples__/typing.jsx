import React from 'react';
import DynamicIcons from '~/components/dynamic-icon'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<DynamicIcons
							title="User is typing"
							isAnimated
							paused
							variant="typing"
						>
							<span className="slds-icon-typing__dot" />
							<span className="slds-icon-typing__dot" />
							<span className="slds-icon-typing__dot" />
							<span className="slds-assistive-text">User is typing</span>
						</DynamicIcons>
					</div>
					<div className="slds-col_padded">
						<DynamicIcons title="User is typing" isAnimated variant="typing">
							<span className="slds-icon-typing__dot" />
							<span className="slds-icon-typing__dot" />
							<span className="slds-icon-typing__dot" />
							<span className="slds-assistive-text">User is typing</span>
						</DynamicIcons>
					</div>
					<div className="slds-col_padded">
						<DynamicIcons title="User is typing" variant="typing">
							<span className="slds-icon-typing__dot" />
							<span className="slds-icon-typing__dot" />
							<span className="slds-icon-typing__dot" />
							<span className="slds-assistive-text">User is typing</span>
						</DynamicIcons>
					</div>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'TypingExample'; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
export default Example;
