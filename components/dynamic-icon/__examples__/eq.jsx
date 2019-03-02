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
							variant="eq"
						>
							<div className="slds-icon-eq__bar" />
							<div className="slds-icon-eq__bar" />
							<div className="slds-icon-eq__bar" />
							<span className="slds-assistive-text">
								Text alternative when needed
							</span>
							<span className="slds-assistive-text">Text alternative</span>
						</DynamicIcons>
					</div>
					<div className="slds-col_padded">
						<DynamicIcons
							title="Description of the icon when needed"
							isAnimated={false}
							variant="eq"
						>
							<div className="slds-icon-eq__bar" />
							<div className="slds-icon-eq__bar" />
							<div className="slds-icon-eq__bar" />
							<span className="slds-assistive-text">
								Text alternative when needed
							</span>
							<span className="slds-assistive-text">Text alternative</span>
						</DynamicIcons>
					</div>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'EqExample'; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
export default Example;
