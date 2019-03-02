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
							strengthLevel={-1}
							variant="strength"
						>
							<svg viewBox="0 0 27 7" aria-hidden="true">
								<circle r="3.025" cx="3.5" cy="3.5" />
								<circle r="3.025" cx="13.5" cy="3.5" />
								<circle r="3.025" cx="23.5" cy="3.5" />
							</svg>
							<span className="slds-assistive-text">
								Text alternative when needed
							</span>
						</DynamicIcons>
					</div>
					<div className="slds-col_padded">
						<DynamicIcons
							title="Description of the icon when needed"
							strengthLevel={-2}
							variant="strength"
						>
							<svg viewBox="0 0 27 7" aria-hidden="true">
								<circle r="3.025" cx="3.5" cy="3.5" />
								<circle r="3.025" cx="13.5" cy="3.5" />
								<circle r="3.025" cx="23.5" cy="3.5" />
							</svg>
							<span className="slds-assistive-text">
								Text alternative when needed
							</span>
						</DynamicIcons>
					</div>
					<div className="slds-col_padded">
						<DynamicIcons
							title="Description of the icon when needed"
							isAnimated
							strengthLevel={-3}
							variant="strength"
						>
							<svg viewBox="0 0 27 7" aria-hidden="true">
								<circle r="3.025" cx="3.5" cy="3.5" />
								<circle r="3.025" cx="13.5" cy="3.5" />
								<circle r="3.025" cx="23.5" cy="3.5" />
							</svg>
							<span className="slds-assistive-text">
								Text alternative when needed
							</span>
						</DynamicIcons>
					</div>
					<div className="slds-col_padded">
						<DynamicIcons
							title="Description of the icon when needed"
							strengthLevel={1}
							variant="strength"
						>
							<svg viewBox="0 0 27 7" aria-hidden="true">
								<circle r="3.025" cx="3.5" cy="3.5" />
								<circle r="3.025" cx="13.5" cy="3.5" />
								<circle r="3.025" cx="23.5" cy="3.5" />
							</svg>
							<span className="slds-assistive-text">
								Text alternative when needed
							</span>
						</DynamicIcons>
					</div>
					<div className="slds-col_padded">
						<DynamicIcons
							title="Description of the icon when needed"
							strengthLevel={2}
							variant="strength"
						>
							<svg viewBox="0 0 27 7" aria-hidden="true">
								<circle r="3.025" cx="3.5" cy="3.5" />
								<circle r="3.025" cx="13.5" cy="3.5" />
								<circle r="3.025" cx="23.5" cy="3.5" />
							</svg>
							<span className="slds-assistive-text">
								Text alternative when needed
							</span>
						</DynamicIcons>
					</div>
					<div className="slds-col_padded">
						<DynamicIcons
							title="Description of the icon when needed"
							isAnimated
							strengthLevel={3}
							variant="strength"
						>
							<svg viewBox="0 0 27 7" aria-hidden="true">
								<circle r="3.025" cx="3.5" cy="3.5" />
								<circle r="3.025" cx="13.5" cy="3.5" />
								<circle r="3.025" cx="23.5" cy="3.5" />
							</svg>
							<span className="slds-assistive-text">
								Text alternative when needed
							</span>
						</DynamicIcons>
					</div>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'StrengthExample'; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
export default Example;
