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
							polarity="positive"
							variant="score"
						>
							<svg
								viewBox="0 0 5 5"
								className="slds-icon-score__positive"
								aria-hidden="true"
							>
								<circle cx="50%" cy="50%" r="1.875" />
							</svg>
							<svg
								viewBox="0 0 5 5"
								className="slds-icon-score__negative"
								aria-hidden="true"
							>
								<circle cx="50%" cy="50%" r="1.875" />
							</svg>
							<span className="slds-assistive-text">
								Text alternative when needed
							</span>
						</DynamicIcons>
					</div>
					<div className="slds-col_padded">
						<DynamicIcons
							title="Description of the icon when needed"
							polarity="negative"
							variant="score"
						>
							<svg
								viewBox="0 0 5 5"
								className="slds-icon-score__positive"
								aria-hidden="true"
							>
								<circle cx="50%" cy="50%" r="1.875" />
							</svg>
							<svg
								viewBox="0 0 5 5"
								className="slds-icon-score__negative"
								aria-hidden="true"
							>
								<circle cx="50%" cy="50%" r="1.875" />
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

Example.displayName = 'ScoreExample'; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
export default Example;
