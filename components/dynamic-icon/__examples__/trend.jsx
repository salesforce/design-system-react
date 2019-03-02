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
							title="Description of the icon"
							trend="down"
							variant="trend"
						>
							<svg viewBox="0 0 16 16" aria-hidden="true">
								<path
									className="slds-icon-trend__arrow"
									d="M.75 8H11M8 4.5L11.5 8 8 11.5"
								/>
								<circle
									className="slds-icon-trend__circle"
									cy="8"
									cx="8"
									r="7.375"
									transform="rotate(-28 8 8) scale(-1 1) translate(-16 0)"
								/>
							</svg>
							<span className="slds-assistive-text">Text alternative</span>
						</DynamicIcons>
					</div>
					<div className="slds-col_padded">
						<DynamicIcons
							title="Description of the icon"
							trend="up"
							variant="trend"
						>
							<svg viewBox="0 0 16 16" aria-hidden="true">
								<path
									className="slds-icon-trend__arrow"
									d="M.75 8H11M8 4.5L11.5 8 8 11.5"
								/>
								<circle
									className="slds-icon-trend__circle"
									cy="8"
									cx="8"
									r="7.375"
									transform="rotate(-28 8 8) scale(-1 1) translate(-16 0)"
								/>
							</svg>
							<span className="slds-assistive-text">Text alternative</span>
						</DynamicIcons>
					</div>
					<div className="slds-col_padded">
						<DynamicIcons
							title="Description of the icon"
							trend="neutral"
							variant="trend"
						>
							<svg viewBox="0 0 16 16" aria-hidden="true">
								<path
									className="slds-icon-trend__arrow"
									d="M.75 8H11M8 4.5L11.5 8 8 11.5"
								/>
								<circle
									className="slds-icon-trend__circle"
									cy="8"
									cx="8"
									r="7.375"
									transform="rotate(-28 8 8) scale(-1 1) translate(-16 0)"
								/>
							</svg>
							<span className="slds-assistive-text">Text alternative</span>
						</DynamicIcons>
					</div>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'TrendExample'; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
export default Example;
