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
							title="Description of the icon when needed"
							isAnimated
							variant="waffle"
						>
							<span className="slds-icon-waffle">
								<span className="slds-r1" />
								<span className="slds-r2" />
								<span className="slds-r3" />
								<span className="slds-r4" />
								<span className="slds-r5" />
								<span className="slds-r6" />
								<span className="slds-r7" />
								<span className="slds-r8" />
								<span className="slds-r9" />
							</span>
							<span className="slds-assistive-text">Open App Launcher</span>
						</DynamicIcons>
					</div>
					<div className="slds-col_padded">
						<DynamicIcons
							title="Description of the icon when needed"
							isAnimated={false}
							variant="waffle"
						>
							<span className="slds-icon-waffle">
								<span className="slds-r1" />
								<span className="slds-r2" />
								<span className="slds-r3" />
								<span className="slds-r4" />
								<span className="slds-r5" />
								<span className="slds-r6" />
								<span className="slds-r7" />
								<span className="slds-r8" />
								<span className="slds-r9" />
							</span>
							<span className="slds-assistive-text">Open App Launcher</span>
						</DynamicIcons>
					</div>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'WaffleExample'; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
export default Example;
